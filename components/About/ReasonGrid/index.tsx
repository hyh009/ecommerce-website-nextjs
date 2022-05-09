import React from 'react';
import {Col3T1Wrapper} from "../../Wrapper/styles";
import { Reason, ImgTitle, ImgText, ImgContainer } from './styles';
import Image from "next/image";
import { reason } from '../../../utils/data/about';

const ReasonGrid = () => {
  return (
    <Col3T1Wrapper>
    {
        reason.map((item,index)=>(
        <Reason key={index}>
            <ImgTitle>{item.title}</ImgTitle>
            <ImgContainer>
                <Image src={item.img} alt={item.title} layout="fill" objectFit="contain"/>
            </ImgContainer>
            <ImgText>{item.desc}</ImgText>
        </Reason>))
    }
    </Col3T1Wrapper>
  )
}

export default ReasonGrid