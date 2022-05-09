import React, { RefObject } from 'react';
import { ProductInfo } from '../../Products';
import { AddCartContainer, CloseIcon } from './styles';
import { IProduct } from '../../../types/product';

interface Props {
  product:IProduct;
  dialogRef:RefObject<HTMLDialogElement>;
  closeDialog?:()=>void;
  headerText?:string;
  showCloseIcon?:boolean; // true if need close icon
}


const AddCartModal:React.FC<Props> = ({dialogRef, showCloseIcon, closeDialog, product}) => {
  return (
    <AddCartContainer ref={dialogRef}>
      {showCloseIcon && <CloseIcon onClick={closeDialog}/>}
      <ProductInfo product={product} type="modal"/>
    </AddCartContainer>
  )
}

export default AddCartModal;