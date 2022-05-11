import styled from "styled-components";
import {devices} from "../../styles/responsive"

interface WrapperProps {
    pdRL?:string;
    gap?:string;
    gapM?:string;
    gapT?:string;
    gapTL?:string;
}

interface ContainerProps {
    fill?:boolean;
}

export const CenterContainer = styled.div<ContainerProps>`
    display: flex;
    align-items:center;
    justify-content:center;
    width:${(props)=>props.fill?"100%":"auto"};
    height:${(props)=>props.fill?"100vh":"auto"};
`


export const FlexRow = styled.div<WrapperProps>`
    display:flex;
    align-items:center;
    gap:${(props)=>props.gap?props.gap:"10px"};
    @media ${devices.tabletL}{
      gap:${(props)=>props.gapTL?props.gapTL:"10px"};
    }
`

export const FlexRowTCol = styled.div<WrapperProps>`
    display:flex;
    align-items:center;
    gap:${(props)=>props.gap?props.gap:"10px"};
    @media ${devices.tablet}{
        flex-direction:column;
        gap:${(props)=>props.gapTL?props.gapTL:"10px"};
    }
`

export const FlexRowMCol = styled.div<WrapperProps>`
    display:flex;
    align-items:center;
    gap:${(props)=>props.gap?props.gap:"10px"};
    @media ${devices.mobile}{
        flex-direction:column;
    }
    @media ${devices.mobile}{
        gap:${(props)=>props.gapM?props.gapM:"10px"};
        align-items:flex-start;
      }
`

export const FlexCol = styled.div`
    width:100%;
    gap:10px;
    display:flex;
    flex-direction:column;
`;


export const FlexBetween = styled.div`
    display:flex;
    justify-content:space-between;
`;


export const HomeSession = styled.div`
    padding:20px 0;
`
// grid
// desktop: 2 col & tablet: 1 col;
export const Col2T1Wrapper = styled.div`
    display: grid;
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:10px;
    @media ${devices.tablet}{
        grid-template-columns:repeat(1,minmax(0,1fr));
    }
`;

export const Col3T1Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0,1fr));
    width: 100%;
    padding: 20px;
    gap: 20px;
    @media ${devices.mobile}{
        grid-template-columns:repeat(1,minmax(0,1fr));
        gap: 50px;
    }
`;

export const Col4T3M2Wrapper = styled.div<WrapperProps>`
    display:grid;
    grid-template-columns:repeat(4,minmax(0,1fr));
    gap:10px;
    padding:0px ${(props)=>props.pdRL?props.pdRL:0};
    @media ${devices.tablet}{
        grid-template-columns:repeat(3,minmax(0,1fr));
    }
    @media ${devices.mobile}{
        grid-template-columns:repeat(2,minmax(0,1fr));
    }
`;