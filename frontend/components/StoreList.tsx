import { Grid, Card, Text, Row, Image, Button, Link } from '@nextui-org/react';
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
    const {
      data: { attributes: thumbnail },
    } = restaurant?.thumbnail;
    return (
      <Link>
        <Card key={restaurant.id} color="black">
          <Card.Body>
            <Row justify="center" align="center">
              <Image
                objectFit="cover"
                src={`${API_URL}${thumbnail.url}`}
              ></Image>
            </Row>
            <Row justify="center" align="center">
              <Text h4 size={20} css={{ m: 0 }}>
                {restaurant?.name}
              </Text>
            </Row>
            <Row justify="center" align="center">
              <Text h4 size={15} b css={{ m: 0 }}>
                {restaurant?.description}
              </Text>
            </Row>
          </Card.Body>
        </Card>
      </Link>
    );
  });

  return <Grid xs={4}>{restList}</Grid>;
}
