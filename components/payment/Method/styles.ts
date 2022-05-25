import styled from "styled-components";
import { devices } from "../../../styles/responsive";

export const Temp = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 3.5vmin;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: white;
  letter-spacing: 1px;
  display: none;
  z-index:1;
  @media ${devices.mobile}{
      font-size:5vmin;
  }
`;

export const MethodContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  position: relative;
  transition: 0.5s all ease;
  cursor:pointer;
  &:hover ${Temp} {
    display: flex;
  }
  &:hover {
    transform: scale(1.05);
  }
  @media ${devices.tabletL}{
      gap:30px;
  }
`;

export const Subtitle = styled.span`
  font-size: 3.5vmin;
  @media ${devices.mobile}{
      font-size:5vmin;
  }
`;

export const ImageContainer = styled.div`
  overflow: hidden;
  position: relative;
  height: 30vh;
  aspect-ratio: 4/3;
  @media ${devices.mobile}{
      height:40vw;
  }
`;

export const Link = styled.a`
  text-decoration: none;
  background-color: var(--secondaryColor);
  padding: 2px 10px;
  color: white;
  border-radius: 10px;
  letter-spacing: 1px;
  font-size: 4vmin;
  height: max-content;
`;
