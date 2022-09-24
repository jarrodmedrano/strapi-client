/* /pages/login.js */

import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  Container,
  Row,
  Col,
  Button,
  Input,
  Spacer,
  Text,
} from '@nextui-org/react';
import { Formik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookie from 'js-cookie';
import AppContext from '../contexts/context';
import { User } from './api/auth/login';

const Schema = z.object({
  address: z.string(),
  city: z.string(),
  state: z.string(),
});

function Checkout() {
  const stripePromise = loadStripe('pk_test_sxCvm0SIbCpjRfffcuCf2CFH');
  const [error, setError] = useState('');
  const router = useRouter();
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext?.isAuthenticated) {
      router.push('/'); // redirect if you're already logged in
    }
  }, []);

  const handleCheckout = async (values: {
    address: string;
    city: string;
    state: string;
  }) => {
    const req: AxiosRequestConfig = {
      method: 'POST',
      url: 'http://localhost:3000/api/auth/login',
      data: values,
    };

    try {
      const { data: user, data }: AxiosResponse<User> = await axios(req);
      Cookie.set('token', data.jwt);
      appContext.setUser(user);
      router.push('/');
    } catch (err) {
      setError('Error logging in');
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
    <Elements stripe={stripePromise}>
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
                      color={
                        errors.state && touched.state ? 'error' : 'default'
                      }
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

                    <Button
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
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
    </Elements>
  );
}

export default Checkout;
