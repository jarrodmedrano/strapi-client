import React, { useContext } from 'react';
import {
  Badge,
  Button,
  Col,
  Grid,
  Row,
  styled,
  Table,
  Text,
  Tooltip,
} from '@nextui-org/react';
import AppContext from '../contexts/context';
import { Cart, CartItem, CartItemType } from '../schemas/cart';
import DeleteIcon from '../components/DeleteIcon';
import IconButton from '../components/IconButton';
import PlusIcon from '../components/PlusIcon';
import Router from 'next/router';
// we can pass cart data in via props method
// the alternative is using useContext as below

const TableWrapper = styled('div', {
  width: '100%',
});

const RenderItems = ({
  cart,
  removeItem,
  addItem,
}: {
  cart: Cart;
  removeItem: (item: any) => void;
  addItem: (item: any) => void;
}) => {
  const itemMap = cart.items.map((item) => (
    <Table.Cell key={item.id}>
      <div>
        <span id="item-price">&nbsp; ${item.price}</span>
        <span id="item-name">&nbsp; {item.name}</span>
      </div>
      <div>
        <Button onClick={() => addItem(item)}>+</Button>
        <Button onClick={() => removeItem(item)}>-</Button>
        <span style={{ marginLeft: 5 }} id="item-quantity">
          {item.quantity}x
        </span>
      </div>
    </Table.Cell>
  ));

  const columns = [
    {
      key: 'name',
      label: 'NAME',
    },
    {
      key: 'price',
      label: 'PRICE',
    },
    {
      key: 'quantity',
      label: 'QUANTITY',
    },
    {
      key: 'actions',
      label: 'ACTIONS',
    },
  ];
  const rows = cart.items;

  const renderCell = (item: CartItem, columnKey: CartItemType) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case 'actions':
        return (
          <Row justify="center" align="center">
            <Col css={{ d: 'flex' }}>
              <Tooltip content="Add item" color="error">
                <IconButton onClick={() => addItem(item)}>
                  <PlusIcon size={20} fill={'#17C964'} />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: 'flex' }}>
              <Tooltip content="Delete item" color="error">
                <IconButton onClick={() => removeItem(item)}>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  return (
    <TableWrapper>
      <Table
        aria-label="Example table with static content"
        css={{
          height: 'auto',
          minWidth: '100%',
          width: '100%',
        }}
        selectionMode="single"
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column key={column.key}>{column.label}</Table.Column>
          )}
        </Table.Header>
        <Table.Body items={rows}>
          {(item) => (
            <Table.Row key={item.id}>
              {(columnKey) => (
                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </TableWrapper>
  );
};
const CheckoutItems = ({ cart }: { cart: Cart }) => (
  <TableWrapper>
    <Table
      aria-label="Example table with static content"
      css={{
        height: 'auto',
        minWidth: '100%',
        width: '100%',
      }}
      selectionMode="single"
    >
      <Table.Header>
        <Table.Column>Total</Table.Column>
        <Table.Column>&nbsp;</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <h5 style={{ fontWeight: 100, color: 'gray' }}>Total:</h5>
            <h3>${cart?.total}</h3>
          </Table.Cell>
          <Table.Cell>
            <Button onClick={() => Router.push('/checkout')}>Checkout</Button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </TableWrapper>
);

const CartRoute = () => {
  //   const isAuthenticated = true;
  const { cart, addItem, removeItem } = useContext(AppContext);

  // return Cart
  return cart ? (
    <>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12}>
          {' '}
          <Text h1>Cart</Text>
          <hr />
        </Grid>
        {cart?.items ? (
          <RenderItems cart={cart} addItem={addItem} removeItem={removeItem} />
        ) : (
          <></>
        )}
        {cart?.items ? <CheckoutItems cart={cart} /> : <></>}
      </Grid.Container>

      <style jsx>{`
        #item-price {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
        #item-quantity {
          font-size: 0.95em;
          padding-bottom: 4px;
          color: rgba(158, 158, 158, 1);
        }
        #item-name {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
      `}</style>
    </>
  ) : (
    <></>
  );
};
export default CartRoute;
