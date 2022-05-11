import styled from "styled-components";

interface ContainerProps {
  border?: string;
}

interface IconContainerProps {
  color?:string;
}

interface LabelProps {
  require?:boolean;
}

export const InputContainer = styled.div<ContainerProps>`
    border: ${props=>props.border};
    display:flex;
    width:100%;
    align-items:center;
    padding:5px;
    gap:5px;
    background: rgba(255, 255, 255, 0.6);
    &:focus-within{
      box-shadow: 0px 0px 2px gray;
    }

`;

export const Label = styled.label<LabelProps>`
  font-size:1rem;
  &::after{
    content:"*";
    font-size:0.75rem;
    color:red;
    display:${(props)=>props.require? "inline-block":"none" }
  }
`

export const IconContainer = styled.div<IconContainerProps>`
  display: flex;
  align-items:center;
  justify-contents:center;
  color:${props=>props.color}
`;


export const TransparentInput = styled.input`
  flex:1;
  width:max(100%);
  border: none;
  padding: 5px;
  background:transparent ;
  letter-spacing:1px;
  font-size:1rem;

  &:focus{
    outline: none;
  }

`;


export const TransparentSelect = styled.select`
  flex:1;
  width:max(100%);
  border: none;
  padding: 5px 2px;
  background:transparent ;
  cursor: pointer;
  font-size:1rem;


`;

export const TransparentTextarea = styled.textarea`
  flex:1;
  width:max(100%);
  resize:none;
  border:none;
  font-size:1rem;
  padding:2px 5px;
  &:focus {
    outline: none;
  }
`;