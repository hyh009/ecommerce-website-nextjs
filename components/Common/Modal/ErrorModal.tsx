import React,{Dispatch,SetStateAction} from 'react';
import {withModal} from "../../HOC/withModal";
import {Button} from "../index";
import {  ModalHeader,ContentWrapper,Text } from './styles';


interface Props {
  errorMsg:string|null;
  setErrorMsg:Dispatch<SetStateAction<string | null>>;
  headerText?:string;
  closeDialog?:()=>void;
}

const ErrorModal:React.FC<Props> = ({errorMsg,  headerText, closeDialog}) => {

  return (
    <>
      <ModalHeader>{headerText || "Oops!發生了一點問題"}</ModalHeader>
      <ContentWrapper>
      <Text>{errorMsg}</Text>
      <Button type="button" content="關閉" backgroundColor="var(--secondaryColor)" color="white" clickHandler={closeDialog}/>
      </ContentWrapper>
    </>
  )
}

export default withModal(ErrorModal)