import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useThunkDispatch } from "../../hooks/useThunkDispatch";
import { cardClicked, getGameBoard, startNewGame } from "../../redux/gameBoardSlice";
import { getGameStatus } from "../../redux/gameInfoSlice";
import { music } from "../../sound/sounds";
import { Container } from "../common/Container";
import { Card } from "./Card";
import { GameBar } from "./GameBar";

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
  letter-spacing: 5px;
  color: #d02000;
`;

export const GamePage = () => {
  const cards = useSelector(getGameBoard);
  const gameStatus = useSelector(getGameStatus);
  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(startNewGame());
    music.play();
  }, []);

  return (
    <Container>
      <GameBar />
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
  );
};
