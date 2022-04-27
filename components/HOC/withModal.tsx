import React,{useRef, useEffect, Dispatch, SetStateAction, ComponentType} from 'react'
import { ModalContainer } from '../Common/Modal/styles'
import {AiOutlineClose} from "react-icons/ai";


interface IhocProps {
    errorMsg:string|null;
    setErrorMsg:Dispatch<SetStateAction<string | null>>;
    showCloseIcon?:boolean;
}

interface ComponentProps {
  errorMsg:string|null;
  setErrorMsg:Dispatch<SetStateAction<string | null>>;
  closeDialog?:()=>void;
}


export const withModal = (OriginalComponent:ComponentType<ComponentProps>)=>{
    
    return (hocProps:IhocProps)=>{
      const {errorMsg, setErrorMsg, showCloseIcon} = hocProps;
        const dialogRef = useRef<HTMLDialogElement>(null);
        const closeDialog = ():void => {
          if(dialogRef.current!==null){
            dialogRef.current.close();
            setErrorMsg(null);
          }
        }
        
        useEffect(()=>{
            if(errorMsg){
              if(dialogRef.current){
                // make sure dialog is close
                dialogRef.current.close();
                dialogRef.current.showModal();
              }
            }
        
          },[errorMsg]);


        return (
            <ModalContainer ref={dialogRef} hidden={true}>
               {showCloseIcon && <AiOutlineClose onClick={closeDialog}/>}
              <OriginalComponent {...hocProps} closeDialog={closeDialog}/>
            </ModalContainer>
          )
    }
}

