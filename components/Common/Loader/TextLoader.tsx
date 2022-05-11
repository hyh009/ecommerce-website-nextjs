import React from 'react'
import styled,{keyframes} from 'styled-components';

const duration = 0.15;


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


interface Props {
    text:string;
}

const TextLoader:React.FC<Props> = ({text}) => {
  const textArray = text.split("");
  return (
    <>
    <AllText arrayLength={textArray.length}>
        {textArray.map((text, index) => (
            <Word key={index}>{text}</Word>
        ))}
    </AllText>
    </>
  )
}

export default TextLoader;


export const bounce = keyframes`
  0%{
    transform:translateY(0px);
  }
  25%{
    transform:translateY(-8px);
  }
  40%{
    transform:translateY(-12px);
  }
  75%{
    transform:translateY(-5px);
  }
  100%{
    transform:translateY(0px);
  }
`;


interface ContainerProps {
    order?:"second";
    arrayLength:number;
}

const AllText = styled.h1<ContainerProps>`
    display:flex;
    align-items:center;
    gap:5px;
    span {
      ${(props)=>getAnimations(props.arrayLength)}
    }
`;

const Word = styled.span`
    position:relative;
    display:inline-block;
    animation: ${bounce} 1.5s linear infinite;
    font-size:1.25rem;
    font-weight:400;
`;




