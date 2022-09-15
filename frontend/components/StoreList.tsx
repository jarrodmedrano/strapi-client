import { Grid, Card, Text, Row, Image, Button } from '@nextui-org/react';
import { gql, useQuery } from '@apollo/client';
import { useContext, useState } from 'react';

import AppContext from '../contexts/context';

export default function StoreList(props) {
  const [restaurantID, setRestaurantID] = useState(0);
  const { cart } = useContext(AppContext);
  const [state, setState] = useState(cart);
  const GET_RESTAURANTS = gql`
    query {
      restaurants {
        id
        name
        description
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_RESTAURANTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  console.log(`Query Data: ${data.restaurants}`);

  let searchQuery =
    data.restaurants.filter((res) => {
      return res.name.toLowerCase().includes(props.search);
    }) || [];

  let restId = searchQuery[0] ? searchQuery[0].id : null;

  const restList = searchQuery.map((store, index) => {
    return (
      <Card key={store.id} color="black">
        <Card.Body>
          <Row justify="center" align="center">
            <Image objectFit="cover" src={store?.thumbnail}></Image>
          </Row>
          <Row justify="center" align="center">
            <Text h4 size={20} css={{ m: 0 }}>
              {store?.name}
            </Text>
          </Row>
          <Row justify="center" align="center">
            <Text h4 size={15} b css={{ m: 0 }}>
              {store?.description}
            </Text>
          </Row>
        </Card.Body>
      </Card>
    );
  });

  return <Grid xs={4}>{restList}</Grid>;
}
