import { Howler } from "howler";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useThunkDispatch } from "../../hooks/useThunkDispatch";
import { startAutoplay } from "../../redux/autoplaySlice";
import { startNewGame } from "../../redux/gameBoardSlice";
import { getFullScreenState, getMovesCounterValue } from "../../redux/gameInfoSlice";
import { areSoundsMute, muteSounds, openSettings } from "../../redux/settingsSlice";
import { music } from "../../sound/sounds";
import { Button } from "../common/Button";

const GameBarInner = styled.div`
  display: flex;
  margin: 15px;
`;

const ButtonsWrapper = styled.div``;
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

type GameBarPropsTypes = {
  onFullScreenClicked: () => void;
};

export const GameBar: FC<GameBarPropsTypes> = ({ onFullScreenClicked }) => {
  const movesCounter = useSelector(getMovesCounterValue);
  const isFullScreen = useSelector(getFullScreenState);
  const mute = useSelector(areSoundsMute);

  const dispatch = useThunkDispatch();

  // const [mute, setMute] = useState(true);

  useEffect(() => {
    Howler.mute(mute);
  }, [mute]);

  return (
    <GameBarInner>
      <ButtonsWrapper>
        <Button onClick={() => dispatch(startNewGame())}>New Game</Button>
        <Button onClick={() => dispatch(startAutoplay())}>Autoplay</Button>
        <Button onClick={onFullScreenClicked}>
          {isFullScreen ? "Normal Screen" : "Full Screen"}
        </Button>
        <Button onClick={() => dispatch(openSettings())}>Settings</Button>
        <Button onClick={() => dispatch(muteSounds(!mute))}>{mute ? "Unmute" : "Mute"}</Button>
      </ButtonsWrapper>
      <MovesCounter>
        <MovesNumber>{movesCounter}</MovesNumber>
        <MovesLabel>MOVES</MovesLabel>
      </MovesCounter>
    </GameBarInner>
  );
};
