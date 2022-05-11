import React,{useEffect, Dispatch,SetStateAction} from 'react';
import useControlDialog from '../../../utils/hooks/useControlDialog';
import {FixedWidthButton} from "../index";
import { ModalContainer } from './styles';
import {  ModalHeader,ContentWrapper,Text } from './styles';
import {AiOutlineClose} from "react-icons/ai";


interface Props {
  errorMsg:string|null;
  setErrorMsg:Dispatch<SetStateAction<string | null>>;
  headerText?:string;
  showCloseIcon?:boolean; // true if need close icon
}

const ErrorModal:React.FC<Props> = ({errorMsg, setErrorMsg, headerText, showCloseIcon}) => {
  const {dialogRef, openDialog, closeDialog} = useControlDialog(setErrorMsg);

  useEffect(()=>{
    if(errorMsg){
      openDialog();
    }

  },[errorMsg,openDialog]);

  return (
    <ModalContainer ref={dialogRef} id="errorDialog" open={false}>
       {showCloseIcon && <AiOutlineClose onClick={closeDialog}/>}
      <ModalHeader>{headerText || "Oops!發生了一點問題"}</ModalHeader>
      <ContentWrapper>
      <Text>{errorMsg}</Text>
      <FixedWidthButton type="button" 
                        content="關閉" 
                        backgroundColor="var(--secondaryColor)" 
                        color="white"
                        width="30%" 
                        clickHandler={closeDialog}/>
      </ContentWrapper>
    </ModalContainer>
  )
}

export default ErrorModal;