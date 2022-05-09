import React,{useEffect, useState, ReactNode} from 'react';
import { getSession } from 'next-auth/react';
import {useAppSelector, useAppDispatch} from "../../../store/hooks";
import {getCart, getLocalSavedCart} from "../../../store/reducer/cartReducer";
import {useRouter} from "next/router";
import { Container } from './styles'
import {Navbar, Newsletter, Footer, Announcement} from "../index";



interface Props {
  children : ReactNode
}

export const MainLayout:React.FC<Props> = ({children}) => {

  const dispatch = useAppDispatch();
  const cart = useAppSelector((state)=>state.cart);

  useEffect(()=>{
    getSession().then((session)=>{
      if(session){
        dispatch(getCart(session.user._id));
      }else{
        dispatch(getLocalSavedCart());
      }
    })
  },[dispatch])

  return (
    <Container>
      <Navbar position="sticky" cartNumber={cart.products.length}/>
      <Announcement/>
        {children}
      <Newsletter/>     
      <Footer/>
    </Container>
  )
};

export const UserLayout:React.FC<Props> = ({children}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const cart = useAppSelector((state)=>state.cart);
  const router = useRouter();
  useEffect(()=>{
    getSession().then((session)=>{
      if(!session){
        router.push("/login");
      }else{
        setLoading(false);
      }
    })
  },[])


  if(loading){
    return <div>loading</div>
  }

  return (
    <Container>
      <Navbar position="static" cartNumber={cart.products.length}/>
        {children}
    </Container>
  )
};

