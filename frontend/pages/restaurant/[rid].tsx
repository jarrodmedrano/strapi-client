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
import StoreList from '../../components/StoreList';
import { Header } from '../../components/Header';
import DishesList from '../../components/Dishes';

import { useRouter } from 'next/router';

const Dishes = () => {
  const router = useRouter();
  const { rid } = router.query;

  return <DishesList restId={rid} />;
};

export default Dishes;
