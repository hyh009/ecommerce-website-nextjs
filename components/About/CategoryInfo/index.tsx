import React from 'react';
import { Container, CardContainer, FlipCardInner, FlipCardFront, ImgContainer, FlipCardBack,
Info, Title, Name, Desc } from './styles';
import Image from 'next/image';
import {categories} from "../../../utils/data/productCat";

const CategoryInfo:React.FC = () => {
  return (
    <Container>
      {
        categories.map((item,index)=>(
        <CardContainer key={index}>
            <FlipCardInner>
                <FlipCardFront>
                    <ImgContainer>
                        <Image src={item.img} alt={item.name} layout="fill" objectFit="cover"/>
                    </ImgContainer>
                    <Info>
                        <Title>{item.name}</Title>
                    </Info>
                </FlipCardFront>
                <FlipCardBack>
                <Info>
                    <Name>{item.name}</Name>
                    <Desc>{item.desc}</Desc>
                </Info>
                </FlipCardBack>
            </FlipCardInner>
        </CardContainer>
        ))
      }
    </Container>
  )
}

export default CategoryInfo