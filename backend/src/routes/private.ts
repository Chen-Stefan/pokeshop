import express from 'express'
const privateRoute = express.Router()
import { getPrivateData } from '../controllers/private.js'
import { protect } from '../middleware/auth.js'

privateRoute.route("/").get(protect, getPrivateData)

export default privateRoute