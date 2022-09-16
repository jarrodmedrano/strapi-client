import { NextSeo } from 'next-seo';
import {
  Grid,
  Container,
  Card,
  Row,
  Text,
  Image,
  Link,
} from '@nextui-org/react';
import React from 'react';
import StoreList from '../components/StoreList';
import { Header } from '../components/Header';

const Index = () => {
  return (
    <>
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
                          textGradient: '45deg, $pink600  -20%, deeppink 50%',
                        }}
                        weight="bold"
                      >
                        MarshMallow Land
                      </Text>
                    </Link>
                  </div>
                  <h3>A marshmallow restaurant</h3>
                </div>
              </Row>
            </Grid>
          </Grid.Container>
        </Container>
      </div>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} md={6}>
          <StoreList store="" />
        </Grid>
      </Grid.Container>
    </>
  );
};

export default Index;
