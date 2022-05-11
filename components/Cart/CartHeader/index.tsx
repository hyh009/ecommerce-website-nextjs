import React from 'react';
import {Title,Top, CustomLink, TopTextContainer, TopText} from "./styles";
import { useSession } from 'next-auth/react';
import { useAppDispatch} from "../../../store/hooks";
import {updateCart,cleanupNotLoginCart} from "../../../store/reducer/cartReducer";
import Link from "next/link";
import { FixedWidthButton } from '../../Common';

interface Props {
    quantity:number;
    type:"cart"|"wish"
}

const CartHeader:React.FC<Props> = ({quantity, type}) => {
  const dispatch = useAppDispatch();
  const {data:session} = useSession();

  const cleanupCart = () => {
        if(session){
            dispatch(updateCart({
            user:session.user._id,
            products:[],
            quantity:0
            }))
        }else{
            dispatch(cleanupNotLoginCart());
        }
    };
  return (
    <>
      <Title>{type==="cart"?"我的購物車":"我的願望清單"}</Title>
      <Top>
        <Link href="/products" passHref>
            <CustomLink>
                繼續購物
            </CustomLink>
        </Link>
        <TopTextContainer>
            <Link href="/cart" passHref>
                <TopText>
                    購物車中商品({quantity || 0})
                </TopText>
            </Link>
            <Link href="/wish" passHref>
                <TopText>
                    我的願望清單
                </TopText>
            </Link>
        </TopTextContainer>
        <FixedWidthButton type="button" 
                          content="清空購物車"
                          clickHandler={type==="cart"?cleanupCart:undefined} 
                          backgroundColor="black"
                          color="white"
                          width="10%" />
      </Top>
    </>
  )
}

export default CartHeader;