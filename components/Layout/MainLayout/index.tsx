import React,{useEffect, useContext, useState, ReactNode, Dispatch, SetStateAction} from 'react';
import { getSession } from 'next-auth/react';
import AnimationContext from '../../../store/animation-context';
import {useRouter} from "next/router";
import { Container, UserContainer } from './styles'
import {Navbar, Newsletter, Footer, Announcement, ScrollToTop, ProfileSidebar} from "../index";
import Error from "next/error";
import CartContext from '../../../store/cart-context';
import { Session } from 'next-auth';



interface Props {
  children : ReactNode;
  animationShowed: boolean;
  setIsLoadingSession:Dispatch<SetStateAction<boolean>>;
  errorCode?:number;
}

export const MainLayout:React.FC<Props> = ({children, setIsLoadingSession, errorCode}) => {
  const animationCtx = useContext(AnimationContext);
  const {quantity, getCart, getLocalSavedCart} = useContext(CartContext);
  const router = useRouter();

  useEffect(()=>{
    setIsLoadingSession(true);
    getSession().then((session)=>{
      if(session){
        getCart(session.user._id);
      }else{
        getLocalSavedCart();
      }
      setIsLoadingSession(false);
    })
  },[getCart, getLocalSavedCart, setIsLoadingSession]);

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <Container id="backdrop">
      {
        (animationCtx.animationShowed || router.pathname!=="/") && 
        <>
          <Navbar position="sticky" cartNumber={quantity}/>
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
  const [session, setSession] = useState<Session|null>(null);
  const cartCtx = useContext(CartContext);
  const router = useRouter();

  useEffect(()=>{
    getSession().then((session)=>{
      if(!session){
        router.push("/login");
      }else{
        setSession(session);
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
        <UserContainer>
          <ProfileSidebar session={session}/>
          {children}
        </UserContainer>
      <Footer background="#f0eeee"/>
    </Container>
  )
};

