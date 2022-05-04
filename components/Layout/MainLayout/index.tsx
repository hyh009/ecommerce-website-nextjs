import React,{useEffect, useState, ReactNode} from 'react';
import { getSession } from 'next-auth/react';
import {useRouter} from "next/router";
import { Container } from './styles'
import {Navbar, Newsletter, Footer, Announcement} from "../index";



interface Props {
  children : ReactNode
}

export const MainLayout:React.FC<Props> = ({children}) => {

  return (
    <Container>
      <Navbar position="sticky"/>
      <Announcement/>
        {children}
      <Newsletter/>     
      <Footer/>
    </Container>
  )
};

export const UserLayout:React.FC<Props> = ({children}) => {
  const [loading, setLoading] = useState<boolean>(true);
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
      <Navbar position="static"/>
        {children}
    </Container>
  )
};

