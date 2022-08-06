import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import User from '../models/User'
import { UserInterface } from '../interfaces/UserInterface'

const router = require("express").Router();

// Register user
router.post('/register', async (req: Request, res: Response) => {

  const { username, password } = req?.body
  if (!username || !passport || typeof username !== "string" || typeof password !== "string") {
    res.send('Invalid values!')
    return 
  } 
  User.findOne({ username }, async (err: Error, doc: UserInterface) => {
    if (err) throw err
    if (doc) res.send('User already exists')
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      // don't need to pass in the isAdmin because the default is set to false
      const newUser = new User({
        username,
        password: hashedPassword
      })
      await newUser.save()
      res.send('Registration sucessful!')
        }
  } )
  
})

// Log in user
router.post('/login', passport.authenticate('local'), (req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Authentication Successful')
})

// Log out user
router.get('/logout', function(req: { logout: (arg0: (err: any) => void) => void; }, res: { send: (arg0: string) => void; }){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.send('Logout successful');
  });
});

function next(err: any): void {
  throw new Error('Function not implemented.');
}

export = router