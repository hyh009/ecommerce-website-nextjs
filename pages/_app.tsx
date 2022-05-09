import React, {ReactElement} from "react";
import Head from "next/head";
import Router from "next/router";
import {wrapper} from "../store";
import { SessionProvider } from "next-auth/react";
import nProgress from "nprogress";
// redux toolkit
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { NextComponentType } from 'next';
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import { GlobalStyle } from "../styles/GlobalStyle";
import { MainLayout } from "../components/Layout";
import "react-toastify/dist/ReactToastify.css";
import "../styles/nprogress.css";


const MyApp:NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({ Component, pageProps }: AppLayoutProps) => {
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
    <SessionProvider session={pageProps.session}>
    {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
    </>
  )

}

export default wrapper.withRedux(MyApp);
