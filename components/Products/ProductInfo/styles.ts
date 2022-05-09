import styled from "styled-components";
import { devices } from "../../../styles/responsive";
export const InfoContainer = styled.div`
  width: 100%;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  gap:30px;
  @media ${devices.tabletL}{
    gap:20px;
  }
  @media ${devices.tablet}{
    padding-bottom:20px;
  }
  @media ${devices.mobile}{
    padding:0px;
    padding-bottom:30px;
  }
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  letter-spacing: 1px;
  padding-bottom:10px;
  border-bottom: 2px solid lightgray;
`;

export const Description = styled.p`
  line-height: 200%;
  letter-spacing: 1px;
  @media ${devices.tabletL}{
      font-size:1.25rem;
      line-height:180%;
  }
`;