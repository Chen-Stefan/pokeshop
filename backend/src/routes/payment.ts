import * as dotenv from "dotenv";
import { Router } from "express";
import cors from 'cors';

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

const paymentRoute = Router();

paymentRoute.post("/payment", cors(), async (req, res) => {
  let {amount, id} = req.body
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Stefan's Pokeshop",
      payment_method: id,
      confirm: true
    })
    console.log("Payment", payment)
    res.json({
      message: "Payment Successful",
      success: true
    })
  } catch (error) {
    console.log('Error', error)
    res.json({
      message: "Payment Failed",
      success: false
    })
  }
})




export default paymentRoute