import styled from "styled-components";
import { devices } from "../../../styles/responsive";

export const Container = styled.div`
position:relative;
`

export const UserContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  @media ${devices.tabletL}{
    grid-template-columns: repeat(1,1fr);
  }
`;