import {
  Navbar,
  Button,
  Link,
  Text,
  Card,
  Radio,
  NavbarProps,
  Container,
  Grid,
  Row,
} from '@nextui-org/react';
import { StyledComponent } from '@stitches/react/types/styled-component';
import { useContext, useState } from 'react';
import AppContext from '../contexts/context';
import { useSession, signIn, signOut } from 'next-auth/react';
import { NextSeo } from 'next-seo';

export const Header = () => {
  const { data: session } = useSession();

  const { user, logout } = useContext(AppContext);
  console.log('user', user);

  const [variant, setVariant] = useState<
    'static' | 'sticky' | 'floating' | undefined
  >('static');

  const variants = ['static', 'floating', 'sticky'];

  return (
    <>
      <Navbar variant={variant}>
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            <Link href="/">MarshMallow Land</Link>
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs"></Navbar.Content>
        <Navbar.Content>
          {user ? (
            <Navbar.Link color="inherit" href="#" onClick={logout}>
              Logout
            </Navbar.Link>
          ) : (
            <Navbar.Link color="inherit" href="/login">
              Login
            </Navbar.Link>
          )}

          {!user && (
            <Navbar.Item>
              <Button auto flat as={Link} href="/register">
                Sign Up
              </Button>
            </Navbar.Item>
          )}
        </Navbar.Content>
      </Navbar>
      <div className="bgImage">
        <Container alignContent="center">
          <NextSeo
            title="Marshmallow Restaurant"
            description="Marshmallows are good for you"
          />
          <Grid.Container gap={2} justify="center">
            <Grid xs={12} md={6}>
              <Row justify="center" align="center">
                <div className="main">
                  <div className="header">
                    <Link href="/">
                      <Text
                        h1
                        size={60}
                        css={{
                          textGradient: '45deg, $primary  -20%, $secondary 50%',
                        }}
                        weight="bold"
                      >
                        MarshMallow Land
                      </Text>
                    </Link>
                  </div>
                  <h3>A marshmallow restaurant guide</h3>
                </div>
              </Row>
            </Grid>
          </Grid.Container>
        </Container>
      </div>
    </>
  );
};
export default Navbar;
