import {AiOutlineLoading3Quarters} from "react-icons/ai"
import styled from "styled-components";
import { rotate } from "../../../../styles/animation"

export const IconSpinner = styled(AiOutlineLoading3Quarters)`
  display: inline-block;
  animation: ${rotate} 1.5s linear infinite;
`;

export const FixedSpinner = ()=>{
  return (
    <FixedContainer><IconSpinner/></FixedContainer>
  )
}


const FixedContainer = styled.div`
  position:fixed;
  width:100%;
  height:100vh;
  top:0;
  left:0;
  z-index:3;
  font-size:2rem;
  display:flex;
  align-items:center;
  justify-content:center;
  pointer-events:none;
`