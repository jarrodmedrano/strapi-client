/* /pages/login.js */

import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Button, Input, Spacer } from '@nextui-org/react';
import { Formik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import AppContext from '../contexts/context';
import { User } from './api/auth/login';

const Schema = z.object({
  identifier: z.string(),
  password: z.string(),
});

function Login() {
  const [error, setError] = useState('');
  const router = useRouter();
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext?.isAuthenticated) {
      router.push('/'); // redirect if you're already logged in
    }
  }, []);

  const handleLogin = async (values: {
    identifier: string;
    password: string;
  }) => {
    const req: AxiosRequestConfig = {
      method: 'POST',
      url: 'http://localhost:3000/api/auth/login',
      data: values,
    };

    try {
      const { data: user }: AxiosResponse<User> = await axios(req);

      appContext?.setUser(user);

      router.push('/');
    } catch (err) {
      setError('Error logging in');
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Formik
            initialValues={{ identifier: '', password: '' }}
            onSubmit={handleLogin}
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
                    name="identifier"
                    style={{ height: 50, fontSize: '1.2em' }}
                    onChange={handleChange}
                    value={values.identifier}
                    color={
                      errors.identifier && touched.identifier
                        ? 'error'
                        : 'default'
                    }
                    helperText={
                      errors.identifier && touched.identifier
                        ? errors?.password?.toString()
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

export default Login;
