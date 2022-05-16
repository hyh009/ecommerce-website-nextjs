import React, { useEffect, useState, useContext } from 'react';
import {useSession} from "next-auth/react";
import { FlexCol, FlexBetween} from "../components/Wrapper/styles";
import {CartItem, CartHeader, Summary} from "../components/Cart";
import { EmptyCart } from '../components/Empty';
import { FixedSpinner } from '../components/Common';
import CartContext from '../store/cart-context';
import { getCartProductsInfo } from "../utils/cartAction";
import Head from 'next/head'
import { PAGE_DESC, PAGE_TITLE } from '../utils/data/headContent';
import { NextPage } from 'next';
import { ICartProduct } from '../types/cart';
import { IProduct } from '../types/product';
import styled from 'styled-components';
import { devices } from '../styles/responsive';

interface Props {
  isLoadingSession:boolean;
}

const Cart:NextPage<Props> = ({isLoadingSession}) => {
    const cartCtx = useContext(CartContext);
    const {data:session} = useSession();
    const [products, setProducts] = useState<Array<IProduct>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string|null>(null);

  useEffect(()=>{
    const controller = new AbortController();
    if(cartCtx.products){
        // get update info(price, inStock) of product
        const ids:Set<string> = new Set();
        cartCtx.products.forEach((product:ICartProduct)=>ids.add(product._id as string));
        getCartProductsInfo(ids, setIsLoading, setProducts, controller);       
    }
    return ()=>{
        controller && controller.abort();
    }
  },[cartCtx.products]);


  const handleAmount = (mode:"plus"|"minus",id?:string):void=>{
    const newProducts = cartCtx.products.reduce<ICartProduct[]>((products:ICartProduct[], p:ICartProduct)=>{
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
      cartCtx.updateCart({
        user:session.user._id,
        products:newProducts,
        quantity:newProducts.length
      }, setErrorMsg);

      }else{
        cartCtx.updateNotLoginCart(newProducts);
      }
     };

  const deleteCartItem = (id:string) => {
        const updatedCart = cartCtx.products.filter((product:ICartProduct)=>`${product._id}${product.color?.name}${product.pattern?.name}`!== id);
        if(session){
          cartCtx.updateCart({
            user:session.user._id,
            products:updatedCart,
            quantity:updatedCart.length
          }, setErrorMsg);
        }else{
          cartCtx.updateNotLoginCart(updatedCart);
        }
    };

  return (
    <>
      <Head>
        <title>{PAGE_TITLE.CART}</title>
        <meta name="description" content={PAGE_DESC.CART}></meta>
      </Head>
      <Container>
          {isLoading && <FixedSpinner/>}
          {
            <>
            <CartHeader quantity={cartCtx.quantity} type="cart"/>
              {(!isLoadingSession && cartCtx.products.length>0) &&
              (<Bottom>
                  <Info>
                      {
                        products.length>0 && cartCtx.products?.map((product:ICartProduct,index:number)=>{
                          if(products.find(((item)=>item._id === product._id))){
                            return (
                              <CartItem key={`${product._id}${index}`}
                              product={products.find(((item)=>item._id === product._id)) as IProduct}
                              quantity={product.quantity}
                              color={product?.color}
                              pattern={product.pattern}
                              handleAmount={handleAmount}
                              deleteCartItem={deleteCartItem} />
                            )
                          }else{
                            return (<></>);
                          }                        
                        })
                     }
                  </Info>
                  <Summary cartProducts={cartCtx.products} products={products}/>
              </Bottom>)
              }
              {(!isLoadingSession && !isLoading && cartCtx.products.length===0 && !cartCtx.isCartLoading) && <EmptyCart type="cart"/>}          
            </>
          }
      </Container>    
    </>
  )
}

export default Cart;

const Container = styled(FlexCol)`
    min-height:calc(100vh - var(--navbarHeight)  - 30px);
    padding:20px;
    @media ${devices.tabletL}{
        min-height:auto;
    }
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
