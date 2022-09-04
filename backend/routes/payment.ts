import * as dotenv from "dotenv";
import cors from "cors";
import { Router } from "express";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const productItems = new Map([
  [1, { priceInCents: 1999, name: "Bulbasaur" }],
  [2, { priceInCents: 1999, name: "Ivysaur" }],
  [3, { priceInCents: 1999, name: "Venusaur" }],
  [4, { priceInCents: 1999, name: "Charmander" }],
  [5, { priceInCents: 1999, name: "Charmeleon" }],
  [6, { priceInCents: 1999, name: "Charizard" }],
  [7, { priceInCents: 1999, name: "Squirtle" }],
  [8, { priceInCents: 1999, name: "Wartortle" }],
  [9, { priceInCents: 1999, name: "Blastoise" }],
  [10, { priceInCents: 999, name: "Caterpie" }],
  [11, { priceInCents: 999, name: "Metapod" }],
  [12, { priceInCents: 999, name: "Butterfree" }],
  [13, { priceInCents: 999, name: "Weedle" }],
  [14, { priceInCents: 999, name: "Kakuna" }],
  [15, { priceInCents: 999, name: "Beedrill" }],
  [16, { priceInCents: 999, name: "Pidgey" }],
  [17, { priceInCents: 999, name: "Pidgeotto" }],
  [18, { priceInCents: 999, name: "Pidgeot" }],
  [19, { priceInCents: 999, name: "Rattata" }],
  [20, { priceInCents: 999, name: "Raticate" }],
]);
const paymentRoute = Router();

paymentRoute.post(
  "/",
  cors(),
  async (req: Request, res: Response, next: NextFunction) => {
    let { amount, id } = req.body;
    try {
      await stripe.paymentIntents.create({
        amount,
        currency: "cad",
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
