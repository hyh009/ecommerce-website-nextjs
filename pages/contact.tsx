import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { devices } from '../styles/responsive';
import { H1Title } from '../components/Title/styles';
import { PAGE_TITLE, PAGE_DESC } from '../utils/data/headContent';
import { ContactForm, CompanyInfo } from '../components/Contact';
import {FlexRowTCol} from "../components/Wrapper/styles";

const Contact = () => {

  return (
    <>
    <Head>
      <title>{PAGE_TITLE.CONTACT}</title>
      <meta name="description" content={PAGE_DESC.CONTACT}></meta>
    </Head>
    <H1Title>聯繫我們</H1Title>
    <Text>有想詢問我們的事嗎？請填寫下方表單並提交，我們將會透過Email跟您聯繫。</Text>
    <FlexRowTCol>
      <ContactForm/>
      <CompanyInfo/>
    </FlexRowTCol>
    </>
  )
}

export default Contact;

export const Text = styled.span`
  font-size: 1.125rem;
  padding: 0 20px;
  margin-bottom:20px;
  letter-spacing: 1px;
  display:block;
  @media ${devices.tabletL}{
    padding:0 20px;
  }
  @media ${devices.mobile}{
    padding:0 20px;
    font-size:4vmin;
  }
`;