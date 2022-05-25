import React,{useEffect, useState} from 'react';
import {useRouter} from "next/router";
import type { GetServerSidePropsContext, NextPage } from 'next';
import { axiosInstance } from '../../utils/config';
import withUserAuth from '../../components/HOC/withUserAuth';
import { IUserDocument } from '../../models/User';
import Error from "next/error";
import styled from 'styled-components';
import { devices } from '../../styles/responsive';
import {H1Title} from "../../components/Title/styles";
import { FlexRowTCol } from "../../components/Wrapper/styles";
import {Method} from "../../components/payment";
import {LineLink} from "../../utils/data/payment";

interface Props {
  user:IUserDocument;
  errorCode:number;
}

const Linepay:NextPage<Props> = ({user, errorCode}) => {
  const router = useRouter();
  const {orderId} = router.query;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [urls ,setUrls] = useState<{paymentUrl:"",paymentUrlApp:""}|null>(null);

  useEffect(()=>{
    const controller = new AbortController();
    const getLinepayUrl = async () => {
      try{
        const {data:urls} = await axiosInstance.post(`/api/payment/linepay/${user._id}`,{orderId},{signal:controller.signal});
        
        setUrls(urls);
        setIsLoading(false);
      }catch(error){
        setIsLoading(false);
      }
    };
    
    getLinepayUrl();
    
    return () => {
      controller.abort();
    }
  },[user, orderId]);

  if (errorCode) {
    return <Error statusCode={errorCode?errorCode:400} />
  }

  return (
    <Container>
      <CircleRight/>
      <CircleLeft/>
      {
        isLoading && <>Loading</>
      }
      {
        urls && 
        <>
          <Title>點選下方按鈕前往LINE Pay頁面結帳</Title>
          <ContentContainer>
            <Method item={LineLink[0]} url={urls.paymentUrl}/>
            <Method item={LineLink[1]} url={urls.paymentUrlApp}/>
          </ContentContainer>
        </>
      }
    </Container>
  )
}

export default Linepay;

export const getServerSideProps =  withUserAuth(async (context:GetServerSidePropsContext, user:IUserDocument, errorCode:number)=>{
  if(errorCode){
    return {
      props:{
        errorCode
      }
    }
  }

  return {
    props: {
      user:JSON.parse(JSON.stringify(user))
    },
  }
});


const Container = styled.div`
  display: flex;
  flex-direction:column;
  width: 100%;
  padding: 20px;
  overflow: hidden;
  height: calc(100vh - var(--navbarHeight) - 30px );
  position:relative;
  @media ${devices.tabletL}{
    height:max-content;
    padding:50px 0;
  }
`;

const Title = styled(H1Title)`
  text-decoration: underline;
  text-underline-offset: 5px;
  width:100%;
  text-align:center;
`;

const CircleRight = styled.div`
  position: absolute;
  top: -30%;
  right: -10%;
  z-index: -1;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background-color: rgba(159, 245, 125, 0.8);
  @media ${devices.tabletL}{
    top:-10%;
  }
  @media ${devices.mobile}{
    height:250px;
    width:250px;
  }
`;

const CircleLeft = styled(CircleRight)`
  top:auto;
  bottom: -30%;
  right:auto;
  left: -10%;
  background-color: rgba(186, 138, 240, 0.8);
  @media ${devices.tabletL}{
    top:auto;
    bottom:-10%;
  }
`;

const ContentContainer = styled(FlexRowTCol)`
  justify-content:space-evenly;
  min-height:60vh;
  @media ${devices.tablet}{
    min-height:max-content;
    gap:30px;
  }
`;