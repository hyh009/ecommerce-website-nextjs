import React from 'react';
import Link from "next/link";
import {Container, Left, Logo, Description, IconContainer,
 Center,Title,ListContainer,ListItem, CustomLink,
 Right,ContactItem,IconBox } from "./styles";
import { FlexRow } from '../../Wrapper/styles';
import { ForwardRefProps } from '../../../types/basic';
import { categories } from '../../../utils/data/productCat';
import { contact, socialLink } from '../../../utils/data/companyInfo';
import { IconType } from "react-icons";

interface CatLinkProps extends ForwardRefProps {
  name:string;
}


const CatLink = React.forwardRef<HTMLAnchorElement,CatLinkProps>(({href, onClick, name},ref)=>{
  return (
    <CustomLink ref={ref} href={href} onClick={onClick}>
      <ListItem >
        {name}
      </ListItem>
    </CustomLink>
  )
});

CatLink.displayName = "CatLink";


const Footer:React.FC = () => {
  return (
    <Container>
      <Left>
        <Logo>墊一店奇想國際有限公司</Logo>
        <Description>本網站為練習用網站，資訊來源自網路。</Description>
        <FlexRow >
          {
            socialLink.map((item,index)=>{
              const Icon:IconType = item.Icon;
              return (
                <a href={item.link} key={index} target="_blank">
                  <IconContainer color={item.color}>
                    <Icon/>
                  </IconContainer>
                </a>
              )
            })
          }
        </FlexRow>
      </Left>
      <Center>
        <Title>商品分類</Title>
        <ListContainer>
          {
            categories.map((cat,index)=>(
              <Link href={cat.pathname} key={index}>
                <CatLink name={cat.name}/>
              </Link>
            ))
          }
        </ListContainer>
      </Center>
      <Right>
          {
            Object.values(contact).map((item,index)=>{
              const Icon = item.Icon;
              return (
                <ContactItem key={index}>
                  <IconBox>
                    <Icon/>
                  </IconBox>
                  {item.value}
                </ContactItem>
              )
            })
          }
      </Right>
    </Container>
  )
}

export default Footer;