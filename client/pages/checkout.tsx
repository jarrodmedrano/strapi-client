/* /pages/login.js */

import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import {
  Container,
  Row,
  Col,
  Button,
  Spacer,
  Text,
  Input,
} from '@nextui-org/react';
import { Formik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import Cookies from 'js-cookie';
import AppContext from '../contexts/context';

const Schema = z.object({
  address: z.string(),
  city: z.string(),
  state: z.string(),
});

function Checkout() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
  const [error, setError] = useState('');
  const router = useRouter();
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext?.isAuthenticated) {
      router.push('/'); // redirect if you're already logged in
    }
  }, []);

  const stripe = useStripe();
  const elements = useElements();

  const handleCheckout = async (values: {
    address: string;
    city: string;
    state: string;
  }) => {
    // // Use elements.getElement to get a reference to the mounted Element.
    const cardElement = elements?.getElement(CardElement);
    const token = cardElement ? await stripe?.createToken(cardElement) : null;
    const userToken = Cookies.get('token');

    const body = JSON.stringify({
      // @ts-ignore
      amount: Number(`${Math.round(`${appContext.cart.total}e2`)}e-2`),
      dishes: appContext.cart.items,
      address: values.address,
      city: values.city,
      state: values.state,
      token: token?.token?.id,
    });

    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: userToken ? { Authorization: `Bearer ${userToken}` } : undefined,
      body,
    });

    if (!response.ok) {
      setError(response.statusText);
    } else {
      console.log('SUCCESS');
    }
  };

  const inputStyle = {
    iconColor: '#c4f0ff',
    color: '#ff0',
    fontWeight: '500',
    fontSize: '16px',
    fontSmoothing: 'antialiased',
    ':-webkit-autofill': {
      color: '#fce883',
    },
    '::placeholder': {
      color: '#87BBFD',
    },
  };

  return (
    <Container>
      <Row>
        <Col>
          <Text h1>Checkout</Text>

          <Formik
            initialValues={{ address: '', city: '', state: '' }}
            onSubmit={handleCheckout}
            validationSchema={toFormikValidationSchema(Schema)}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <>
                  <Input
                    label="Address"
                    bordered
                    clearable
                    name="address"
                    style={{ height: 50, fontSize: '1.2em' }}
                    onChange={handleChange}
                    value={values.address}
                    color={
                      errors.address && touched.address ? 'error' : 'default'
                    }
                    helperText={
                      errors.address && touched.address
                        ? errors?.address?.toString()
                        : ''
                    }
                  />
                  <Spacer y={1.6} />
                  <Input
                    label="City"
                    bordered
                    clearable
                    name="city"
                    style={{ height: 50, fontSize: '1.2em' }}
                    onChange={handleChange}
                    value={values.city}
                    color={errors.city && touched.city ? 'error' : 'default'}
                    helperText={
                      errors.city && touched.city
                        ? errors?.city?.toString()
                        : ''
                    }
                  />
                  <Spacer y={1.6} />
                  <Input
                    label="State"
                    bordered
                    clearable
                    name="state"
                    style={{ height: 50, fontSize: '1.2em' }}
                    onChange={handleChange}
                    value={values.state}
                    color={errors.state && touched.state ? 'error' : 'default'}
                    helperText={
                      errors.state && touched.state
                        ? errors?.state?.toString()
                        : ''
                    }
                  />
                  <Spacer y={1.6} />

                  <CardElement
                    options={{
                      style: { base: inputStyle },
                    }}
                  />

                  <Spacer y={1.6} />

                  <Button color="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting... ' : 'Submit'}
                  </Button>
                </>
                {error}
              </form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
