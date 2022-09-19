/* /pages/register.js */

import React, { useState, useContext, useEffect } from 'react';

import { Container, Row, Col, Button, Input, Spacer } from '@nextui-org/react';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { User } from './api/auth/login';
import AppContext from '../contexts/context';

/* /lib/auth.js */

const Schema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext?.isAuthenticated) {
      router.push('/'); // redirect if you're already logged in
    }
  }, []);

  const handleRegister = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    setError('');
    setLoading(true);

    const req: AxiosRequestConfig = {
      method: 'POST',
      url: 'http://localhost:3000/api/auth/register',
      data: values,
    };

    try {
      const { data: user }: AxiosResponse<User> = await axios(req);

      appContext?.setUser(user);

      router.push('/');
    } catch (err: unknown) {
      setLoading(false);
      // @ts-ignore
      setError(err?.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Formik
            initialValues={{ username: '', email: '', password: '' }}
            onSubmit={handleRegister}
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
                    label="Name"
                    bordered
                    clearable
                    name="username"
                    style={{ height: 50, fontSize: '1.2em' }}
                    onChange={handleChange}
                    value={values.username}
                    color={
                      errors.username && touched.username ? 'error' : 'default'
                    }
                    helperText={
                      errors.username && touched.username
                        ? errors?.username?.toString()
                        : ''
                    }
                  />
                  <Spacer y={1.6} />
                  <Input
                    label="Email"
                    bordered
                    clearable
                    name="email"
                    style={{ height: 50, fontSize: '1.2em' }}
                    onChange={handleChange}
                    value={values.email}
                    color={errors.email && touched.email ? 'error' : 'default'}
                    helperText={
                      errors.email && touched.email
                        ? errors?.email?.toString()
                        : ''
                    }
                  />
                  <Spacer y={1.6} />

                  <Input.Password
                    label="Password"
                    bordered
                    clearable
                    type="password"
                    name="password"
                    style={{ height: 50, fontSize: '1.2em' }}
                    onChange={handleChange}
                    value={values.password}
                    initialValue="nextui123"
                    color={
                      errors.password && touched.password ? 'error' : 'default'
                    }
                    helperText={
                      errors.password && touched.password
                        ? errors?.password?.toString()
                        : ''
                    }
                  />

                  <Spacer y={1.6} />
                  <span>
                    <a href="">
                      <small>Forgot Password?</small>
                    </a>
                  </span>
                  <Spacer y={1.6} />
                  <Button color="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting... ' : 'Submit'}
                  </Button>
                  <Spacer y={1.6} />
                  {!loading && error && error}
                </>
              </form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}
export default Register;
