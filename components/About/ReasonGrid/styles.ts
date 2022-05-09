import styled from "styled-components";
import { devices } from "../../../styles/responsive";


export const Reason = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
  height: 70vh;
  @media ${devices.tabletL}{
      height:fit-content;
      gap:25px;
  }
`;

export const ImgContainer = styled.div`
  min-height: 50%;
  aspect-ratio:4/3;
  position:relative;
  @media ${devices.tabletL}{
    width: 80%;
  }
  @media ${devices.mobile}{
    width: 65%;
  }
`;

export const ImgTitle = styled.span`
  font-size: 4vmin;
  @media ${devices.mobile}{
      font-size:5vmin;
  }
`;

export const ImgText = styled.span`
  font-size: 3vmin;
  width: 80%;
  line-height: 150%;
  text-align: center;
  @media ${devices.mobile}{
      font-size:4vmin;
  }
`;