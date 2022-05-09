import React,{useState, useEffect} from 'react';
import {useRouter} from "next/router";
import {H1Title} from "../../components/Title/styles";
import { CategoryFilter, Product } from '../../components/Products';
import {Col4T3M2Wrapper, FlexCol} from "../../components/Wrapper/styles";
import { Pagination } from '../../components/Common';
import { axiosInstance } from '../../utils/config';
import axios, {AxiosResponse} from "axios";
import { IProduct } from "../../types/product";
import { GetServerSidePropsContext, NextPage } from 'next';
import styled from 'styled-components';

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
  const [filterProducts, setFilterProducts] = useState<IProduct[]>(products);
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

  // useEffect(()=>{
  //   setFilterProducts(products);
  // },[products])

  return (
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
  )
}

interface ResState {
  products:IProduct[];
  maxPage:number;
  currentPage:number;
}

export const getServerSideProps = async (context:GetServerSidePropsContext) => {
  try {
    const page = context.query.page as string || "1";
    const category = context.query.category!=="全部商品"? context.query.category:"";
    const color = context.query.color!=="全部"?context.query.color:"";
    const params = {
      category,
      color,
      page,
      sort:context.query.sort
    };
    const productsRes:AxiosResponse<ResState> = await axiosInstance.get(`/api/products`,{params});
    return {
      props: {
        products: productsRes.data.products,
        page: {
          currentPage:productsRes.data.currentPage,
          maxPage:productsRes.data.maxPage
        }
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
export default Products;

const ProductsContainer = styled(Col4T3M2Wrapper)`
  padding:20px;
  gap:15px;
`; 

const Container = styled(FlexCol)`
  gap:0px;
  padding-bottom:20px;
`;