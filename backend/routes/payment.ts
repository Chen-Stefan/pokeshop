import * as dotenv from "dotenv";
import { Router } from "express";
import { Request, Response } from "express";

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const storeItems = new Map([
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

paymentRoute.post('/', async (req: Request, res: Response) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map((item: { id: number; quantity: any; }) => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: 'cad',
            product_data: {
              name: storeItem?.name
            },
            unit_amount: storeItem?.priceInCents,
            tax_behavior: "exclusive",
          },
          quantity: item.quantity
        }
      }),
      success_url: `${process.env.CLIENT_URL}?success=true`,
      cancel_url: `${process.env.CLIENT_URL}?canceled=true`,
      automatic_tax: {enabled: true},
    })
    res.redirect(303, session.url);
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
})


export default paymentRoute;
