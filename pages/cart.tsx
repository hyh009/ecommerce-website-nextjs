import React, { useEffect, useState } from 'react';
import {useAppSelector, useAppDispatch} from "../store/hooks";
import {APPState} from "../store/index";
import {useSession} from "next-auth/react";
import { FlexCol, FlexBetween} from "../components/Wrapper/styles";
import {CartItem, CartHeader, Summary} from "../components/Cart";
import { updateCart, updateNotLoginCart } from '../store/reducer/cartReducer';
import { axiosInstance } from '../utils/config';
import { AxiosResponse } from "axios";
import { NextPage } from 'next';
import { ICart, ICartProduct } from '../types/cart';
import { IProduct } from '../types/product';
import styled from 'styled-components';
import { devices } from '../styles/responsive';

interface Props {
    cart:ICart;
}

const Cart:NextPage<Props> = () => {
    const cart = useAppSelector((state:APPState)=>state.cart);
    const {data:session} = useSession();
    const dispatch = useAppDispatch();
    const [products, setProducts] = useState<Array<IProduct>>([]);

  useEffect(()=>{
    let controller = new AbortController();
    if(cart?.products){
        // get update info(price, inStock) of product
        const ids:Set<string> = new Set();
        cart.products.forEach((product)=>ids.add(product._id as string));
        const getCartProductsInfo = async (ids:Set<string>):Promise<void> => {
            let promises = [];
            for (const id of ids){
                promises.push(await axiosInstance.get(`/api/products/${id}`,{signal:controller.signal}));
            }

            const results:AxiosResponse<IProduct>[] = await Promise.all(promises);
            setProducts(()=>results.map((result)=>result.data));
        };
        getCartProductsInfo(ids);       
    }
    return ()=>{
        controller && controller.abort();
    }
  },[cart.products]);

  const handleAmount = (mode:"plus"|"minus",id?:string):void=>{
    const newProducts = cart.products.reduce<ICartProduct[]>((products:ICartProduct[], p:ICartProduct)=>{
        if(`${p._id}${p?.pattern?.name}${p?.color?.name}`===id){
            if(p.quantity>=20 && mode==="plus") return products.concat(p);
            if(p.quantity===1 && mode==="minus") return products;
            if(mode==="plus"){
                return products.concat({...p, quantity:p.quantity+1});
            }else{
                return products.concat({...p, quantity:p.quantity-1})
            }
        }else{
            return products.concat(p);
        }
     },[]);

    if(session){
        dispatch(updateCart({
            user: session.user._id,
            products:newProducts,
            quantity:newProducts.length
        }))

      }else{
        dispatch(updateNotLoginCart({products:newProducts})); 
        }
     };

  const deleteCartItem = (id:string) => {
        const updatedCart = cart.products.filter((product:ICartProduct)=>`${product._id}${product.color?.name}${product.pattern?.name}`!== id);
        if(session){
          dispatch(updateCart({
            user:session.user._id,
            products:updatedCart,
            quantity:0
          }))
        }else{
          dispatch(updateNotLoginCart({products:updatedCart}));
        }
    };

  return (
    <Container>
        <CartHeader quantity={cart.quantity}/>
        <Bottom>
            <Info>
                {products.length>0 && cart.products?.map((product:ICartProduct,index:number)=>
                <CartItem key={`${product._id}${index}`}
                          product={products.find(((item)=>item._id === product._id)) as IProduct}
                          quantity={product.quantity}
                          color={product?.color}
                          pattern={product.pattern}
                          handleAmount={handleAmount}
                          deleteCartItem={deleteCartItem} />)}
            </Info>
            <Summary cart={cart} products={products}/>
        </Bottom>
    </Container>
  )
}

export default Cart;

const Container = styled(FlexCol)`
    min-height:calc(100vh - var(--navbarHeight)  - 30px);
    padding:20px;
`;

const Bottom = styled(FlexBetween)`
    gap:10px;
    @media ${devices.tabletL}{
        flex-direction:column;
    }
`;

const Info = styled.div`
    flex:3;
    display:flex;
    flex-direction:column;
    gap:7px;
`;

