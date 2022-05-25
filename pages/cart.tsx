import React, { useEffect, useCallback, useState, useContext, useRef } from 'react';
import {useSession} from "next-auth/react";
import { FlexCol, FlexBetween} from "../components/Wrapper/styles";
import {CartItem, CartHeader, Summary} from "../components/Cart";
import { EmptyCart } from '../components/Empty';
import { FixedSpinner, ErrorModal, } from '../components/Common';
import CartContext from '../store/cart-context';
import Head from 'next/head'
import { PAGE_DESC, PAGE_TITLE } from '../utils/data/headContent';
import { NextPage } from 'next';
import { ICartProduct } from '../types/cart';
import { IProductDocument } from '../models/Product';
import styled from 'styled-components';
import { devices } from '../styles/responsive';
import { axiosInstance } from '../utils/config';
import { AxiosResponse } from 'axios';

interface Props {
  isLoadingSession:boolean;
}

const Cart:NextPage<Props> = ({isLoadingSession}) => {
    const cartCtx = useContext(CartContext);
    const {data:session} = useSession();
    const [products, setProducts] = useState<Array<IProductDocument>>([]);
    const [total, setTotal] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string|null>(null);

    const inStockRef = useRef<Array<boolean>>([]);

  useEffect(()=>{
    const controller = new AbortController();
    if(cartCtx.products.length>0){
        // get update info(price, inStock) of product
        const ids:Set<string> = new Set(cartCtx.products.map((product)=>product._id as string));
        const getProductsInfo = async ():Promise<void> =>{
          setIsLoading(true);
          const productsRes:AxiosResponse<Array<IProductDocument>> = await axiosInstance.post("/api/products/bulk", {productIds:Array.from(ids)});
          setProducts(productsRes.data);
          setIsLoading(false);
        }
        getProductsInfo();      
    }
    return ()=>{
        controller && controller.abort();
    }
  },[cartCtx.products]);

  const changeTotal = useCallback((total:number)=>{
    setTotal(total);
  },[])

  const handleAmount = (mode:"plus"|"minus",id?:string):void=>{
    const newProducts = cartCtx.products.reduce<ICartProduct[]>((products:ICartProduct[], p:ICartProduct)=>{
        if(`${p._id}${p?.pattern?.name}${p?.color?.name}`===id){
            if(p.quantity>=20 && mode==="plus"){
              setErrorMsg("超過20件請直接聯繫我們。");
              return products.concat(p);
            } 
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

  const isDisable = () => {
    return inStockRef.current.some((item)=>!item);
  }

  return (
    <>
      <Head>
        <title>{PAGE_TITLE.CART}</title>
        <meta name="description" content={PAGE_DESC.CART}></meta>
      </Head>
      <ErrorModal errorMsg={errorMsg} setErrorMsg={setErrorMsg}/>
      <Container>
          {(isLoading||cartCtx.isCartLoading) && <FixedSpinner/>}
          {
            <>
            <CartHeader quantity={cartCtx.quantity} type="cart"/>
            <Notice>若欲購入同一商品超過20件，請直接聯繫我們。</Notice>
              {(!isLoadingSession && cartCtx.products.length>0) &&
              (<Bottom>
                  <Info>
                      {
                        products.length>0 && cartCtx.products?.map((product:ICartProduct,index:number)=>{
                          if(products.find(((item)=>item._id === product._id))){
                            return (
                              <CartItem key={`${product._id}${index}`}
                              product={products.find(((item)=>item._id === product._id)) as IProductDocument}
                              quantity={product.quantity}
                              color={product?.color}
                              pattern={product.pattern}
                              handleAmount={handleAmount}
                              deleteCartItem={deleteCartItem}
                              inStockRef={inStockRef}
                              index={index}/>
                            )
                          }else{
                            return (<></>);
                          }                        
                        })
                     }
                  </Info>
                  <Summary cartProducts={cartCtx.products} products={products} total={total} changeTotal={changeTotal} isDisable={isDisable()}/>
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

const Notice = styled.span`
  letter-spacing:1px;
`