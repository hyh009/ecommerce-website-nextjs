import styled from "styled-components";
import { devices } from "../../../styles/responsive";

interface ImgContainerProps {
    size?:"auto"|"small";
    border?:string;
    shape?:"circle"
}


type SizeType = {auto:string,small:string}

const SIZE:SizeType = {
    auto:"100%",
    small:"20px",
}


export const ImgContainer = styled.div<ImgContainerProps>`
  height: ${(props)=>props.size? SIZE[props.size] : "35px"};
  width:  ${(props)=>props.size? SIZE[props.size] : "35px"};
  object-fit: cover;
  overflow: hidden;
  border-radius: ${(props)=>props.shape==="circle"?"50%":undefined};
  border:${(props)=>props.border};
  cursor: pointer;

  &:hover{
    filter:brightness(90%);
  }
`;