import styled from "styled-components";
import { devices } from "../../../styles/responsive";
import {AiFillHeart} from "react-icons/ai"

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--beige);
  padding:20px 10px;
  gap:10px;
  flex-direction: column;
  box-shadow:2px 2px 4px rgba(0,0,0,0.3);
`;

export const Title = styled.span`
  font-size: 1rem;
  font-weight: 200;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 70%;
`;


export const ImageContainer = styled.div`
  overflow: hidden;
  display: flex;
  width: 95%;
  aspect-ratio:1;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 3px 1px white;
  position:relative;
`;


export const Info = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: all 0.5s ease;
  &:hover {
    opacity: 1;
  }
`;

export const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  cursor: pointer;
  font-size:1.5rem;
  &:hover {
    transform: scale(1.1);
    background-color: #f6f0fa;
  }
`;


export const LikeIcon = styled(AiFillHeart)`
  color:black;
  &:hover{
    color:red;
  }
`;