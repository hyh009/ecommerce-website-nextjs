import styled from "styled-components";
import { devices } from "../../../styles/responsive";
import { FlexBetween } from '../../Wrapper/styles';
import { FilterColor } from "../../Products/Element/styles";
import { AiOutlineClose } from "react-icons/ai";
interface ContainerProps {
    inStock:boolean;
}

export const Container = styled(FlexBetween)<ContainerProps>`
    position:relative;
    padding:10px;
    box-shadow:0px 0px 10px 1px rgb(222,222,222);
    border-radius:5px;
    background-color:${(props)=>props.inStock?"white":"#f7e4e4"};
    color:${(props)=>props.inStock?"black":"gray"};
    &:hover{
        transform:translateY(-2px);
        background-color: ${(props)=>props.inStock?"#fafaf2":"#f7d1d1"};
    }
    @media ${devices.tabletL}{
        flex-direction:column;
    }
`;

export const ProductDetail = styled.div`
  flex: 3;
  display: flex;
  @media ${devices.mobile}{
      flex-direction:column;
      align-items:center;
  }
`;

export const Details = styled.div`
    padding:5px 10px;
    display: flex;
    flex-direction:column;
    gap:10px;
    justify-content:space-around;
    width:100%;
    @media ${devices.mobile}{
        align-items:center;
        text-align:center;
    }
`;

export const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap:20px;
  @media ${devices.tabletL}{
      flex-direction:row;
      justify-content:space-around;
  }
  @media ${devices.mobile}{
      flex-direction:column;
  }
`;

export const DisplayColor = styled(FilterColor)``;

export const DisplayPattern = styled.div`
    background-color:black;
    color:white;
    letter-spacing:1px;
    width:fit-content;
    padding:1px 5px;
    border-radius:7px;
`;

export const CloseIcon = styled(AiOutlineClose)`
    position:absolute;
    top:5px;
    right:5px;
    font-size:20px;
    cursor:pointer;
    color:gray;
    z-index:2;
`;


export const NotInStock = styled.div`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:1;
    display: flex;
    align-items:center;
    justify-content:center;
    font-size:1.25rem;
    letter-spacing:2px;
    color:red;
    user-select:none;
`;