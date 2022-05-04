import styled from "styled-components";
import { devices } from "../../../styles/responsive";
import Image from "next/image";


interface ContainerProps {
    backgroundColor: string
}

interface ArrowProps {
    position:"right"|"left"
}

export const Container = styled.div<ContainerProps>`
    width:100%;
    height:calc(100vh - var(--navbarHeight) - 30px);
    display:flex;
    background-color:${(props)=>props.backgroundColor};
    user-select:none;
    @media ${devices.tabletL}{
        aspect-ratio:2/1;
        height:auto;
    }

`;

export const ImgContainer = styled.div`
    width: max(50%);
    height :100%;
    position:relative;
`;

export const TextContainer = styled.div`
    width: max(50%);
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    user-select:none;
    gap:40px;
    padding:20px;
    @media ${devices.tablet}{
        gap:10px;
    }
    @media ${devices.mobile}{
        gap:25px;
        padding: 10px;
    }
    
`;

export const Title = styled.h1`
  font-size: 6vmin;
  color: black;
  letter-spacing: 5px;
  font-weight: 500;
  text-shadow: 2px 2px lightgray;
  text-align:center;
  @media ${devices.tabletL}{
      font-size:4vmin;
  }
  @media ${devices.mobile}{
    text-shadow: 1px 1px lightgray;
  }
`;

export const Description = styled.p`
  font-size: 4vmin;
  color: black;
  letter-spacing: 2px;
  line-height: 200%;
  @media ${devices.tabletL}{
      font-size:2.5vmin;
      line-height: 200%;
  }
  @media ${devices.mobile}{
      display:none;
  }
`;

export const LinkButton = styled.a`
    font-size:2.5vmin;
    color:black;
    border:2px solid black;
    width: 20%;
    min-width:fit-content;
    background-color:transparent;
    display:flex;
    justify-content:center;
    align-items:center;
    letter-spacing:2.5px;
    padding:5px;
    align-self:flex-end;
    margin-right:15px;
    cursor:pointer;
    transition:0.3s;
    &:hover{
        transform:scale(1.05);
    }
    @media ${devices.mobile}{
        padding:3px;
        align-self:center;
        margin-right:0px;
    }
`;

export const Arrow = styled.div<ArrowProps>`
    position:absolute;
    top:50%;
    transform:translateY(-50%);
    right:${(props)=>props.position==="right"&&"0px"};
    left:${(props)=>props.position==="left"&&"0px"};
    z-index:1;
    font-size:1.5rem;
    cursor:pointer;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:5px;
    color:rgba(0,0,0,0.5);
    background-color:rgba(255,255,255,0.4);
    border-radius:5%;
    aspect-ratio:3/4;
    @media ${devices.mobile}{
        font-size:1rem;
        right:${(props)=>props.position==="right"&&"-3px"};
        left:${(props)=>props.position==="left"&&"-3px"};
    }

`

export const ArrowCircle = styled(Arrow)`
    color:rgba(255,255,255,0.8);
    background-color:rgba(0,0,0,0.8);
    border-radius:50%;
    aspect-ratio:1/1;
    justify-content:center;
    right:${(props)=>props.position==="right"&&"10px"};
    left:${(props)=>props.position==="left"&&"10px"};
    @media ${devices.mobile}{
        font-size:1rem;
        right:${(props)=>props.position==="right"&&"5px"};
        left:${(props)=>props.position==="left"&&"5px"};
    }
`;

export const CustomImg = styled(Image)`
`

export const CatButton = styled.a`
  border: none;
  padding: 5px 10px;
  font-size: 3.5vmin;
  background-color: white;
  cursor: pointer;
  color: black;
  font-weight: 700;
  letter-spacing: 2px;
  transition: all 0.5s ease;
  @media ${devices.tabletL}{
      font-size:2.5vmin;
  }
`;

export const CatContainer = styled.div`
  padding: 2px;
  height: 70vh;
  width: 100%;
  position: relative;
  @media ${devices.tabletL}{
      height:40vh;
  }
  :hover ${CustomImg} {
    filter: brightness(50%);
  }
  &:hover ${CatButton} {
    background-color: black;
    color: white;
  }
`;

export const CatName = styled.h3`
  font-size: 4.5vmin;
  font-weight: 450;
  text-shadow: 2px 2px 4px #000000;
  letter-spacing: 5px;
  color: white;
  @media ${devices.tabletL}{
      font-size:3vmin;
  }
  @media ${devices.mobile}{
      font-size:4vmin;
  }
`;

export const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

export const ProductImgContainer = styled.div`
    width:100%;
    aspect-ratio:1/1;
    position:relative;
`;

export const ThumbImgContainer = styled(ProductImgContainer)`
    cursor: pointer;
`;
