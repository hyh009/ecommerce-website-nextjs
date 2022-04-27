import React from 'react'
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import {IconType} from "react-icons"
import {BasicButton} from "./styles"


interface ButtonProps {
    type:"submit" | "reset" | "button";
    content?:string;
    Icon?:IconType;
    loading?:boolean;
    isDisable?:boolean;
    clickHandler?:()=>void;
    border?:string;
    space?:"compact"|"standard"|"comfortable";
    fontSize?:string;
    backgroundColor?:string;
    color?:string;
    alignSelf?:"flex-start"|"center"|"flex-end";
}


const Button:React.FC<ButtonProps> = ({type, content, Icon, loading, clickHandler, isDisable, border, fontSize, space, backgroundColor, color, alignSelf})=>{
    return (
        <BasicButton type={type} 
                     disabled={isDisable}
                     onClick={clickHandler && clickHandler}
                     border={border?border as string:undefined}
                     space={space?space :undefined}
                     fontSize={fontSize? fontSize : undefined}
                     backgroundColor={backgroundColor?backgroundColor as string :undefined}
                     color={color?color as string: undefined}
                     alignSelf={alignSelf?alignSelf :undefined}
                     isDisable={isDisable}
                     >
            {Icon&&!loading && <Icon/>}
            {Icon && loading && <AiOutlineLoading3Quarters/>}
            {content}
        </BasicButton>
    )
  }
export default Button;