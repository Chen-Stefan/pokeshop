import { Request, Response, NextFunction, Router} from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import User from '../models/User'
import { UserInterface } from '../interfaces/UserInterface'

const userRouter = Router();

// Register user
userRouter.post('/register', async (req: Request, res: Response) => {

  const { username, password, email } = req?.body
  if (!username || !passport || typeof username !== "string" || typeof password !== "string") {
    res.send('Invalid values!')
    return 
  } 
  User.findOne({ email }, async (err: Error, doc: UserInterface) => {
    if (err) throw err
    if (doc) res.send('User already exists')
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      // don't need to pass in the isAdmin because the default is set to false
      const newUser = new User({
        username,
        password: hashedPassword,
        email
      })
      await newUser.save()
      res.send('Registration sucessful!')
        }
  } )
  
})

// Log in user
userRouter.post('/login', passport.authenticate('local'), (req: Request, res: Response) => {
  res.send('Authentication Successful')
})

// Log out user
userRouter.get('/logout', function(req: Request, res: Response){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.send('Logout successful');
  });
});


function next(err: any): void {
  throw new Error('Function not implemented.');
}

export default userRouter