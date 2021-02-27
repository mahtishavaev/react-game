import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useThunkDispatch } from "../../hooks/useThunkDispatch";
import {
  cardClicked,
  getGameBoard,
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../../redux/gameBoardSlice";
import { getGameStatus } from "../../redux/gameInfoSlice";
import { getMusicVolume, getSoundsVolume, areSettingsOpen } from "../../redux/settingsSlice";
import { correctSound, flipSound, music, victorySound } from "../../sound/sounds";
import { Container } from "../common/Container";
import { Card } from "./Card";
import { GameBar } from "./GameBar";
import { Settings } from "./Settings";
import { WinModal } from "./WinModal";

const GamePageInner = styled.div`
  padding-top: 50px;
`;

const GameBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  box-shadow: 0 0 15px 1px #d8d5d5;
`;

export const GamePage = () => {
  const cards = useSelector(getGameBoard);
  const gameStatus = useSelector(getGameStatus);
  const musicVolume = useSelector(getMusicVolume);
  const soundsVolume = useSelector(getSoundsVolume);
  const settings = useSelector(areSettingsOpen);

  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(loadFromLocalStorage());
    music.play();
    window.onbeforeunload = function () {
      dispatch(saveToLocalStorage());
    };
    return () => {
      music.stop();
      dispatch(saveToLocalStorage());
    };
  }, []);

  useEffect(() => {
    music.volume(musicVolume);
    flipSound.volume(soundsVolume);
    correctSound.volume(soundsVolume);
    victorySound.volume(soundsVolume);
  }, [soundsVolume, musicVolume]);

  return (
    <GamePageInner>
      <Container>
        <GameBar />
        <GameBoard>
          {cards.map((card, index) => (
            <Card
              onClick={() => dispatch(cardClicked(index, true))}
              key={index}
              cardNumber={card.number}
              visible={card.visible}
              flipped={card.flipped}
            />
          ))}
          {gameStatus === "finished" && <WinModal />}
        </GameBoard>
      </Container>
      {settings && <Settings />}
    </GamePageInner>
  );
};
