import React from 'react';
import { Container, ImgContainer, DescContainer, NoContentText, NoContentButton } from './styles';
import Image from "next/image";
import Link from "next/link";

interface Props {
  place?:"profile";
  type:"wish"|"cart";
}

const text = {
  cart:{
    image:"https://res.cloudinary.com/dh2splieo/image/upload/v1640854025/shop_website/imgs/undraw_empty_cart_co35_aivunl.svg",
    alt:"空購物車",
    desc:"目前購物車內沒商品...",
    btnText:"購物去",

  },
  wish:{
    image:"https://res.cloudinary.com/dh2splieo/image/upload/v1641545100/shop_website/imgs/undraw_wishes_icyp_uccfiz.svg",
    alt:"尚無願望清單",
    desc:"目前沒有願望清單...",
    btnText:"查看商品",

  }
}

const EmptyCart:React.FC<Props> = ({place, type}) => {
  const selectedText = text[type];
  return (
    <Container>
      <ImgContainer>
          <Image
            src={selectedText.image}
            alt={selectedText.alt}
            layout="fill"
          />
      </ImgContainer>
      <DescContainer>
          <NoContentText size={place==="profile"?"small":""}>
            {selectedText.desc}
          </NoContentText>
          <Link href="/products" passHref>
            <NoContentButton
              size={place==="profile"?"small":""}
            >
              {selectedText.btnText}
            </NoContentButton>
          </Link>
      </DescContainer>
    </Container>
  )
}

export default EmptyCart