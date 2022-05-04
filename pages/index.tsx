import axios, { AxiosResponse } from "axios";
import type {NextPage } from 'next';
import Head from 'next/head';
import { PAGE_DESC, PAGE_TITLE } from '../utils/data/headContent';
import {HomeSlider,CategoriesSlider} from "../components/Common";
import { HomeSession,Col4T3M2Wrapper } from '../components/Wrapper/styles';
import {H3Title} from "../components/Title/styles";
import {Product} from "../components/Products";
import { axiosInstance } from '../utils/config';
import { IProduct } from '../types/product';


interface Props {
  newProducts:IProduct[],
}

const Home: NextPage<Props> = ({newProducts}) => {

  return (
    <>
      <Head>
        <title>{PAGE_TITLE.HOME}</title>
        <meta name="description" content={PAGE_DESC.HOME}></meta>
      </Head>
      <HomeSlider/>
      <HomeSession>
        <H3Title>商品分類</H3Title>
        <CategoriesSlider/>
      </HomeSession>
      <HomeSession>
        <H3Title>最新商品</H3Title>
        <Col4T3M2Wrapper pdRL="20px">
         {
           newProducts.map((item)=>(<Product key={item._id} product={item}/>))
         }
        </Col4T3M2Wrapper>
      </HomeSession>
    </>
  )
}
export const getStaticProps = async () => {
  try{
    const productsRes:AxiosResponse<Array<IProduct>> = await axiosInstance.get("/api/products");

    return {
      props: {
        newProducts: productsRes.data.slice(0,8)
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
export default Home;
