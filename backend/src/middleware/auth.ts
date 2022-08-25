import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import ErrorResponse from '../utilities/errorResponse'
import { Request, Response, NextFunction } from 'express';

dotenv.config();

interface JwtPayload {
  id: string
}

export const protect = async (req: Request | any , res: Response, next: NextFunction) => {
  let token: string | undefined;
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Bearer fsd435kj34kji   split to get the token
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
  // Decode JWT
  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse("No user found with this id", 404));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorResponse("Error with authorization to access this route", 401));
  }
};
