import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';

const stripe = require('stripe')(
  'sk_test_51BnZ5ZAjOkUml8sa3BYRVU0uBgazzZQYTlxl4TV30qoiEXSAkpzqh8feUWyU6Qz4RQSC8rxvtPbTUxsouBqN4jJe00iCWUYmJ2'
);

const handler: (
  req: {
    body: string;
    method: string;
    headers: AxiosRequestHeaders;
  },
  res: AxiosResponse
) => Promise<void> = async (req, res) => {
  const { body, headers } = req;

  const { address, amount, dishes, token, city, state } = JSON.parse(body);
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
    const orderReq: AxiosRequestConfig = {
      method: 'POST',
      url: `https://plankton-app-2awrj.ondigitalocean.app/api/orders`,
      data: {
       data: {
        user: '1',
        chargeId: charge.id,
        amount: stripeAmount,
        address,
        dishes,
        city,
        state,
       }
      },
      headers,
    };

    const { data }: AxiosResponse<any> = await axios(orderReq);
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
