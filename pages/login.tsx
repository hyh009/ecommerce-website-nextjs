import React,{ useState, ReactElement, Dispatch, SetStateAction } from 'react';
import type { NextLayoutComponentType } from 'next';
import Head from 'next/head';
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { PAGE_TITLE, PAGE_DESC } from '../utils/data/headContent';
import { useAppSelector } from '../store/hooks';
import LoginForm from  "../components/Form/AuthForm/LoginForm";
import useToastr from "../utils/hooks/useToast";
import useAuth from "../utils/hooks/useAuth";
import ErrorModal from '../components/Common/Modal/ErrorModal';
import { BasicToastr } from '../components/Common/Toast';
import { LoginInputsState } from '../types/auth';
import styled from "styled-components";
import { devices } from "../styles/responsive";
import { axiosInstance } from '../utils/config';

export type LoginSubmitHandler = (e:React.FormEvent<HTMLFormElement>, 
  inputData:LoginInputsState,
  setLoading:Dispatch<SetStateAction<boolean>>
  )=>Promise<void>;


const Login: NextLayoutComponentType = () => {
  const [errorMsg, setErrorMsg] = useState<string|null>(null);
  const cart = useAppSelector((state)=>state.cart);
  const router = useRouter();
  const showToastr = useToastr();
  const authLoading = useAuth();

  const submitHandler:LoginSubmitHandler= async(e, inputData,setLoading)=>{
    e.preventDefault();
    setLoading(true);
    const result:any = await signIn("credentials",{
      redirect:false, // true => redirect to error page if error occur
      email:inputData.email,
      password:inputData.password
    });

    // error object is null if no error
    if(!result.error){
      // login success
      // add temporary cart to DB
      await axiosInstance.post(`/api/cart/combine`,{email:inputData.email, 
                                                    localCartProduct:cart.products});
      // delete local cart
      localStorage.removeItem("cart");

      setLoading(false);
      showToastr("login");
      setTimeout(()=>router.push("/profile"),3000);     
    }else {
      // show error modal
      setLoading(false);
      setErrorMsg(result.error);
    }

  }

  if(authLoading){
    return <div>Loading...</div>
  }
  return (
    <Container>
      <Head>
          <title>{PAGE_TITLE.SIGNUP}</title>
          <meta name="description" content={PAGE_DESC.SIGNUP}></meta>
      </Head>
      <BasicToastr/>
      {errorMsg && <ErrorModal errorMsg={errorMsg} setErrorMsg={setErrorMsg}/>}
      <LoginForm submitHandler={submitHandler}/>
    </Container>
  )
}

export default Login;

Login.getLayout = function PageLayout(page:ReactElement) {
    return <>{page}</>;
  };

  const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(122, 122, 122, 0.5)
    ),
    url("https://res.cloudinary.com/dh2splieo/image/upload/v1640706201/shop_website/imgs/cover/cover1_j6l2we.jpg");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: center;
  @media ${devices.tabletL}{
    backgroundPosition: bottom right;
  }
`;
