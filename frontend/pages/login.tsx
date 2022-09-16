/* /pages/login.js */

import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Button, Input, Spacer } from '@nextui-org/react';
import AppContext from '../contexts/context';
import { Formik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { login } from './api/auth/[...auth]';

const Schema = z.object({
  name: z.string(),
  password: z.string(),
});

function Login(props) {
  const [data, updateData] = useState({ identifier: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext.isAuthenticated) {
      router.push('/'); // redirect if you're already logged in
    }
  }, []);

  const handleLogin = async (values) => {
    setLoading(true);
    console.log('values', values);
    try {
      const res = await login(values.name, values.password);
      appContext.setUser(res.user);

      console.log('res', res);
    } catch (err) {
      console.log('error', err);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Formik
            initialValues={{ name: '', password: '' }}
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
                    name="name"
                    style={{ height: 50, fontSize: '1.2em' }}
                    onChange={handleChange}
                    value={values.name}
                    color={errors.name && touched.name ? 'error' : 'default'}
                    helperText={
                      errors.name &&
                      touched.name &&
                      errors?.password?.toString()
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
                      errors.password &&
                      touched.password &&
                      errors?.password?.toString()
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
              </form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
