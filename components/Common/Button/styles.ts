import styled from "styled-components";
import {devices} from "../../../styles/responsive";

interface ButtonProps {
    color?:string;
    backgroundColor?:string;
    border?:string;
    fontSize?:string;
    space?:"compact"|"standard"|"comfortable";
    alignSelf?:"flex-start"|"center"|"flex-end";
    isDisable?:boolean;
}

const BUTTON_SPACE = {
    compact:"3px 0",
    standard:"5px 0",
    comfortable:"7px 10px"
    }

export const BasicButton = styled.button<ButtonProps>`
    border:none;
    color:${(props)=>props.isDisable?"var(--darkGray)":props.color? props.color: "#fff"};
    background-color:${(props)=>props.isDisable?"gray":props.backgroundColor?props.backgroundColor: "black"};
    border:${(props)=>props.border || "none"};
    padding:${(props)=> props.space ? BUTTON_SPACE[props.space] : BUTTON_SPACE["standard"]};
    width:20%;
    min-width:fit-content;
    cursor:pointer;
    letter-spacing:1px;
    font-size:${(props)=>props.fontSize || "1rem"};
    align-self:${(props)=>props.alignSelf?props.alignSelf:""};
    
    ${`@media ${devices.tablet}{
            width:100%;
        }
    `}
    
`;
