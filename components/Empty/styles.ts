import styled from "styled-components";
import { devices } from "../../styles/responsive";

export const Container = styled.div`
  width: 100%;
  height: 55vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
  @media ${devices.tabletL}{
      height:40vh;
      gap:40px;
  }
  @media ${devices.mobile}{
      flex-direction:column;
      height:50vh;
      gap:20px;
  }
`;

export const ImgContainer = styled.div`
  height: 70%;
  position:relative;
  aspect-ratio:1/1;
`;

export const DescContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height:50%;
  gap:20px;
  @media ${devices.mobile}{
      justify-content:flex-start;
      height:fit-content;
  }
`;

interface Props {
    size?:string;
  }
  

export const NoContentText = styled.span<Props>`
  font-size: ${(props)=>props.size==="small"?"3vmin":"4vmin"};
`;

export const NoContentButton = styled.a<Props>`
  background-color: teal;
  width: max-content;
  color: white;
  text-decoration: none;
  padding: ${(props)=>props.size==="small"?"2px 5px": "5px 10px"};
  border-radius: 10px;
  letter-spacing: 2px;
  font-size: 3vmin;
  display:block;
`;