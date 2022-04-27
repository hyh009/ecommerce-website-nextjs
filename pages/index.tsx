import { useEffect } from 'react'
import axios from "axios";
import type {  GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { PAGE_DESC, PAGE_TITLE } from '../utils/headContent'

interface Props {
  test:string
}

const Home: NextPage<Props> = ({test}) => {
  console.log(test);

  return (
    <>
      <Head>
        <title>{PAGE_TITLE.HOME}</title>
        <meta name="description" content={PAGE_DESC.HOME}></meta>
      </Head>
      <h1>首頁</h1>
    </>
  )
}
export async function getServerSideProps(context:GetServerSidePropsContext) {



  return {
    props: {
      test:"test"
    },
  }
}
export default Home;
