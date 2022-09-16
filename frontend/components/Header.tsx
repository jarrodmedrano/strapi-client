import {
  Navbar,
  Button,
  Link,
  Text,
  Card,
  Radio,
  NavbarProps,
} from '@nextui-org/react';
import { StyledComponent } from '@stitches/react/types/styled-component';
import { useContext, useState } from 'react';
import AppContext from '../contexts/context';
import { useSession, signIn, signOut } from 'next-auth/react';

export const Header = () => {
  const { data: session } = useSession();

  const { user } = useContext(AppContext);
  console.log('user', user);

  const [variant, setVariant] = useState<
    'static' | 'sticky' | 'floating' | undefined
  >('static');

  const variants = ['static', 'floating', 'sticky'];

  return (
    <Navbar variant={variant}>
      <Navbar.Brand>
        <Text b color="inherit" hideIn="xs">
          <Link href="/">MarshMallow Land</Link>
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs"></Navbar.Content>
      <Navbar.Content>
        {user ? (
          <Navbar.Link color="inherit" href="#">
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
  );
};
export default Navbar;
