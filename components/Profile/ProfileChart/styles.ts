import styled from "styled-components";
import { devices } from "../../../styles/responsive";

export const Container = styled.div`
  padding: 10px;
  width: 100%;
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  border-radius: 5px;
  flex: 2;
  @media ${devices.tabletL}{
      min-height:200px;
  }
`;