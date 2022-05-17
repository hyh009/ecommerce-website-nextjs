import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  border-radius: 10px;
  padding: 10px;
  justify-content:space-between;
`;

export const Title = styled.h4`
  font-size: 0.75rem;
  letter-spacing: 1px;
  color: #545454; 
`;

export const Content = styled.span`
  font-size: 1.25rem;
  text-align: center;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 1.25rem;
    color: #104646;
  }
`;

export const Desc = styled.span`
  font-size: 0.56rem;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 0.875rem;
    color: #fce149;
  }
`;
