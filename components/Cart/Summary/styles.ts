import styled from "styled-components";
import { devices } from "../../../styles/responsive";

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 60vh;
  border: 0.5px solid lightgray;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
  filter: drop-shadow(0px 0px 5px rgba(122, 122, 122, 0.5));
  justify-content: space-between;
  @media ${devices.tabletL}{
      min-height:300px;
      height: 30vh;
  };
  @media ${devices.tablet}{
      margin-top:20px;
  }
`;

export const SummaryTitle = styled.span`
  font-size: 1.75rem;
  letter-spacing: 2px;
  align-self: center;
`;


export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  
  &:hover {
    background-color: #eee;
  }
`;

interface ItemProps {
  type?:"total";
}

export const SummaryItemText = styled.span<ItemProps>`
  color: ${(props) => (props.type === "total" ? "teal" : "black")};
  font-size: ${(props) => (props.type === "total" ? "1.375rem" : "1.125rem")};
  font-weight: ${(props) => (props.type === "total" ? "600" : "400")};
`;

export const SummaryItemPrice = styled.span<ItemProps>`
  color: ${(props) => (props.type === "total" ? "teal" : "black")};
  font-size: ${(props) => (props.type === "total" ? "1.375rem" : "1.125rem")};
  font-weight: ${(props) => (props.type === "total" ? "600" : "400")};
`;
