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
import StoreList from '../components/RestaurantList';
import { Header } from '../components/Header';
import DishesList from '../components/Dishes';

const Dishes = () => {
  return <DishesList restId="" />;
};

export default Dishes;
