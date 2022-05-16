import React, {useState, useCallback, ReactElement} from "react";
import Head from "next/head";
import Router from "next/router";
import { SessionProvider } from "next-auth/react";
import nProgress from "nprogress";
import type { NextComponentType } from 'next';
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import { GlobalStyle } from "../styles/GlobalStyle";
import { MainLayout } from "../components/Layout";
import "react-toastify/dist/ReactToastify.css";
import "../styles/nprogress.css";
import { CartContentProvider } from "../store/cart-context";
import { AnimationContentProvider } from "../store/animation-context";



const MyApp:NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({ Component, pageProps }: AppLayoutProps) => {

  const [isLoadingSession, setIsLoadingSession] = useState(false);

  const changeIsLoadingSession = useCallback(() => {
    setIsLoadingSession((prev)=>!prev);
  },[]);

    // handle route change animation
    Router.events.on('routeChangeStart', () => {
      nProgress.start();
  })
    Router.events.on('routeChangeComplete', () => {
    nProgress.done();
  })
    Router.events.on('routeChangeError', () => {
    nProgress.done();
  })
  

  const getLayout =
    Component.getLayout ||
    ((page:ReactElement) => (
      <MainLayout
        {...pageProps}
        setIsLoadingSession={setIsLoadingSession}       
      >
        {page}
      </MainLayout>
    ));

  return (
    <>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta charSet="UTF-8" />
    </Head>
    <GlobalStyle />
    <CartContentProvider>
    <AnimationContentProvider>
    <SessionProvider session={pageProps.session}>
    {getLayout(<Component {...pageProps} isLoadingSession={isLoadingSession}
                                         setIsLoadingSession={changeIsLoadingSession}/>)}
    </SessionProvider>
    </AnimationContentProvider>
    </CartContentProvider>
    </>
  )

}

export default MyApp;
