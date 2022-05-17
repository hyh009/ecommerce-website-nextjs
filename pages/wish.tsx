import React from 'react';
import { CartHeader } from '../components/Cart';
import { EmptyCart } from '../components/Empty';
import { FlexCol} from "../components/Wrapper/styles";
import styled from 'styled-components';
import { NextPage } from 'next';

const Wish:NextPage = () => {

  return (
    <Container>
        <CartHeader quantity={0} type="wish"/>
        <EmptyCart type="wish"/>
    </Container>
  )
}

export default Wish;

const Container = styled(FlexCol)`
    min-height:calc(100vh - var(--navbarHeight)  - 30px);
    padding:20px;
`;