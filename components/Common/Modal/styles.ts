import styled from "styled-components";
import { devices } from "../../../styles/responsive";
import { scaleUp } from "../../../styles/animation";


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
    opacity:0;
    transition:1s;

    &[open]{
        display: flex;
    }

    &::backdrop{
        background: rgba(0,0,0,.8);
    }
    svg {
        position: absolute;
        top:2px;
        right:2px;
        font-size:1.5rem;
        color:white;
        cursor:pointer;
    }

    @media ${devices.mobile}{
        width:max(300px,90%);
    }
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
