import styled from 'styled-components';
import { devices } from '../../../styles/responsive';

export const Title = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  letter-spacing: 2px;
  @media ${devices.mobile}{
      padding-bottom:10px;
  }
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  @media ${devices.mobile}{
      flex-direction:column;
      padding:0;
  }
`;

export const CustomLink = styled.a`
    color: black;
    display:block;
    padding:5px 10px;
    width:10%;
    min-width:fit-content;
    text-align:center;
    letter-spacing:2px;
    cursor:pointer;
    border:2px solid black;
    transition:0.2s;
    &:hover{
        transform:translateY(-5%);
        background-color:#eee;
    }
`; 

export const TopTextContainer = styled.div`
  display: flex;
  justify-content: center;
  gap:10px;
`;

export const TopText = styled.a`
  text-decoration: underline;
  cursor: pointer;
  @media ${devices.mobile}{
      margin:20px 10px;
      font-size:1rem;
      text-align:center;
  }
`;