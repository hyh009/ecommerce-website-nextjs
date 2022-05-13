import React,{useEffect, useState, ReactNode, Dispatch, SetStateAction} from 'react';
import { getSession } from 'next-auth/react';
import {useAppSelector, useAppDispatch} from "../../../store/hooks";
import {getCart, getLocalSavedCart} from "../../../store/reducer/cartReducer";
import {useRouter} from "next/router";
import { Container } from './styles'
import {Navbar, Newsletter, Footer, Announcement, ScrollToTop} from "../index";
import Error from "next/error";



interface Props {
  children : ReactNode;
  animationShowed: boolean;
  setIsLoadingSession:Dispatch<SetStateAction<boolean>>;
  errorCode?:number;
}

export const MainLayout:React.FC<Props> = ({children, animationShowed, setIsLoadingSession, errorCode}) => {

  const dispatch = useAppDispatch();
  const cart = useAppSelector((state)=>state.cart);
  const router = useRouter();

  useEffect(()=>{
    setIsLoadingSession(true);
    getSession().then((session)=>{
      if(session){
        dispatch(getCart(session.user._id));
      }else{
        dispatch(getLocalSavedCart());
      }
      setIsLoadingSession(false);
    })
  },[dispatch]);

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <Container>
      {
        (animationShowed || router.pathname!=="/") && 
        <>
          <Navbar position="sticky" cartNumber={cart.products?.length}/>
          <Announcement/>
        </>
      }
        {children}
      {
        (animationShowed || router.pathname!=="/") && 
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
  },[router]);


  if(loading){
    return <div>loading</div>
  }

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <Container>
      <Navbar position="static" cartNumber={cart.products.length}/>
        {children}
    </Container>
  )
};

