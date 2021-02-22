import { Howler } from "howler";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useThunkDispatch } from "../../hooks/useThunkDispatch";
import { startNewGame } from "../../redux/gameBoardSlice";
import { getMovesCounterValue } from "../../redux/gameInfoSlice";
import { music } from "../../sound/sounds";

const GameBarInner = styled.div`
  display: flex;
  margin: 15px;
`;

const ButtonsWrapper = styled.div``;
const Button = styled.button`
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
const MovesCounter = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const MovesNumber = styled.span`
  border: 1px solid #000;
  background: #fff;
  font-size: 24px;
  text-align: center;
  padding: 2px 10px;
  margin-right: 5px;
`;
const MovesLabel = styled.span`
  font-size: 14px;
  font-weight: 700;
`;

export const GameBar = () => {
  const dispatch = useThunkDispatch();
  const movesCounter = useSelector(getMovesCounterValue);
  const [mute, setMute] = useState(true);
  useEffect(() => {
    Howler.mute(mute);
  }, [mute]);
  return (
    <GameBarInner>
      <ButtonsWrapper>
        <Button onClick={() => dispatch(startNewGame())}>New Game</Button>
        <Button>Full Screen</Button>
        <Button>Settings</Button>
        <Button onClick={() => setMute(!mute)}>{mute ? "Unmute" : "Mute"}</Button>
      </ButtonsWrapper>
      <MovesCounter>
        <MovesNumber>{movesCounter}</MovesNumber>
        <MovesLabel>MOVES</MovesLabel>
      </MovesCounter>
    </GameBarInner>
  );
};
