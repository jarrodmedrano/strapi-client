import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { CartItem } from '../../schemas/cart';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

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

  try {
    const { data } = await axios.post(
      `${API_URL}/orders`,
      JSON.stringify(body),
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
