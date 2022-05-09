import styled from "styled-components";
import { devices } from "../../../styles/responsive";
import {FlexRow} from "../../Wrapper/styles";



export const NoticeContainer = styled.span`
display: flex;
flex-direction: column;
`;

export const Notice = styled.span`
  background-color: rgba(170, 240, 209, 0.2);
  padding: 5px 2px;
  color:var(--darkGray);
  letter-spacing: 1px;
  @media ${devices.tabletL}{
      font-size:1.25rem;
      line-height:200%;
  }
`;


export const PriceContainer = styled(FlexRow)`
    gap:10px;
`;

interface PriceProps {
    size?: "small";
}

export const OriginalPrice = styled.span<PriceProps>`
  font-size: ${(props)=>props.size==="small"?"24px":"30px"};
  font-weight: 200;
  color: teal;
  letter-spacing: 1px;
  @media ${devices.tabletL}{
    font-size: ${(props)=>props.size==="small"?"24px":"30px"};
  }
`;

export const CurrentPrice = styled.span<PriceProps>`
  font-size: ${(props)=>props.size==="small"?"24px":"30px"};
  font-weight: 200;
  color: #f8435e;
  letter-spacing: 1px;
  @media ${devices.tabletL}{
    font-size: ${(props)=>props.size==="small"?"24px":"30px"};
  }

`;

export const NormalPrice = styled.s<PriceProps>`
font-size: ${(props)=>props.size==="small"?"16px":"20px"};
  font-weight: 200;
  color: gray;
  letter-spacing: 1px;
  @media ${devices.tabletL}{
    font-size: ${(props)=>props.size==="small"?"16px":"20px"};
  }
`;

export const ColorContainer = styled(FlexRow)`
    letter-spacing:1px;

`;

interface ColorProps {
    color:string
}

export const FilterColor = styled.div<ColorProps>`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0 5px;
    cursor: pointer;
    border: 1px solid lightgray;
    display:flex;
    align-items:center;
    justify-content:center;
    color:gray;

    &:hover {
        transform: scale(1.1);
    }
    @media ${devices.tabletL}{
        width:50px;
        height:50px;
        margin:8px;
    }
    @media ${devices.mobile}{
        width:40px;
        height:40px;
        margin:10px;
    }
    
    &.color_active {
    border: 2px solid var(--secondaryColor);;
    transform: scale(1.2);
    
    @media ${devices.tabletL}{
        border:3px solid var(--secondaryColor);
    }

    }
`;

export const IconContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:1.5rem;
    cursor: pointer;
    &:hover{
        color:gray;
    }

`;

export const Amount = styled.span`
  padding: 0 10px;
  border: 1.5px solid var(--secondaryColor);
  border-radius: 10px;
  margin: 0 5px;
  user-select:none;
  @media ${devices.tabletL}{
      padding:0 15px;
      border:2px solid var(--secondaryColor);
  }
`;

export const AmountText = styled.span`
    letter-spacing:1px;
`;