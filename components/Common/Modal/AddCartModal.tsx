import React, { RefObject } from 'react';
import useControlDialog from '../../../utils/hooks/useControlDialog';
import { ModalContainer } from './styles';
import {AiOutlineClose} from "react-icons/ai";

interface Props {
  dialogRef:RefObject<HTMLDialogElement>;
  closeDialog?:()=>void;
  headerText?:string;
  showCloseIcon?:boolean; // true if need close icon
}


const AddCartModal:React.FC<Props> = ({dialogRef, showCloseIcon, closeDialog}) => {
  return (
    <ModalContainer ref={dialogRef}>
      {showCloseIcon && <AiOutlineClose onClick={closeDialog}/>}
    </ModalContainer>
  )
}

export default AddCartModal;