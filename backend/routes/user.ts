import express from 'express'
const userRoute = express.Router();

import { register, login, forgotpassword, resetpassword } from '../controllers/auth'

userRoute.route('/register').post(register)

userRoute.route('/login').post(login)

userRoute.route('/forgotpassword').post(forgotpassword)
// In forgot password we generate a resetToken
userRoute.route('/resetpassword/:resetToken').put(resetpassword)

export default userRoute