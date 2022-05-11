import React from 'react';
import { Container, Block } from './styles';

interface Props {
    page:{
        maxPage:number;
        currentPage:number;
    },
    clickHandler:(e:React.MouseEvent<HTMLDivElement>)=>void;
}

const Pagination:React.FC<Props> = ({page,clickHandler}) => {
  return (
    <Container>
        {page && [...Array(page.maxPage).keys()].map((p)=>(
            <Block key={p} active={page.currentPage===(p+1)} onClick={clickHandler}>{p+1}</Block>
        ))}
    </Container>
  )
}

export default Pagination