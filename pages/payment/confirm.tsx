import React, {useEffect, useState, useContext} from 'react';
import type { GetServerSidePropsContext, NextPage } from 'next';
import { IUserDocument } from '../../models/User';
import {useRouter} from "next/router";
import Image from "next/image";
import withUserAuth from '../../components/HOC/withUserAuth';
import { ErrorModal } from '../../components/Common';
import { axiosInstance } from '../../utils/config';
import styled from 'styled-components';
import { devices } from '../../styles/responsive';
import catchError from '../../utils/catchError';
import CartContext from "../../store/cart-context";


interface Props {
    user:IUserDocument;
}

const Confirm:NextPage<Props> = ({user}) => {
  const router = useRouter();
  const {orderId, transactionId} = router.query;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string|null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean|null>(null);
  const {getCart} = useContext(CartContext);
  useEffect(()=>{
     const controller = new AbortController();
     const getInfo = async () => {
        try{
            setIsLoading(true);
            const {data} = await axiosInstance.post(`/api/payment/linepay/confirm/${user._id}`,{orderId, transactionId}, {signal:controller.signal});
            if(data.success){
                setPaymentSuccess(true);
                getCart(user._id);
                setIsLoading(false);
            }else if(data.success===false){
                setPaymentSuccess(false);
                setIsLoading(false);
            }
        }catch(error){
            setIsLoading(false);
            setErrorMsg(catchError(error));
        }
     };
    if(orderId && transactionId){
        getInfo(); 
    }
  },[orderId, transactionId, user, getCart])
  return (
    <Container>
        <ErrorModal setErrorMsg={setErrorMsg} errorMsg={errorMsg}/>
        {
            isLoading && <>Loading</>
        }
        {
            !isLoading && paymentSuccess===true &&
            <>
                <ImgContainer>
                <Image src="https://res.cloudinary.com/dh2splieo/image/upload/v1643188994/shop_website/imgs/undraw_appreciation_re_p6rl_qzx0cq.svg"
                       alt="感謝您的購買"
                       layout="fill"
                       objectFit="cover"/>  
                </ImgContainer>
                <Text>
                    感謝您的購買
                    <br />
                    我們將於3個工作天內將商品寄出。
                </Text>
            </>
        }
        {
            !isLoading && paymentSuccess===false &&
            <>
                <ImgContainer>
                <Image src="https://res.cloudinary.com/dh2splieo/image/upload/v1643191571/shop_website/imgs/undraw_warning_cyit_tsw9qu.svg"
                       alt="付款失敗，請重新下單或聯繫我們"
                       layout="fill"
                       objectFit="cover"/>  
                </ImgContainer>
                <Text>
                    付款發生問題。
                    <br />
                    請重新下單，或聯繫我們。
                </Text>
            </>
        }
    </Container>
  )
}

export default Confirm;

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
    height:calc(100vh - var(--navbarHeight) - 30px);
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:20px;
`;

const ImgContainer = styled.div`
    position:relative;
    width:35%;
    aspect-ratio:4/3;
`;

const Text = styled.h3`
  font-weight: normal;
  font-size: 5vmin;
  @media ${devices.tabletL}{
      text-align:center;
  }
`;