import React,{useEffect, useContext, useState, ReactNode, Dispatch, SetStateAction} from 'react';
import { getSession } from 'next-auth/react';
import AnimationContext from '../../../store/animation-context';
import {useRouter} from "next/router";
import { Container } from './styles'
import {Navbar, Newsletter, Footer, Announcement, ScrollToTop} from "../index";
import Error from "next/error";
import CartContext from '../../../store/cart-context';



interface Props {
  children : ReactNode;
  animationShowed: boolean;
  setIsLoadingSession:Dispatch<SetStateAction<boolean>>;
  errorCode?:number;
}

export const MainLayout:React.FC<Props> = ({children, setIsLoadingSession, errorCode}) => {
  const animationCtx = useContext(AnimationContext);
  const cartCtx = useContext(CartContext);
  const router = useRouter();

  useEffect(()=>{
    setIsLoadingSession(true);
    getSession().then((session)=>{
      if(session){
        cartCtx.getCart(session.user._id);
      }else{
        cartCtx.getLocalSavedCart();
      }
      setIsLoadingSession(false);
    })
  },[cartCtx.getCart, cartCtx.getLocalSavedCart, setIsLoadingSession]);

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <Container id="backdrop">
      {
        (animationCtx.animationShowed || router.pathname!=="/") && 
        <>
          <Navbar position="sticky" cartNumber={cartCtx.quantity}/>
          <Announcement/>
        </>
      }
        {children}
      {
        (animationCtx.animationShowed || router.pathname!=="/") && 
        <>
          <Newsletter/>     
          <Footer/>
          <ScrollToTop/>
        </>
      }
    </Container>
  )
};

interface UserProps {
  children : ReactNode;
  errorCode?:number;
}

export const UserLayout:React.FC<UserProps> = ({children, errorCode}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const cartCtx = useContext(CartContext);
  const router = useRouter();
  useEffect(()=>{
    getSession().then((session)=>{
      if(!session){
        router.push("/login");
      }else{
        setLoading(false);
      }
    })
  },[router]);


  if(loading){
    return <div>loading</div>
  }

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <Container id="backdrop">
      <Navbar position="static" cartNumber={cartCtx.quantity}/>
        {children}
    </Container>
  )
};

