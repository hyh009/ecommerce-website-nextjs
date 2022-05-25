import React, { RefObject } from 'react';
import { Container, ProductDetail, Details, PriceDetail, DisplayColor, DisplayPattern, CloseIcon, NotInStock } from './styles';
import Image from "next/image";
import {ColorType, IProduct, PatternType} from "../../../types/product";
import {Quantity, Price, DiscountPrice} from "../../Products";


interface Props {
    product:IProduct;
    quantity:number;
    color?:ColorType;
    pattern?:PatternType;
    handleAmount:(mode:"minus"|"plus", id?:string)=>void;
    deleteCartItem:(id:string)=>void;
    inStockRef:RefObject<Array<boolean>>;
    index:number;
}

const CartItem:React.FC<Props> = ({product, quantity, color, pattern, handleAmount, deleteCartItem, inStockRef, index}) => {

  const inStock = ():boolean => {
    if(color && product.colors){
      const instock = product.colors.filter((item)=>item.name===color.name)[0].inStock;
      if(inStockRef.current){
        inStockRef.current[index] = instock;
      }
      return instock;
    }else if(pattern && product.patterns){
      const instock = product.patterns.filter((item)=>item.name===pattern.name)[0].inStock;
      if(inStockRef.current){
        inStockRef.current[index] = instock;
      }
      return instock;
    }else{
      throw new Error("item doesn't include colors or patterns");
    }
  }
  return (
    <Container inStock={inStock()}>
        <CloseIcon onClick={()=>{deleteCartItem(`${product._id}${color?.name}${pattern?.name}`)}}/>
        {!inStock() && <NotInStock>目前無庫存，前往結帳前請先刪除</NotInStock>}
        <ProductDetail>
                <Image src={product.imgs[0].src} 
                       alt={product.name}
                       height={150}
                       width={150}
                       objectFit="cover"/>
                <Details>
                  <span>{product.title}</span>
                  {color && <DisplayColor color={color.code} title={color.name}/>}
                  {pattern && <DisplayPattern>{pattern.name}</DisplayPattern>}
                </Details>
        </ProductDetail>
        <PriceDetail>
          <Quantity quantity={quantity} handleCounter={handleAmount} id={`${product._id}${pattern?.name}${color?.name}`}/>
          {
            product.price.current!==product.price.origin?
              <DiscountPrice price={product.price.origin * quantity} 
                             discountPrice={product.price.current * quantity} size="small"/>:
              <Price price={product.price.origin * quantity} size="small"/>
          }
        </PriceDetail>
    </Container>
  )
}

export default CartItem;

