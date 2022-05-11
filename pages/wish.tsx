import React from 'react';
import {useAppSelector} from "../store/hooks";
import {APPState} from "../store/index";
import { CartHeader } from '../components/Cart';
import { EmptyCart } from '../components/Empty';
import { FlexCol} from "../components/Wrapper/styles";
import styled from 'styled-components';
import { NextPage } from 'next';

const Wish:NextPage = () => {
    const cart = useAppSelector((state:APPState)=>state.cart);
  return (
    <Container>
        <CartHeader quantity={cart.quantity} type="wish"/>
        <EmptyCart type="wish"/>
    </Container>
  )
}

export default Wish;

const Container = styled(FlexCol)`
    min-height:calc(100vh - var(--navbarHeight)  - 30px);
    padding:20px;
`;