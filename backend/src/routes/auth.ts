import express from 'express'
const authRoute = express.Router();

import { register, login, forgotpassword, resetpassword } from '../controllers/auth.js'

// 这个syntax和 router.post('/register', (req, res) => ) 是等价的
authRoute.route('/register').post(register)

authRoute.route('/login').post(login)

authRoute.route('/forgotpassword').post(forgotpassword)
// In forgot password we generate a resetToken
authRoute.route('/resetpassword/:resetToken').put(resetpassword)

export default authRoute