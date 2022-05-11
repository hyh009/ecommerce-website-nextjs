import React,{Dispatch,SetStateAction} from 'react'
import {InputContainer, IconContainer,Label, TransparentInput, TransparentSelect, TransparentTextarea} from "./styles";
import { IconSpinner } from '../../Common/Spinner';
import {InputTypes} from "../../../types/auth"
import {IconType} from "react-icons"
import {ShowPasswordsState} from "../AuthForm/SignupForm"

interface InputProps {
  type:InputTypes;
  name:string;
  value?:string;
  placeholder?:string;
  propRef?:React.RefObject<HTMLInputElement>;
  changeHandler?:(e: React.ChangeEvent<HTMLInputElement>) => void;
  Icon?:IconType;
  loading?:boolean;
  border?:string;
  IconColor?:string;
  setShowPasswords?:Dispatch<SetStateAction<ShowPasswordsState>>
}

export const Input:React.FC<InputProps> = ({ type, name, value, placeholder, propRef, changeHandler, Icon, loading, border, IconColor,setShowPasswords}) => {
  return (
    <InputContainer border={border ?border as string:undefined}>
      {Icon && !loading && 
            <IconContainer color={IconColor?IconColor as string:undefined}
                           style={{cursor:setShowPasswords&&"pointer"}}
                           onClick={setShowPasswords?()=>setShowPasswords((prev)=>({...prev,[name]:!prev[name as "password"||"passwordConfirmation"]})):undefined}>
              <Icon/>
            </IconContainer>}
      {/* while loading show loading Icon*/}
      {Icon && loading && 
            <IconContainer color={IconColor?IconColor as string:undefined}>
              <IconSpinner/>
            </IconContainer>}
      <TransparentInput type={type} 
                  name={name} 
                  value={value} 
                  placeholder={placeholder} 
                  ref={propRef?propRef:null} 
                  onChange={changeHandler?changeHandler:undefined}/>
    </InputContainer>
  )
}

interface InputWithLabelProps extends InputProps {
  label: string;
  require?:boolean;
}


export const InputWithLabel:React.FC<InputWithLabelProps> = ({ type, name, value, label, require, placeholder, propRef, changeHandler, Icon, loading, border, IconColor,setShowPasswords})=>{
  return (
    <div>
      <Label require={require?require:undefined}>{label}</Label>
      <Input type={type} 
             name={name}
             value={value}
             placeholder={placeholder}
             changeHandler={changeHandler} 
             propRef={propRef}
             Icon={Icon}
             IconColor={IconColor}
             loading={loading}
             border={border}
             setShowPasswords={setShowPasswords}
             />
    </div>
   )
}

interface SelectProps {
  options:{
    value:string,
    displayText:string,
  }[];
  propRef?:React.RefObject<HTMLSelectElement>;
  Icon?:IconType;
  border?:string;
  IconColor?:string;
}

export const Select:React.FC<SelectProps> = ({options, propRef, Icon, border, IconColor})=>{
  return (
    <InputContainer border={border?border as string:undefined}>
       {Icon && <IconContainer color={IconColor?IconColor as string:undefined}><Icon/></IconContainer>}
    <TransparentSelect ref={propRef}>
      {options?.map((item,index)=>(<option key={index} value={item.value}>{item.displayText}</option>))}
      </TransparentSelect>
    </InputContainer>
  )
}

interface TextAreaProps {
  name:string;
  value?:string;
  placeholder?:string;
  rows?:number;
  propRef?:React.RefObject<HTMLTextAreaElement>;
  changeHandler?:(e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  Icon?:IconType;
  border?:string;
  IconColor?:string;
}

export const TextArea:React.FC<TextAreaProps> = ({name,placeholder, value, rows, border, changeHandler,Icon, propRef, IconColor})=>{
  return (
    <InputContainer border={border}>
       {Icon && <IconContainer color={IconColor?IconColor as string:undefined}><Icon/></IconContainer>}
      <TransparentTextarea name={name} 
                           value={value} 
                           placeholder={placeholder}
                           onChange={changeHandler?changeHandler:undefined}
                           ref={propRef}
                           rows={rows}/>
    </InputContainer>
  )
}