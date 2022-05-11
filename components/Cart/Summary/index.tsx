import React, { useMemo } from 'react';
import { ICartProduct } from '../../../types/cart';
import { IProduct } from '../../../types/product';
import {Container, SummaryTitle, SummaryItem, SummaryItemText, SummaryItemPrice} from "./styles";
import {Button} from "../../Common";

interface Props {
  cart:{
    products:ICartProduct[];
    quantity:number;
  };
  products:IProduct[];
}

const Summary:React.FC<Props> = ({cart, products}) => {
  const productTotal = useMemo(() => {
    let total=0;
   if(cart && products.length>0){
    cart.products.forEach((product)=>{
      const productInfo = products.find((p)=>`${p._id}`===product._id) as IProduct;
      total+=productInfo.price.current!==productInfo.price.origin?productInfo.price.current*product.quantity
                                                                 :productInfo.price.origin*product.quantity;
    });
   }
    return total;
  },[cart, products]);

  return (
    <Container>
      <SummaryTitle>價格明細</SummaryTitle>
      <SummaryItem>
        <SummaryItemText>小計</SummaryItemText>
        <SummaryItemPrice>$NT {productTotal}</SummaryItemPrice>
      </SummaryItem>
      <SummaryItem>
        <SummaryItemText>運費</SummaryItemText>
        <SummaryItemPrice>$NT 60</SummaryItemPrice>
      </SummaryItem>
      <SummaryItem>
        <SummaryItemText>折扣</SummaryItemText>
        <SummaryItemPrice>$NT 0</SummaryItemPrice>
      </SummaryItem>
      <SummaryItem>
          <SummaryItemText type="total">總計</SummaryItemText>
          <SummaryItemPrice type="total">
            $NT {productTotal + 60}
          </SummaryItemPrice>
      </SummaryItem>
      <Button type="button" content="前往結帳" width="100%"/>
    </Container>
  )
}

export default Summary