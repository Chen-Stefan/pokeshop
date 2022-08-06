import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import User from '../models/User'
import { UserInterface } from '../interfaces/UserInterface'

const router = require("express").Router();

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

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('Authentication Successful')
})

// Grab logged in user
router.get('/user', (req, res) => {
  res.send(req.user)
})

// Log out user
router.get('/logout', function(req, res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.send('Logout successful');
  });
});

function next(err: any): void {
  throw new Error('Function not implemented.');
}
