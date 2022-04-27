import React,{ReactElement} from 'react';
import type { NextLayoutComponentType } from 'next';
import Head from 'next/head'
import {useRouter} from "next/router";

const Login: NextLayoutComponentType = () => {
  return (
    <div>login</div>
  )
}

export default Login;

Login.getLayout = function PageLayout(page:ReactElement) {
    return <>{page}</>;
  };
