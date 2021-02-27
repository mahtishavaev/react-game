import { Howler } from "howler";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useThunkDispatch } from "../../hooks/useThunkDispatch";
import { startAutoplay } from "../../redux/autoplaySlice";
import { startNewGame } from "../../redux/gameBoardSlice";
import {
  fullScreenClicked,
  getFullScreenState,
  getMovesCounterValue,
} from "../../redux/gameInfoSlice";
import { areSoundsMute, muteSounds, openSettings } from "../../redux/settingsSlice";
import { Button } from "../common/Button";
import { FullScreenExitIcon, FullScreenIcon, SoundsIcon, SoundsMuteIcon } from "../icons/icons";
import { Timer } from "./Timer";

const GameBarInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 15px 10px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MovesCounter = styled.div`
  margin-left: 10px;
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
  cursor: default;
`;

const MovesLabel = styled.span`
  font-size: 14px;
  font-weight: 700;
`;

const Icon = styled.svg`
  width: 40px;
  height: 40px;
  margin-left: 10px;
  padding: 4px;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  fill: #1a1a1a;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const GameBar = () => {
  const movesCounter = useSelector(getMovesCounterValue);
  const isFullScreen = useSelector(getFullScreenState);
  const mute = useSelector(areSoundsMute);

  const dispatch = useThunkDispatch();

  useEffect(() => {
    Howler.mute(mute);
  }, [mute]);

  return (
    <GameBarInner>
      <ButtonsWrapper>
        <Button onClick={() => dispatch(startNewGame())}>New Game</Button>
        <Button onClick={() => dispatch(startAutoplay())}>Autoplay</Button>
        <Button onClick={() => dispatch(openSettings())}>Settings</Button>
        {mute ? (
          <Icon as={SoundsMuteIcon} onClick={() => dispatch(muteSounds(false))} />
        ) : (
          <Icon as={SoundsIcon} onClick={() => dispatch(muteSounds(true))} />
        )}
        {isFullScreen ? (
          <Icon as={FullScreenExitIcon} onClick={() => dispatch(fullScreenClicked())} />
        ) : (
          <Icon as={FullScreenIcon} onClick={() => dispatch(fullScreenClicked())} />
        )}
      </ButtonsWrapper>
      <Timer />
      <MovesCounter>
        <MovesNumber>{movesCounter}</MovesNumber>
        <MovesLabel>MOVES</MovesLabel>
      </MovesCounter>
    </GameBarInner>
  );
};
