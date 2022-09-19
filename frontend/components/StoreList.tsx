import {
  Grid,
  Card,
  Text,
  Row,
  Image,
  Button,
  Link,
  Col,
} from '@nextui-org/react';
import { gql, useQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';

import AppContext from '../contexts/context';

const API_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:1337';

export default function RestaurantList(props) {
  const GET_RESTAURANTS = gql`
    query {
      restaurants {
        data {
          id
          attributes {
            Restaurant {
              id
              description
              name
              thumbnail {
                data {
                  attributes {
                    name
                    size
                    width
                    previewUrl
                    height
                    alternativeText
                    caption
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_RESTAURANTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  const searchQuery =
    data.restaurants.data.map((res) => {
      return res.attributes.Restaurant;
    }) || [];

  const restList = searchQuery.map((restaurant, index) => {
    console.log('restaurant', restaurant);
    const {
      data: { attributes: thumbnail },
    } = restaurant?.thumbnail;
    return (
      <Grid xs={4} key={restaurant.id}>
        <Link href={`/restaurant/${restaurant.id}`}>
          {' '}
          <Card key={restaurant.id} color="black" isPressable isHoverable>
            <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
              <Col>
                <Text
                  size={12}
                  weight="bold"
                  transform="uppercase"
                  color="#ffffffAA"
                >
                  {restaurant?.name}
                </Text>
                <Text h4 color="white">
                  {restaurant?.description}
                </Text>
              </Col>
            </Card.Header>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src={`${API_URL}${thumbnail.url}`}
                objectFit="cover"
                width="100%"
                height={140}
              />
            </Card.Body>

            <Card.Footer css={{ justifyItems: 'center' }}>
              <Row wrap="wrap" justify="space-between" align="center">
                <Button size="xs">View</Button>
              </Row>
            </Card.Footer>
          </Card>
        </Link>
      </Grid>
    );
  });

  return <Grid.Container gap={2}>{restList}</Grid.Container>;
}
