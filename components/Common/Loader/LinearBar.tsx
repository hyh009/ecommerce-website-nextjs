import React from 'react'
import styled, {keyframes} from 'styled-components';

const LinearBar = () => {
  return (
    <Bar/>
  )
}

export default LinearBar;

export const background = keyframes`
  0%{
    background-position:left;
  }
  100%{
    background-position:right;
  }
`;

const Bar = styled.div`
    width:40%;
    height:12px;
    border-radius:5px;
    background: rgb(84,185,219);
    background-image:  linear-gradient(90deg, rgba(84,185,219,1) 14%,
                                              rgba(248,244,174,1) 32%, 
                                              rgba(84,185,219,1) 55%, 
                                              rgba(255,251,170,1) 78%);
    background-size:300%;
    background-position:left;
    animation:${background} 2s linear infinite alternate;

`;
