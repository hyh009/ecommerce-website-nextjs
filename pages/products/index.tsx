import React,{useState} from 'react';
import {useRouter} from "next/router";
import Head from 'next/head';
import { PAGE_TITLE, PAGE_DESC } from '../../utils/data/headContent';
import {H1Title} from "../../components/Title/styles";
import { CategoryFilter, Product } from '../../components/Products';
import {Col4T2Wrapper, FlexCol} from "../../components/Wrapper/styles";
import { Pagination } from '../../components/Common';
import {default as ProductModel} from "../../models/Product";
import db from "../../utilsServer/dbConnect";
import { IProduct } from "../../types/product";
import { GetServerSidePropsContext, NextPage } from 'next';
import styled from 'styled-components';
import { devices } from '../../styles/responsive';

interface Props {
  products:IProduct[];
  page:{
    maxPage:number;
    currentPage:number;
  }
}

const Products:NextPage<Props> = ({products, page}) => {
  const [currentCat, setCurrentCat] = useState<string>("");
  const [currentColor, setCurrentColor] = useState<string>("");
  const router = useRouter();
  const getAnotherPageProduct = (e:React.MouseEvent<HTMLDivElement>) => {
      const clickedDiv = e.target as  HTMLDivElement;
      const page = parseInt(clickedDiv.textContent as string);
      router.replace(
        {
          pathname: '/products',
          query:  {
            ...router.query,
            page:page
          },
        }
      );
  }

  return (
    <>
    <Head>
      <title>{PAGE_TITLE.PRODUCTS(router.query?.category? router.query.category as string:"全部商品")}</title>
      <meta name="description" content={PAGE_DESC.PRODUCTS(router.query?.category? router.query.category as string:"全部商品")}></meta>
    </Head>
    <Container>
      <H1Title>全部商品</H1Title>
      <CategoryFilter currentCat={currentCat} 
                      setCurrentCat={setCurrentCat} 
                      currentColor={currentColor}
                      setCurrentColor={setCurrentColor}/>
      <ProductsContainer>
        {products?.map((product)=><Product product={product} key={product._id}/>)}
      </ProductsContainer>
      <Pagination page={page} clickHandler={getAnotherPageProduct}/>
    </Container>
    </>
  )
}

export const getServerSideProps = async (context:GetServerSidePropsContext) => {
  try {
    const { res } = context;
    res.setHeader('Cache-Control', `s-maxage=60, stale-while-revalidate`);
    const SIZE = 8;
    const SORT_OPTIONS = {
      asc:{"price.current":1},
      desc:{"price.current":-1},
      newest:{"createdAt":-1}
    } 
    const PAGE = context.query.page?  parseInt(context.query.page as string) : 1;
    const category = context.query.category!=="全部商品"? context.query.category:"";
    const color = context.query.color!=="全部"?context.query.color:"";
    const SORT = context.query.sort?SORT_OPTIONS[context.query.sort as "asc"|"desc"|"newest"]:SORT_OPTIONS["newest"];
    let totalProducts=0; 
    let products:IProduct[]=[];
    let mongooseQuery = {};

    await db.connect();
    // condition
    if(category && color){
        const colorPattern = new RegExp(`${color}`);
        mongooseQuery = {categories:category,
            $or:[ {"colors.name":{$regex:colorPattern}},{"patterns.name":{$regex:colorPattern}}] }
    }else if(category){
        mongooseQuery = {categories:category}
    }else if(color){
        const colorPattern = new RegExp(`${color}`);
        mongooseQuery = {$or:[ {"colors.name":{$regex:colorPattern}},{"patterns.name":{$regex:colorPattern}}]}
    }else{
        mongooseQuery={};
    }

  // get the data
      if(PAGE===1){
          products = await ProductModel.find(mongooseQuery)
                                  .sort(SORT)
                                  .limit(SIZE).lean();
      }else{
          products = await ProductModel.find(mongooseQuery)
                                  .sort(SORT)
                                  .skip((PAGE-1)*SIZE)
                                  .limit(SIZE).lean();
      }
      totalProducts = await ProductModel.find(mongooseQuery)
                                    .countDocuments().lean();
      await db.disconnect();
      return {
        props: {
          products:JSON.parse(JSON.stringify(products)),
          page: {
            currentPage:PAGE,
            maxPage:Math.ceil(totalProducts/SIZE),
          }
        },
      }
  }catch(error){
    await db.disconnect();
    return {props:{errorCode:500}};
  }
}
export default Products;

const ProductsContainer = styled(Col4T2Wrapper)`
  padding:20px;
  gap:15px;
  @media ${devices.mobile}{
    padding:10px 5px;
  }
`; 

const Container = styled(FlexCol)`
  gap:0px;
  padding-bottom:20px;
`;