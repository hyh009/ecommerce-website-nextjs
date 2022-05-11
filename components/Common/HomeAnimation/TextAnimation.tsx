import React from 'react';
import styled, { keyframes } from 'styled-components';
import { devices } from '../../../styles/responsive';

const duration = 0.1; // the delay time of each word in animation

function template(i:number, duration:number) {
    return `
            &:nth-child(${i + 1}) {
              animation-delay: ${`${duration * i}s`};
             }
          `;
  }
  
function getAnimations(arrayLength:number):string {
    let str = "";
    for (let index = 0; index < arrayLength; index++) {
        str += template(index, duration);
    }
    return str;
}

const textFadeIn = keyframes`
    0% {opacity:0; transform:translateY(-100px) skewY(20deg) skewX(20deg) rotate(30deg); filter:blur(7px);}
    30% {opacity:1;transform:translateY(0)skewY(0deg) skewX(0deg) rotate(0deg); filter:blur(0);}
    70% {opacity:1;transform:translateY(0)skewY(0deg) skewX(0deg) rotate(0deg); filter:blur(0);}
    100% {opacity:0;transform:translateY(-100px )skewY(20deg) skewX(20deg) rotate(30deg); filter:blur(7px);}
`;

interface ContainerProps {
    order?:"second";
    arrayLength:number;
}

const Container = styled.span<ContainerProps>`
  display: inline-block;
  margin-left: 10px;
  font-weight: 700;
  text-shadow: 1px 1px 4px #000000;
  margin-top: ${(props) => (props.order === "second" ? "30px" : 0)};
  span {
    ${(props)=>getAnimations(props.arrayLength)};
  }
`;

const Word = styled.span`
    display: inline-block;
    opacity: 0;
    font-size: 3.5vmin;
    animation: ${textFadeIn};
    animation-duration: 6s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1.5;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    animation-delay: 2s;
    @media ${devices.tabletL}{
        font-size:4.5vmin;
    }
    @media ${devices.mobile}{
        font-size:6vmin;
    }
`;

interface Props {
    text:string;
    order?:"second";
}

const TextAnimation:React.FC<Props> = ({text, order}) => {
  const textArray = text.split("");
  return (
    <Container arrayLength={textArray.length} order={order}>
        {textArray.map((text, index) => (
        <Word key={index}>{text}</Word>
      ))}
    </Container>
  )
}

export default TextAnimation