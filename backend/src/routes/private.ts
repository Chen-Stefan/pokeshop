import express from 'express'
const privateRoute = express.Router()
import { getPrivateData } from '../../controllers/private'
import { protect } from '../../middleware/auth'

privateRoute.route("/").get(protect, getPrivateData)

export default privateRoute