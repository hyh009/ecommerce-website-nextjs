import React from 'react';
import { IconType } from 'react-icons';
import { Container, Title, Content, Desc } from './styles';

interface Props {
    title:string;
    content:string;
    Icon?:IconType;
    desc:string;
}

const ProfileFeature:React.FC<Props> = ({title, content, Icon, desc}) => {
  return (
    <Container>
        <Title>{title}</Title>
        <Content>{Icon && <Icon/>}{content}</Content>
        <Desc>{desc}</Desc>
    </Container>
  )
}

export default ProfileFeature;