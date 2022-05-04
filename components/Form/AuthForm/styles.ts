import styled from "styled-components";
import {devices} from "../../../styles/responsive";

// signup form
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

// login form
export const WhiteForm = styled.form`
  display: flex;
  flex-direction:column;
  gap:10px;
  width: 30%;
  padding: 20px;
  background: rgba(255, 255, 255, 1);
  @media ${devices.tabletL}{
    width: 60%;
  }
  @media ${devices.mobile}{
    width: 85%;
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

export const LinkContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;


export const LinkText = styled.a`
  color: black;
  font-size: 0.875rem;
  text-decoration:underline;
  cursor:pointer;
  @media ${devices.mobile}{
  font-size:1rem;
}
`;



