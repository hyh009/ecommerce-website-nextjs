import React,{useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import styled from 'styled-components';

interface Props {
  selector:string;
}

const Backdrop:React.FC<Props> = ({selector}) => {
  const domBody = typeof document !== "undefined" && document.body;
  const [target, setTarget] = useState<Element | null>(null);
  
  useEffect(()=>{
    setTarget(document.querySelector(selector))
  },[domBody, selector]);

  return (
    target?ReactDOM.createPortal(
    <ColorDiv/>,target):<></>
  )
}

export default Backdrop;


const ColorDiv = styled.div`
  background-color:rgba(0,0,0,0.5);
  height:100%;
  width:100%;
`;