import React,{Dispatch,SetStateAction} from 'react'
import {InputContainer, IconContainer,Label, TransparentInput, TransparentSelect, TransparentTextarea} from "./styles";
import { IconSpinner } from '../../Common';
import { FlexCol } from "../../Wrapper/styles";
import {InputTypes} from "../../../types/auth"
import {IconType} from "react-icons"
import {ShowPasswordsState} from "../AuthForm/SignupForm"

interface InputProps {
  type:InputTypes;
  name:string;
  value?:string;
  defaultValue?:string;
  placeholder?:string;
  propRef?:React.RefObject<HTMLInputElement>;
  changeHandler?:(e: React.ChangeEvent<HTMLInputElement>) => void;
  Icon?:IconType;
  loading?:boolean;
  isDisabled?:boolean;
  border?:string;
  borderBottom?:string;
  IconColor?:string;
  setShowPasswords?:Dispatch<SetStateAction<ShowPasswordsState>>
}

export const Input:React.FC<InputProps> = ({ type, name, value, defaultValue, placeholder, propRef, isDisabled, changeHandler, Icon, loading, border, borderBottom, IconColor,setShowPasswords}) => {
  return (
    <InputContainer border={border ?border as string:undefined} borderBottom={borderBottom?borderBottom as string:undefined}>
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
                  defaultValue={defaultValue} 
                  placeholder={placeholder}
                  disabled={isDisabled} 
                  ref={propRef?propRef:null} 
                  onChange={changeHandler?changeHandler:undefined}/>
    </InputContainer>
  )
}

interface InputWithLabelProps extends InputProps {
  label: string;
  require?:boolean;
}


export const InputWithLabel:React.FC<InputWithLabelProps> = ({ type, name, value, label, require, placeholder, propRef, changeHandler, Icon, loading, border, borderBottom, IconColor,setShowPasswords})=>{
  return (
    <FlexCol>
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
             borderBottom={borderBottom}
             setShowPasswords={setShowPasswords}
             />
    </FlexCol>
   )
}

interface SelectProps {
  options:{
    value:string,
    displayText:string,
    selected?:boolean
  }[];
  name?:string;
  value?:string;
  defaultValue?:string;
  changeHandler?:(e: React.ChangeEvent<HTMLSelectElement>) => void;
  propRef?:React.RefObject<HTMLSelectElement>;
  Icon?:IconType;
  border?:string;
  IconColor?:string;
}

export const Select:React.FC<SelectProps> = ({options, name, value, defaultValue, propRef, changeHandler, Icon, border, IconColor})=>{
  return (
    <InputContainer border={border?border as string:undefined}>
       {Icon && <IconContainer color={IconColor?IconColor as string:undefined}><Icon/></IconContainer>}
    <TransparentSelect ref={propRef} name={name} value={value} defaultValue={defaultValue} onChange={changeHandler}>
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

interface CheckboxProps {
  type:"radio"|"checkbox";
  name:string;
  checked?:boolean;
  value?:string;
  changeHandler?:(e:React.ChangeEvent<HTMLInputElement>)=>void;

}
export const Checkbox:React.FC<CheckboxProps> = ({type, name, value, checked, changeHandler}) => {
  return (
    <input type={type} name={name} checked={checked} value={value} onChange={changeHandler}/>
  )
}