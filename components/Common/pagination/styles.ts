import styled from "styled-components";

export const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width: 100%;
`;

interface BlockProps {
    active:boolean;
}

export const Block = styled.div<BlockProps>`
    display:flex;
    align-items:center;
    justify-content:center;
    width:35px;
    aspect-ratio:1/1;
    background-color:${(props)=>props.active?"#eee" :"#ffffffee"};
    box-shadow:0 0 5px 1px #eee;
    cursor:pointer;
    &:hover{
        background-color:#eee ;
    }   

`;