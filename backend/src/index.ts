import mongoose, { Error } from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import User from './User'
import dotenv from 'dotenv';
import { UserInterface } from './interfaces/UserInterface'

const LocalStrategy = passportLocal.Strategy

// .env
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
}, (err: Error) => {
   if (err) throw err
})