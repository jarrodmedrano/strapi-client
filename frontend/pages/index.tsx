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
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} md={6}>
          <StoreList store="" />
        </Grid>
      </Grid.Container>
    </>
  );
};

export default Index;
