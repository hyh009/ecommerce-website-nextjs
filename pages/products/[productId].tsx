import React from 'react';
import { axiosInstance } from '../../utils/config';
import axios, { AxiosResponse } from "axios";
import {Col2T1Wrapper} from "../../components/Wrapper/styles";
import {ProductImgSlider} from "../../components/Common";
import { ProductInfo } from '../../components/Products';
import { GetStaticPropsContext, NextPage, } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { IProduct } from '../../types/product';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from 'styled-components';

interface IProps {
  product:IProduct;
} 

const Product:NextPage<IProps> = ({product}) => {

  return (
    <>
      <Container>
        <ProductImgSlider imgs={product.imgs}/>
        <ProductInfo product={product}/>
      </Container>
    </>
  )
}


export  const getStaticPaths = async () => {
  const ProductsRes:AxiosResponse<Array<IProduct>> = await axiosInstance.get("/api/products/");
  const paths = ProductsRes.data.map((post) => ({
    params: { productId: post._id },
  }));

  return { paths, fallback: false }

}

interface IParams extends ParsedUrlQuery {
  productId: string
}

export const getStaticProps = async (context:GetStaticPropsContext) => {
  try{
    const {productId} = context.params as IParams;
    const productRes:AxiosResponse<IProduct> = await axiosInstance.get(`/api/products/${productId}`);

    return {
      props: {
        product:productRes.data
      },
    }
  }catch(error){
    if(axios.isAxiosError(error)){
      return { props: { errorCode: error.response?.status || 500 } };
    }else{
      return {props:{errorCode:500}};
    }
  }
}

export default Product;

const Container = styled(Col2T1Wrapper)`
  padding:20px 40px;
  gap:20px;
  
`;
