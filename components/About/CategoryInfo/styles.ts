import styled from "styled-components";
import {devices} from "../../../styles/responsive";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0,1fr));
  width: 100%;
  padding: 20px;
  gap: 5px;
  @media ${devices.tabletL}{
      grid-template-columns: repeat(3, minmax(0,1fr));
  }
`;

export const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

export const ImgContainer = styled.div`
  position:relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  opacity: 0.8;
  filter: brightness(70%);
  cursor: pointer;
`;

export const CardContainer = styled.div`
  padding: 2px;
  height: 70vh;
  width: 100%;
  position: relative;
  @media ${devices.tabletL}{
      height:40vh;
  }
  cursor:pointer;
  perspective: 1000px;

  &:hover ${ImgContainer} {
    filter: brightness(50%);
  }
  &:hover ${FlipCardInner} {
    transform: rotateY(180deg);
  }
`;

export const FlipCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  user-select: none;
`;

export const FlipCardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background-color: black;
  transform: rotateY(180deg);
  user-select: none;
`;

export const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 5px;
`;

export const Title = styled.h3`
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing: 10px;
  color: white;
  user-select: none;
  text-shadow: 2px 2px 4px #000000;
  font-size: 5vmin;
`;

export const Name = styled.h3`
  font-size: 4vmin;
  font-weight: bold;
  letter-spacing: 2px;
  color: white;
  @media ${devices.tabletL}{
      font-size:3vmin;
  }
`;
export const Desc = styled.span`
  color: white;
  font-size: 3vmin;
  line-height: 150%;
`;