import styled from "styled-components";

export const Button = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  outline: none;
  background-color: #fff;
  color: #1a1a1a;
  font-size: 16px;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
  padding: 10px 20px;
  min-width: 80px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
  & + & {
    margin-left: 10px;
  }
`;
