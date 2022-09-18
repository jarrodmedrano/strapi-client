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
  req: {
    body: { username: string; email: string; password: string };
    method: string;
  },
  res: AxiosResponse<User>
) => Promise<void> = async (req, res) => {
  const {
    body: { username, email, password },
    method,
  } = req;

  try {
    const { data } = await axios.post(`${API_URL}/auth/local/register`, {
      username,
      email,
      password,
    });
    // @ts-ignore
    return res.status(200).json(data);
  } catch (err) {
    // @ts-ignore
    return res.status(400).json({
      message: 'Email or Username are already taken',
    });
  }
};

export default handler;
