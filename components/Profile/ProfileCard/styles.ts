import styled from "styled-components";
import { devices } from "../../../styles/responsive";
import { FlexRow } from "../../Wrapper/styles";

export const Container = styled.div`
    flex:1;
    box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
    border-radius:5px;
    margin:10px;
    overflow:hidden;
`;

export const Header = styled.div`
    position:relative;
`;

interface CoverImgProps {
    background:string;
}

export const CoverImg = styled.div<CoverImgProps>`
    width:100%;
    aspect-ratio:6/1;
    background-color:${(props)=>props.background};
`;

export const ImgContainer = styled.div`
    position:relative;
    top:30%;
    left:0;
    right:0;
    margin:auto;
    width: 100px;
    aspect-ratio:1/1;
    border-radius: 50%;
    overflow: hidden;
    @media ${devices.mobile}{
        width:80px;
    }
`;

export const CoverInput = styled.input`
    position: absolute;
    top:0;
    right:0;
`;

export const ColorButton = styled.button`
    position:absolute;
    border:none;
    right:0;
    bottom:0;
    border: 1px solid lightgray;
    border-radius: 5px;
    color: white;
    background-color: black;
    letter-spacing: 1px;
    padding: 5px;
    cursor: pointer;
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding:0 20px;
  margin-top:20px;
  @media ${devices.tabletL}{
      margin-top:50px;
  }
  @media ${devices.mobile}{
      margin-top:30px;
  }
`;

interface DetailProps {
    edit?:boolean;
}

export const Detail = styled.div<DetailProps>`
  display: flex;
  gap: 5px;
  padding: 10px 0;
  align-items: ${(props) => (props.edit ? "flex-start" : "center")};
  width: ${(props) => (props.edit ? "max-content" : "100%")};
  justify-content: space-between;
  flex-direction: ${(props) => (props.edit ? "column" : "row")};
`;


export const UserName = styled.span`
    font-size:1.125rem;
`;

export const CreatedDate = styled.span`
    color: gray;
    font-size: 0.875rem;
    letter-spacing:1px;
`;

export const ButtonContainer = styled(FlexRow)`
    width: 50%;
    justify-content:flex-end;
`;

export const EditBtn = styled.button`
  background-color: var(--primaryColor);
  height: max-content;
  padding: 2px 5px;
  border: none;
  border-radius: 10px;
  letter-spacing: 2px;
  cursor: pointer;
`;

export const Subtitle = styled.ul`
  color: gray;
  padding: 0;
  font-size: 0.875rem;
  padding: 10px 0;
  letter-spacing: 2px;
  border-bottom: 2px dashed lightgray;
`;

export const ContentContainer = styled.form`
    padding:0 20px;
`

export const ItemContainer = styled.div`
    display: flex;
    flex-direction:column;
    gap:5px;
    padding: 10px 0;
`;

