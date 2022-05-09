import React from 'react';
import Image from "next/image";
import Link from "next/link";
import useControlDialog from '../../../utils/hooks/useControlDialog';
import { AddCartModal } from '../../Common';
import {Container,Title,ImageContainer,Info,IconContainer,LikeIcon} from "./styles";
import { IProduct } from '../../../types/product';
import {MdAddShoppingCart,MdSearch} from "react-icons/md";
import { ForwardRefProps } from '../../../types/basic';

const ProductLink =  React.forwardRef<HTMLAnchorElement,ForwardRefProps>(({href,onClick},ref)=>{
  return(
    <a href={href} onClick={onClick} ref={ref} title="前往商品頁">
    <IconContainer>
      <MdSearch/>
    </IconContainer>
    </a>
  )
});

ProductLink.displayName = "ProductLink";

interface Props {
  product:IProduct
}

const Product:React.FC<Props> = ({product}) => {
  const {dialogRef,openDialog,closeDialog } = useControlDialog();
  return (
   <>
    <AddCartModal dialogRef={dialogRef} closeDialog={closeDialog} showCloseIcon={true} product={product}/>
    <Container>
      <Title>{product.name}</Title>
      <ImageContainer>
        <Image src={product.imgs[0].src} alt={product.name} layout="fill" objectFit="cover" />
      </ImageContainer>
      <Info title={product.title}>
        <Link href={`/products/${encodeURIComponent(product._id.toString())}`} passHref>  
         <ProductLink/>
        </Link>
        <IconContainer title="加入購物車" onClick={openDialog}>
          <MdAddShoppingCart/>
        </IconContainer>
        <IconContainer title="加入願望清單">
          <LikeIcon/>
        </IconContainer>
      </Info>
    </Container>
   </>
  )
}

export default Product;