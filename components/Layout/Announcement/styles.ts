import styled from "styled-components";
import { devices } from "../../../styles/responsive";
import { moving } from "../../../styles/animation";

export const Container = styled.div`
  height: 30px;
  width: 100%;
  background-color: #ffa122;
  position: relative;
  overflow: hidden;
  @media ${devices.mobile}{
      display:none;
  }
`;

export const Text = styled.div`
  display: flex;
  align-items:center;
  gap:3px;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  text-shadow:0 0 1px var(--darkGray);
  position: absolute;
  top: 5px;
  right: 0;
  animation: ${moving} 20s linear;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  white-space: nowrap;
  letter-spacing:1px;
`;