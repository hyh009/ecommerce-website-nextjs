import styled from "styled-components";

interface Props {
    active:boolean
}

interface OptionProps {
    isDisable?:boolean;
}

export const Container = styled.div`
    position:relative;
    width:40%;
`;

export const Button = styled.button<Props>`
    width:100%;
    background-color:${(props)=>props.active?"black":"white"};
    color:${(props)=>props.active?"white":"black"};
    border:none;
    border:1px solid black;
    border-radius:5px;
    padding:3px 5px;
    font-size:1.125rem;
    letter-spacing:1px;
    cursor:pointer;
`;

export const MenuContainer = styled.div<Props>`
    position:absolute;
    width:100%;
    left:0;
    top:100%;
    background-color:white;
    box-shadow:0 2px 5px rgba(0,0,0,0.1);
    opacity:${(props)=>props.active?"1":"0"};
    transform:${(props)=>props.active?"translateY(0)":"translateY(-10px)"};
    pointer-events:${(props)=>props.active?"auto":"none"};
    transition: opacity 150ms ease-in, transform 150ms ease-in;
`;

export const Option = styled.div<OptionProps>`
    padding:5px;
    color:${(props)=>props.isDisable?"gray":"black"};
    &:hover {
        background-color:#eee;
        cursor: pointer;
    }
`;