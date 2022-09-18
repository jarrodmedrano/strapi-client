import { Grid, Card, Text, Row, Image, Button } from '@nextui-org/react';
import { gql, useQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';

import AppContext from '../contexts/context';

const API_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:1337';

export default function DishesList(props) {
  const GET_DISHES = gql`
    query {
      dishes {
        data {
          id
          attributes {
            Dish {
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
  const { loading, error, data } = useQuery(GET_DISHES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  const searchQuery =
    data.dishes.data.map((res) => {
      return res.attributes.Dish;
    }) || [];

  const restList = searchQuery.map((dish, index) => {
    const {
      data: { attributes: thumbnail = '' },
    } = dish?.thumbnail || null;
    return (
      <Card key={dish.id} color="black">
        <Card.Body>
          <Row justify="center" align="center">
            <Image objectFit="cover" src={`${API_URL}${thumbnail.url}`}></Image>
          </Row>
          <Row justify="center" align="center">
            <Text h4 size={20} css={{ m: 0 }}>
              {dish?.name}
            </Text>
          </Row>
          <Row justify="center" align="center">
            <Text h4 size={15} b css={{ m: 0 }}>
              {dish?.description}
            </Text>
          </Row>
        </Card.Body>
      </Card>
    );
  });

  return <Grid xs={4}>{restList}</Grid>;
}
