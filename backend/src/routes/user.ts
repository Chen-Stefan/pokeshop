import { Request, Response, Router } from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import { User } from "../models/User";

const userRouter = Router();

// Register user
userRouter.post("/register", async (req: Request, res: Response) => {
  const { username, password, email } = req?.body;
  
  if (
    !username ||
    !passport ||
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    res.send("Invalid values!");
    return;
  }

  const userExists = await User.findOne({ $or: [{ username }, { email }] });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists, please try again");
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({
    username,
    password: hashedPassword,
    email,
  });
  await newUser.save();
  res.send("Registration successful!");
});

// Log in user
userRouter.post(
  "/login",
  passport.authenticate("local"),
  (req: Request, res: Response) => {
    res.send("Authentication Successful");
  }
);

// Get logged in user
userRouter.get("/user", (req, res) => {
  res.send(req.user);
});

// Log out user
userRouter.get("/logout", function (req: Request, res: Response) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send("Logout successful");
  });
});

function next(err: any): void {
  throw new Error("Function not implemented.");
}

export default userRouter;
