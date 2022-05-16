import React from 'react';
import {Col2T1Wrapper} from "../../components/Wrapper/styles";
import {ProductImgSlider} from "../../components/Common";
import { ProductInfo } from '../../components/Products';
import Head from 'next/head';
import { GetStaticPropsContext, NextPage, } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { IProduct } from '../../types/product';
import { PAGE_TITLE, PAGE_DESC } from '../../utils/data/headContent';
import db from '../../utilsServer/dbConnect';
import{ default as ProductModel} from '../../models/Product';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from 'styled-components';
import {devices} from "../../styles/responsive";

interface IProps {
  product:IProduct;
} 

const Product:NextPage<IProps> = ({product}) => {
    
  return (
    <>
      <Head>
          <title>{PAGE_TITLE.PRODUCT(product?.title)}</title>
          <meta name="description" content={PAGE_DESC.PRODUCT(product?.desc)}></meta>
      </Head>
      <Container>
        <ProductImgSlider imgs={product.imgs}/>
        <ProductInfo product={product}/>
      </Container>
    </>
  )
}


export  const getStaticPaths = async () => {
    await db.connect();
    const products = await ProductModel.find({}).lean();
    const paths = products?.map((product)=>(
    {params:{productId:product._id.toString()}}
    ));
    await db.disconnect();
    return { paths, fallback: false };

}

interface IParams extends ParsedUrlQuery {
  productId: string
}

export const getStaticProps = async (context:GetStaticPropsContext) => {
  try{
    const {productId} = context.params as IParams;
    await db.connect();
    const product = await ProductModel.findById(productId).lean();
    await db.disconnect();  

    return {
      props: {
        product:JSON.parse(JSON.stringify(product))
      },
      revalidate: 600,
    }
  }catch(error){
    return {props:{errorCode:500}};
    
  }
}

export default Product;

const Container = styled(Col2T1Wrapper)`
  padding:20px 40px;
  gap:20px;
  @media ${devices.tabletL}{
    grid-template-columns: repeat(1,minmax(0,1fr));
    padding:20px;
  }
  @media ${devices.mobile}{
    grid-template-columns: repeat(1,minmax(0,1fr));
    padding:10px;
  }
  
`;
