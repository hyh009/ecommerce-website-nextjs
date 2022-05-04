import styled from "styled-components";
import {devices} from "../../../styles/responsive";

interface ButtonProps {
    color?:string;
    backgroundColor?:string;
    border?:string;
    width?:string;
    fontSize?:string;
    space?:"compact"|"standard"|"comfortable";
    alignSelf?:"flex-start"|"center"|"flex-end";
    isDisable?:boolean;
}

const BUTTON_SPACE = {
    compact:"3px 0",
    standard:"5px 3px",
    comfortable:"7px 10px"
    }

export const BasicButton = styled.button<ButtonProps>`
    border:none;
    color:${(props)=>props.color? props.color: "#fff"};
    background-color:${(props)=>props.backgroundColor?props.backgroundColor: "black"};
    border:${(props)=>props.border || "none"};
    filter:${(props)=>props.isDisable?"grayscale(50%)":"none"};
    padding:${(props)=> props.space ? BUTTON_SPACE[props.space] : BUTTON_SPACE["standard"]};
    width:${(props)=>props.width? props.width:"20%"};
    min-width:fit-content;
    cursor:pointer;
    letter-spacing:2.5px;
    font-size:${(props)=>props.fontSize || "1rem"};
    align-self:${(props)=>props.alignSelf?props.alignSelf:""};
    
    &:hover{
        transform: scale(1.05);
        opacity:0.8;
    }
`;


export const ResponsiveButton = styled(BasicButton)<ButtonProps>`
    ${`@media ${devices.tablet}{
            width:100%;
        }
    `}
    
`;
