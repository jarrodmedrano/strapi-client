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

export const Header = () => {
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
          MarshMallow Land
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs">
        <Navbar.Link href="#">Features</Navbar.Link>
        <Navbar.Link isActive href="#">
          Customers
        </Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Company</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        {user ? (
          <Navbar.Link color="inherit" href="#">
            Logout
          </Navbar.Link>
        ) : (
          <Navbar.Link color="inherit" href="#">
            Login
          </Navbar.Link>
        )}

        <Navbar.Item>
          <Button auto flat as={Link} href="#">
            Sign Up
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};
export default Navbar;
