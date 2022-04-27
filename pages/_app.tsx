import React, {ReactElement} from "react";
import Head from "next/head";
import type { NextComponentType } from 'next';
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import { GlobalStyle } from "../styles/GlobalStyle";
import { MainLayout } from "../components/Layout";


const MyApp:NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({ Component, pageProps }: AppLayoutProps) => {
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
    {getLayout(<Component {...pageProps} />)}
    </>
  )

}

export default MyApp
