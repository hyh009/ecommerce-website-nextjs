import styled from "styled-components";
import {devices} from "../../../styles/responsive";

export const Container = styled.div`
  height: 50vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 0;
  align-items: center;
  background-color: var(--lightYellow);
  @media ${devices.tabletL}{
      paddng:50px;
      height:auto;
  }
  @media ${devices.mobile}{
      padding:0;
  }
`;


export const Title = styled.h3`
  font-size: 1.75rem;
  letter-spacing: 8px;
  font-weight: 800;
  @media ${devices.mobile}{
    padding:10px;
    font-size:1.25rem;
  }
`;
export const Description = styled.p`
  font-size: 1.25rem;
  margin: 20px;
  font-weight: 550;
  @media ${devices.mobile}{
      font-size:0.875rem;
      margin:10px;
      text-align:center;
  }
`;

export const Form = styled.form`
  width: 40%;
  display: flex;
  justify-content: center;
  @media ${devices.mobile}{
      width:auto;
      margin:10px;
  }
`;