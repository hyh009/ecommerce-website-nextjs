import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";

import { ToastContainer } from "react-toastify";

interface Props {
  color?:"dark"|"light";
}

export const BasicToastr:React.FC<Props> = ({color}) => {
  const domBody = typeof document !== "undefined" && document.body;
  const [target, setTarget] = useState<Element | null>(null);
  
  useEffect(()=>{
    setTarget(document.querySelector("#portal"))
  },[domBody]);

  return (
    target?ReactDOM.createPortal(
      <ToastContainer
      theme={color?color:"light"}
      position="bottom-left"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
    />,target
    ):<></>
  );
};


export const ModalToastr:React.FC<Props> = ({color}) => {

  return (
      <ToastContainer
      theme={color?color:"dark"}
      position="top-left"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
    />
  );
};


