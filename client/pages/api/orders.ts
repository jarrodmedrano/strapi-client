import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { CartItem } from '../../schemas/cart';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const handler: (
  req: {
    body: {
      amount: number;
      dishes: CartItem[];
      address: string;
      city: string;
      state: string;
      token: string;
    };
    method: string;
    headers: AxiosRequestHeaders;
  },
  res: AxiosResponse
) => Promise<void> = async (req, res) => {
  const { body, headers } = req;

  const { address, amount, dishes, token, city, state } = JSON.parse(
    JSON.stringify(body)
  );
  const stripeAmount = Math.floor(amount * 100);
  // charge on stripe
  const charge = await stripe.charges.create({
    // Transform cents to dollars.
    amount: stripeAmount,
    currency: 'usd',
    description: `Order ${new Date()}`,
    source: token,
  });

  try {
    const { data } = await axios.post(
      `${API_URL}/orders`,
      JSON.stringify({
        user: 1,
        charge_id: charge.id,
        amount: stripeAmount,
        address,
        dishes,
        city,
        state,
      }),
      headers
    );

    // @ts-ignore
    return res.status(200).json(data);
  } catch (err) {
    // @ts-ignore
    return res.status(400).json({
      err,
    });
  }
};

export default handler;
