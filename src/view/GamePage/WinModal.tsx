import styled from "styled-components";
import { useThunkDispatch } from "../../hooks/useThunkDispatch";
import { startNewGame } from "../../redux/gameBoardSlice";
import { Button } from "../common/Button";

const WinWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  margin: auto;
  padding: 40px 20px;
  text-align: center;
`;

const WinMessage = styled.p`
  text-align: center;
  margin-bottom: 20px;
  font-size: 36px;
`;

export const WinModal = () => {
  const dispatch = useThunkDispatch();
  return (
    <WinWrapper>
      <WinMessage>You won!</WinMessage>
      <Button onClick={() => dispatch(startNewGame())}>Play again</Button>
    </WinWrapper>
  );
};
