import * as dotenv from "dotenv";
import cors from "cors";
import { Router } from "express";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const paymentRoute = Router();

paymentRoute.post(
  "/payment",
  cors(),
  async (req: Request, res: Response, next: NextFunction) => {
    let { amount, id } = req.body;
    try {
      await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Stefan's Pokeshop",
        payment_method: id,
        confirm: true,
      });
      res.json({
        success: true,
        message: "Payment Successful",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default paymentRoute;
