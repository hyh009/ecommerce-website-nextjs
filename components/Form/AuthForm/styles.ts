import styled from "styled-components";
import {devices} from "../../../styles/responsive"

export const TransparentForm = styled.form`
  width: 60%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.4);
  display:flex ;
  flex-direction:column;
  gap:10px;
  @media ${devices.tabletL}{
      width: 75%;
  }
  @media ${devices.mobile}{
      width: 90%;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 1px;
  text-align: center;
`;

export const Notice = styled.i`
  font-size:0.75rem;
  display: block;
`





