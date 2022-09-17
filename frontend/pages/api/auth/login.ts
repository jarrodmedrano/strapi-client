import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookie from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

export interface User {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: true;
    blocked: false;
    createdAt: string;
    updatedAt: string;
  };
}

const handler: (
  req: { body: { identifier: string; password: string }; method: string },
  res: AxiosResponse<User>
) => Promise<void> = async (req, res) => {
  console.log('req', req);
  const {
    body: { identifier, password },
    method,
  } = req;

  if (method === 'POST') {
    try {
      const { data } = await axios.post(`${API_URL}/auth/local`, {
        identifier,
        password,
      });

      console.log('data', data);

      // @ts-ignore
      return res.status(200).json(data);
    } catch (err) {
      console.log('error', err);
      // @ts-ignore
      return res.status(400).json({
        err,
      });
    }
  }
};

export default handler;
