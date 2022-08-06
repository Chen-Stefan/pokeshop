import * as dotenv from "dotenv";
import mongoose, { Error } from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import User from './models/User'
import { UserInterface } from './interfaces/UserInterface'
import userRouter from './routes/user';

const LocalStrategy = passportLocal.Strategy

// .env
dotenv.config();

mongoose.connect(`${process.env.MONGO_URI}`, {
}, (err: Error) => {
   if (err) throw err
})

// Middleware
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Passport
passport.use(new LocalStrategy((username: string, password: string, done) => {
   User.findOne({ username: username }, (err: any, user: any) => {
     if (err) throw err;
     if (!user) return done(null, false);
     bcrypt.compare(password, user.password, (err, result: boolean) => {
       if (err) throw err;
       if (result === true) {
         return done(null, user);
       } else {
         return done(null, false);
       }
     });
   });
 })
 );
 
 passport.serializeUser((user: any, cb) => {
   cb(null, user._id);
 });
 
 passport.deserializeUser((id: string, cb) => {
   User.findOne({ _id: id }, (err: any, user: any) => {
     const userInformation = {
       username: user.username,
       isAdmin: user.isAdmin,
     };
     cb(err, userInformation);
   });
 });

 // Other routes
 app.use('/', userRouter);


 app.listen(5000, () => {
   console.log('Server Started')
 })
 