import React, { useEffect, useCallback, useState } from 'react';
import { ICartProduct } from '../../../types/cart';
import { IProduct } from '../../../types/product';
import { useSession } from 'next-auth/react';
import {Container, SummaryTitle, SummaryItem, SummaryItemText, SummaryItemPrice} from "./styles";
import { Button, CheckoutModal, ErrorModal } from "../../Common";
import useControlDialog from "../../../utils/hooks/useControlDialog";
import {shippingFee} from "../../../utils/data/payment";
import { IProductDocument } from '../../../models/Product';

interface Props {
  cartProducts:ICartProduct[];
  products:IProductDocument[];
  isDisable:boolean;
  total:number;
  changeTotal:(total:number)=>void;
}

const Summary:React.FC<Props> = ({cartProducts, products, isDisable, total, changeTotal}) => {
  const {closeDialog, openDialog, dialogRef} = useControlDialog();
  const [errorMsg, setErrorMsg] = useState<null|string>(null);
  const {data:session} = useSession();

  const getTotal = useCallback(() => {
    let accTotal=0;
    if(cartProducts && products.length>0){
     cartProducts.forEach((product)=>{
       const productInfo = products.find((p)=>`${p._id}`===product._id) as IProduct;
       accTotal+=productInfo?.price.current!==productInfo?.price.origin?productInfo?.price.current*product.quantity
                                                                       :productInfo?.price.origin*product.quantity;
     });
    }
    changeTotal(accTotal);
  },[cartProducts, products, changeTotal])

  useEffect(()=>{
    getTotal();
  },[getTotal])

  const openCheckoutModal = () => {
    if(!session){
      return setErrorMsg("請先登入會員。")
    }
    openDialog();
  };
  return (
    <Container>
      <ErrorModal errorMsg={errorMsg} setErrorMsg={setErrorMsg}/>
      <CheckoutModal dialogRef={dialogRef} 
                     closeDialog={closeDialog} 
                     total={total} 
                     cartProducts={cartProducts}
                     products={products}/>
      <SummaryTitle>價格明細</SummaryTitle>
      <SummaryItem>
        <SummaryItemText>小計</SummaryItemText>
        <SummaryItemPrice>$NT {total}</SummaryItemPrice>
      </SummaryItem>
      <SummaryItem>
        <SummaryItemText>運費</SummaryItemText>
        <SummaryItemPrice>$NT {shippingFee}</SummaryItemPrice>
      </SummaryItem>
      <SummaryItem>
        <SummaryItemText>折扣</SummaryItemText>
        <SummaryItemPrice>$NT 0</SummaryItemPrice>
      </SummaryItem>
      <SummaryItem>
          <SummaryItemText type="total">總計</SummaryItemText>
          <SummaryItemPrice type="total">
            $NT {total + 60}
          </SummaryItemPrice>
      </SummaryItem>
      <Button type="button" 
              content="前往結帳" 
              backgroundColor="black" 
              color="white" 
              width="100%" 
              isDisable={isDisable} 
              space="comfortable" 
              fontSize="1.125rem"
              clickHandler={openCheckoutModal}/>
    </Container>
  )
}

export default Summary