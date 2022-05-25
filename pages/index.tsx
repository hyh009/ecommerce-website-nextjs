import {Dispatch, SetStateAction, useEffect, useContext} from "react";
import db from "../utilsServer/dbConnect";
import  AnimationContext from "../store/animation-context";
import { default as ProductModel } from "../models/Product"; 
import type { NextPage } from 'next';
import Head from 'next/head';
import { PAGE_DESC, PAGE_TITLE } from '../utils/data/headContent';
import {HomeSlider,CategoriesSlider,HomeAnimation} from "../components/Common";
import { HomeSession,Col4T2Wrapper } from '../components/Wrapper/styles';
import {H3Title} from "../components/Title/styles";
import {Product} from "../components/Products";
import { IProduct } from '../types/product';



interface Props {
  newProducts:IProduct[],
  animationShowed:boolean;
  setAnimationShowed:Dispatch<SetStateAction<boolean>>;
  notfirstLoad:boolean;
  changeToNotFirstLoad:()=>void;
}

const Home: NextPage<Props> = ({newProducts}) => {
  const animationCtx = useContext(AnimationContext);
  useEffect(()=>{
    let timer:any;
    if(animationCtx.animationShowed){
      timer = setTimeout(animationCtx.changeToNotFirstLoad,3000);
    }
    return ()=>clearTimeout(timer);
  },[animationCtx.animationShowed,animationCtx.changeToNotFirstLoad])
  
  return (
    <>
      <Head>
        <title>{PAGE_TITLE.HOME}</title>
        <meta name="description" content={PAGE_DESC.HOME}></meta>
      </Head>
      {!animationCtx.notFirstLoad && <HomeAnimation
        animationShowed={animationCtx.animationShowed}
        setAnimationShowed={animationCtx.setAnimationShowed}
      />}
      {
        animationCtx.animationShowed &&
        <>
        <HomeSlider/>
        <HomeSession>
          <H3Title>商品分類</H3Title>
          <CategoriesSlider/>
        </HomeSession>
        <HomeSession>
          <H3Title>最新商品</H3Title>
          <Col4T2Wrapper pdRL="20px">
          {
             newProducts?.map((item)=>(<Product key={item._id} product={item}/>))
          }
          </Col4T2Wrapper>
        </HomeSession>
        </>
      }
    </>
  )
}
export const getStaticProps = async () => {
  try{
    await db.connect();
    const products = await ProductModel.find({}).sort({createdAt:-1}).limit(8).lean();
    await db.disconnect();
    return {
      props: {
        newProducts: JSON.parse(JSON.stringify(products))
      },
      revalidate: 600,
    }
  }catch(error){
     return {props:{errorCode:500}};
    
  }
}
export default Home;
