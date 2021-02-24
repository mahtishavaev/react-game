import styled from "styled-components";

export const Button = styled.button`
  border: none;
  outline: none;
  background-color: #4a90e2;
  color: #ffffff;
  font-size: 14px;
  border-radius: 5px;
  padding: 10px 20px;
  min-width: 100px;
  cursor: pointer;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 0 10px 1px #808080;
  }
  & + & {
    margin-left: 10px;
  }
`;
