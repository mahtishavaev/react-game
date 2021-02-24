import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useThunkDispatch } from "../../hooks/useThunkDispatch";
import {
  cardClicked,
  getGameBoard,
  loadFromLocalStorage,
  saveToLocalStorage,
  startNewGame,
} from "../../redux/gameBoardSlice";
import { fullScreenClicked, getGameStatus } from "../../redux/gameInfoSlice";
import { getMusicVolume, getSoundsVolume, areSettingsOpen } from "../../redux/settingsSlice";
import { correctSound, flipSound, music, victorySound } from "../../sound/sounds";
import { Container } from "../common/Container";
import { Card } from "./Card";
import { GameBar } from "./GameBar";
import { Settings } from "./Settings";

const GamePageInner = styled.div`
  background: #f0f0f0;
  padding-top: 50px;
`;

const GameBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;

const FinishMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  font-weight: 700;
  letter-spacing: 5px;
  color: #d02000;
`;

export const GamePage = () => {
  const cards = useSelector(getGameBoard);
  const gameStatus = useSelector(getGameStatus);
  const musicVolume = useSelector(getMusicVolume);
  const soundsVolume = useSelector(getSoundsVolume);
  const settings = useSelector(areSettingsOpen);

  const dispatch = useThunkDispatch();

  const GamePageRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    dispatch(loadFromLocalStorage());
    music.play();
    window.onbeforeunload = function () {
      dispatch(saveToLocalStorage());
    };
    return () => {
      music.stop();
    };
  }, []);

  useEffect(() => {
    music.volume(musicVolume);
    flipSound.volume(soundsVolume);
    correctSound.volume(soundsVolume);
    victorySound.volume(soundsVolume);
  }, [soundsVolume, musicVolume]);

  const onFullScreenClicked = () => {
    dispatch(fullScreenClicked(GamePageRef.current));
  };

  return (
    <GamePageInner ref={GamePageRef}>
      <Container>
        <GameBar onFullScreenClicked={onFullScreenClicked} />
        <GameBoard>
          {cards.map((card, index) => (
            <Card
              onClick={() => dispatch(cardClicked(index))}
              key={index}
              cardNumber={card.number}
              visible={card.visible}
              flipped={card.flipped}
            />
          ))}
          {gameStatus === "finished" && <FinishMessage>VICTORY!!!</FinishMessage>}
        </GameBoard>
      </Container>
      {settings && <Settings />}
    </GamePageInner>
  );
};
