import styled from "styled-components";
import { devices } from "../../../styles/responsive";
import { FlexCol } from '../../Wrapper/styles';
import {open} from "../../../styles/animation";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  &.slideOut {
    animation: ${open};
    animation-duration: 3s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  }
`;
interface CoverImgContainerProps {
    isLoading:boolean;
}

export const CoverImgContainer = styled.div<CoverImgContainerProps>`
  display: flex;
  width: 100%;
  height: ${(props) => (props.isLoading ? "0px" : "100vh")};
  justify-content: center;
  align-items: center;
  position: relative;
  opacity:0.9;
`;

export const CoverText = styled.div`
  font-weight: 500;
  letter-spacing: 8px;
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;
  margin: auto;
  writing-mode: vertical-rl;
  color: white;
  user-select: none;
  width: max-content;
`;

export const Click = styled.button`
  border:none;
  font-family: "Koulen", cursive;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 10%;
  text-align: center;
  cursor: pointer;
  font-size: 6.5vmin;
  font-weight: 950;
  padding: 5px;
  width: max-content;
  letter-spacing:5px;
  background-image:linear-gradient(135deg, rgba(255,255,255,1) 20%,rgba(180,180,180,1) 54%, rgba(255,255,255,1) 78%);
  background-clip:text;
  background-size:200%;
  background-position: right;
  color: rgba(160,160,160,.0.6);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  -webkit-text-stroke-width: 0.3px;
  -webkit-text-stroke-color: rgba(0,0,0,0.7);
  user-select:none;
  transition:translateY 0.1s, background-position 1s;
  &:hover{
    background-position: left;
  }
  &:focus{
    background-position: left;
    outline:none;
  }
  @media ${devices.tabletL}{
      font-size:10vmin;
      bottom: 5%;
  }
  @media ${devices.mobile}{
      font-size:10vmin;
      bottom: 15%;
  }
`;

export const LoaderContainer = styled(FlexCol)`
  height:100vh;
  align-items:center;
  justify-content:center;
  gap:20px;
`;