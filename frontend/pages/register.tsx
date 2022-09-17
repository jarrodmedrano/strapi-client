/* /pages/register.js */

import React, { useState, useContext } from 'react';

import { Container, Row, Col, Button, Input, Spacer } from '@nextui-org/react';
import AppContext from '../contexts/context';
import auth from './api/auth/[...auth]';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';

const Schema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const Register = () => {
  const [loading, setLoading] = useState(false);
  const appContext = useContext(AppContext);

  const handleRegister = async (values) => {
    setLoading(true);
    console.log('values', values);
    try {
      const res = await auth.registerUser(
        values.username,
        values.email,
        values.password
      );
      console.log('res', res);
      appContext?.setUser(res.user);
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
                      errors.username &&
                      touched.username &&
                      errors?.username?.toString()
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
                      errors.email && touched.email && errors?.email?.toString()
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

          {/* <Form>
                <Input
                  disabled={loading}
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                  value={data.username}
                  type="text"
                  name="username"
                  style={{ height: 50, fontSize: '1.2em' }}
                />
                <Input
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  value={data.email}
                  type="email"
                  name="email"
                  style={{ height: 50, fontSize: '1.2em' }}
                />
                <Input
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  value={data.password}
                  type="password"
                  name="password"
                  style={{ height: 50, fontSize: '1.2em' }}
                />
                <span>
                  <a href="">
                    <small>Forgot Password?</small>
                  </a>
                </span>
                <Button
                  style={{ float: 'right', width: 120 }}
                  color="primary"
                  disabled={loading}
                  onClick={() => {
                    setLoading(true);
                    registerUser(data.username, data.email, data.password)
                      .then((res) => {
                        // set authed user in global context object
                        appContext.setUser(res.data.user);
                        setLoading(false);
                        console.log(
                          `registered user: ${JSON.stringify(res.data)}`
                        );
                      })
                      .catch((error) => {
                        console.log(`error in register: ${error}`);
                        //setError(error.response.data);
                        setLoading(false);
                      });
                  }}
                >
                  {loading ? 'Loading..' : 'Submit'}
                </Button> */}
        </Col>
      </Row>
    </Container>
  );
};
export default Register;
