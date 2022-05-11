import styled from "styled-components";
import {AiOutlineClose} from "react-icons/ai";
import { devices } from "../../../styles/responsive";


// modal
export const ModalContainer = styled.dialog`
    width:max(300px,35%);
    min-height:200px;
    border:none;
    position: fixed;
    left: 50%;
    top: 50%;
    border-radius:10px;
    overflow:hidden;
    transform: translate(-50%, -50%);
    flex-direction:column;
    align-items:center;
    justify-contents:space-between;
    transition:0.4s;
    z-index:5;

    &[open]{
        display:flex;
    }

    &::backdrop{
        background: rgba(0,0,0,.8);
    }

    @media ${devices.mobile}{
        width:max(300px,90%);
    }
`;

export const CloseIcon = styled(AiOutlineClose)`
     position: absolute;
        top:5px;
        right:5px;
        font-size:1.5rem;
        color:gray;
        cursor:pointer;
`;

export const ContentWrapper = styled.div`
    display:flex ;
    flex-direction:column;
    align-items:center;
    margin:auto;
    gap:30px;
    width:100%;
    padding:10px;

`;

export const ModalHeader = styled.div`
    display:flex;
    align-items:center;
    background:var(--primaryColor);
    border-top-right-radius:5px;
    border-top-left-radius:5px;
    font-size:1rem;
    text-shadow:0,0,3px,var(--darkGray);
    height:35px;
    width: 100%;
    letter-spacing:1.5px;
    padding:2px 10px;
    color:white;
    text-shadow:0 0 3px black;
    user-select:none;

`

export const Text = styled.span`
    font-size:1.125rem;
    letter-spacing:1.5px;
    user-select:none;
    text-align:center;
`;

export const AddCartContainer = styled(ModalContainer)`
    width:auto ;
    padding:20px 10px;
    @media ${devices.tablet}{
        width:80%;
        padding-bottom:0px;
    }
`;