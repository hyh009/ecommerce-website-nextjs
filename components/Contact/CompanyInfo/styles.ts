import styled from "styled-components";
import { devices } from "../../../styles/responsive";

export const Container = styled.div`
    flex:1;
    display:flex;
    width: 100%;
    flex-direction:column;
    padding:20px 0px;
    gap:10px;
`;

export const Text = styled.span`
  font-size: 1.125rem;
  padding: 0 20px;
  letter-spacing: 1px;
  @media ${devices.tabletL}{
      padding:0 30px;
  }
  @media ${devices.mobile}{
      padding:0 20px;
      font-size:4vmin;
  }
`;

export const MapContainer = styled.div`
    width:90%;
    aspect-ratio:13/7;
    align-self:center;
    filter: grayscale(20%) opacity(90%) invert(100%);
    overflow:hidden;
`;

