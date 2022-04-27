import styled from "styled-components";
import {devices} from "../../styles/responsive"



// desktop: 2 col & tablet: 1 col;
export const Col2T1Wrapper = styled.div`
    display: grid;
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:10px;
    @media ${devices.tablet}{
        grid-template-columns:repeat(1,minmax(0,1fr));
    }
`;