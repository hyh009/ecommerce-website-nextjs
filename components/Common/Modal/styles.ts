import styled from "styled-components";
import {AiOutlineClose} from "react-icons/ai";
import { devices } from "../../../styles/responsive";
import {FlexCol, CenterContainer} from "../../Wrapper/styles";


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

export const CheckoutContainer = styled(ModalContainer)`
    min-width:65%;
    padding:20px 10px;
    @media ${devices.tablet}{
        width:80%;
    }
`;

export const Form = styled.form`
  padding:0 10px;
  display:flex;
  gap:10px;
  width:100%;
  @media ${devices.tablet}{
      flex-direction:column;
      padding:0 20px;
  }
`;

export const FormInner = styled(FlexCol)`
    padding:0;
`;

export const FormInnerRow = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-around;
    padding:0;
    flex-wrap:wrap;
    gap:10px;
    flex:1;
`;

export const Label = styled.label`
    letter-spacing:0.5px;
`;

export const PayImgContainer = styled.div`
  width: 150px;
  aspect-ratio: 24/9;
  position:relative ;
`;

export const PayName = styled.span`
  padding: 2px 5px;
  width: 100%;
  text-align: center;
  background-color: #e3f5e1;
`;

export const Method = styled(CenterContainer)`
  flex-direction: column;
  gap: 10px;
  min-width:180px;
  padding-bottom: 10px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  transition: 0.3s all ease;
  &:hover ${PayImgContainer} {
    transform: scale(1.05);
  }
  &:hover ${PayName} {
    background-color: #b7f5b0;
  }
`;