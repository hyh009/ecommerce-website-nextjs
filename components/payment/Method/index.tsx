import React from 'react';
import { MethodContainer, Temp, Subtitle, ImageContainer, Link } from './styles';
import Image from "next/image";
interface Props {
    item:{
        title:string;
        img:string;
        linkText:string;
        disable:boolean;
    }
    url:string;
}
const Method:React.FC<Props> = ({item, url}) => {
  return (
    <MethodContainer>
        {item.disable && <Temp>測試版目前無法使用</Temp>}
        <Subtitle>{item.title}</Subtitle>
        <ImageContainer>
            <Image src={item.img}
                   alt={item.title}
                   layout="fill"
                   objectFit="cover"/>
        </ImageContainer>
        <Link href={url}>{item.linkText}</Link>
    </MethodContainer>
  )
}

export default Method;