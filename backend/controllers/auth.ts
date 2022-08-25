import User from "../src/models/User";
import ErrorResponse from "../utilities/errorResponse.js";
import sendEmail from "../utilities/sendEmail.js";
import crypto from "crypto";
import { Request, Response, NextFunction } from 'express';

// We use next for error handling
export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req?.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

// next 把里面的东西传到下一个middleware, 在server.js里，就是errorHandler
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  // 下面这行其实是没有用的，因为前端表格里自带着一点validation, 如果不输入的话没法提交表格
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    // 如果用户邮箱不存在，提示错误信息
    if (!user) {
      return next(new ErrorResponse("Invalid email address, please sign up first", 401));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("Please enter the correct password", 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const forgotpassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(
        new ErrorResponse("Email could not be sent as it does not exist", 404)
      );
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    const message = `
    <h1> You have requested a password reset </h1>
    <p> Please click this link to reset your password </p>
    <a href=${resetUrl} clicktracking=off> ${resetUrl} </a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(
        new ErrorResponse("Password reset email could not be sent", 500)
      );
    }
  } catch (error) {
    next(error);
  }
};

export const resetpassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  
    try {
      const user = await User.findOne({
        resetPasswordToken,
        // Check the expiry date is greater than now (still valid) using mongodb query
        resetPasswordExpire: { $gt: Date.now()}
      })

      if (!user) {
        return next(new ErrorResponse("Invalid Reset Token", 400))
      }

      user.password = req.body.password
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined
      
      await user.save()
      res.status(201).json({
        success: true, 
        data: "Password reset success"
      })
    } catch (error) {
      next(error)
    }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
