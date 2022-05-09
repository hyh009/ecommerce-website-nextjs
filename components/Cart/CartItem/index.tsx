import React from 'react';
import { Container, ProductDetail, Details, PriceDetail, DisplayColor, DisplayPattern, CloseIcon } from './styles';
import Image from "next/image";
import {ColorType, IProduct, PatternType} from "../../../types/product";
import {Quantity, Price, DiscountPrice} from "../../Products";


interface Props {
    product:IProduct;
    quantity:number;
    color:ColorType | undefined;
    pattern:PatternType | undefined;
    handleAmount:(mode:"minus"|"plus", id?:string)=>void;
    deleteCartItem:(id:string)=>void;
}

const CartItem:React.FC<Props> = ({product, quantity, color, pattern, handleAmount, deleteCartItem}) => {

  return (
    <Container>
        <CloseIcon onClick={()=>{deleteCartItem(`${product._id}${color?.name}${pattern?.name}`)}}/>
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

