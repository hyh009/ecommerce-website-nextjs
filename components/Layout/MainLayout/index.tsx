import React,{useEffect, useContext, useState, ReactNode, Dispatch, SetStateAction} from 'react';
import { getSession } from 'next-auth/react';
import AnimationContext from '../../../store/animation-context';
import {useRouter} from "next/router";
import { Container, UserContainer } from './styles'
import {Navbar, Newsletter, Footer, Announcement, ScrollToTop, ProfileSidebar} from "../index";
import Error from "next/error";
import CartContext from '../../../store/cart-context';
import { IUserDocument } from '../../../models/User';



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
  user:IUserDocument;
  children : ReactNode;
  errorCode?:number;
}

export const UserLayout:React.FC<UserProps> = ({children, user, errorCode}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const {quantity, getCart} = useContext(CartContext);

  useEffect(()=>{
    if(user?._id){
      getCart(user._id);
      setLoading(false);
    }
  },[user, getCart]);


  if(loading){
    return <div>loading</div>
  }

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <Container id="backdrop">
      <Navbar position="static" cartNumber={quantity}/>
        <UserContainer>
          <ProfileSidebar user={user}/>
          {children}
        </UserContainer>
      <Footer background="#f0eeee"/>
    </Container>
  )
};

