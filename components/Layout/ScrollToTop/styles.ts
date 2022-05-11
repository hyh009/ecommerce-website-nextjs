import styled from "styled-components";
import { AiOutlineArrowUp } from "react-icons/ai";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 90vh;
  right: 20px;
  z-index: 200;
  cursor: pointer;
  border-radius: 50%;
  background-color: rgba(56, 236, 206, 0.5);
  padding:5px;
`;

export const Arrow = styled(AiOutlineArrowUp)`
   color: white;
   font-size: 1.875rem;
`;