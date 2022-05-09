import styled from "styled-components";
import { devices } from "../../../styles/responsive";

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width:100%;
  @media ${devices.tablet}{
      flex-direction:column;
  }
`;
export const Filter = styled.div`
  display: flex;
  align-items: center;
  gap:10px;
  width:30%;
  &:nth-last-child(1) {
    justify-content:flex-end;
  }
  @media ${devices.tabletL}{
      width:40%;
  }
  @media ${devices.tablet}{
      margin:10px 0;
      width:100%;
      &:nth-last-child(1) {
      justify-content:flex-start;
    }
  }
  @media ${devices.mobile}{
      flex-direction:column;
      align-items:flex-start;
      margin:0;
  }
`;

export const FilterText = styled.span`
    white-space:nowrap;
    
  @media ${devices.mobile}{
        margin:10px 0;
    }
`;