import { Grid, Card, Text, Row, Button, Col } from '@nextui-org/react';
import { gql, useQuery } from '@apollo/client';
import { useContext } from 'react';

import AppContext from '../contexts/context';
import { RestaurantDish } from '../schemas/restaurant';

const API_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:1337';

export default function DishesList({ restId }: { restId: string }) {
  const { addItem } = useContext(AppContext);

  const GET_RESTAURANT_DISHES = gql`
    query ($id: ID!) {
      restaurant(id: $id) {
        data {
          id
          attributes {
            Restaurant {
              description
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
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: restId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  const {
    restaurant: {
      data: {
        attributes: {
          Restaurant: { dishes },
        },
      },
    },
  } = data;

  const restList = dishes.data.map((dish: RestaurantDish) => {
    const {
      attributes: {
        Dish: {
          description,
          id,
          name,
          thumbnail: {
            data: { attributes },
          },
        },
      },
    } = dish || null;
    return (
      <Grid xs={4} key={id}>
        <Card key={dish.id} color="black">
          <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
            <Col>
              <Text
                size={12}
                weight="bold"
                transform="uppercase"
                color="#ffffffAA"
              >
                {name}
              </Text>
              <Text h4 color="white">
                {description}
              </Text>
            </Col>
          </Card.Header>
          <Card.Body css={{ p: 0 }}>
            <Card.Image
              src={`${API_URL}${attributes.url}`}
              objectFit="cover"
              width="100%"
              height={140}
            />
          </Card.Body>

          <Card.Footer css={{ justifyItems: 'center' }}>
            <Row wrap="wrap" justify="space-between" align="center">
              <Button size="xs" onClick={() => addItem(dish)}>
                Add to Cart
              </Button>
            </Row>
          </Card.Footer>
        </Card>
      </Grid>
    );
  });

  return <Grid.Container gap={2}>{restList}</Grid.Container>;
}
