import { NextSeo } from 'next-seo';
import { Grid, Container, Card, Row, Text } from '@nextui-org/react';
import React from 'react';

const Index = () => {
  return (
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
                <Text
                  h1
                  size={60}
                  css={{
                    textGradient: '45deg, $pink600  -20%, deeppink 50%',
                  }}
                  weight="bold"
                >
                  Marshmallow Restaurant
                </Text>
              </div>
              <h3>Sweet enough for you</h3>
            </div>
          </Row>
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default Index;
