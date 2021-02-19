import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useThunkDispatch } from "../../hooks/useThunkDispatch";
import { cardClicked, getGameBoard, startNewGame } from "../../redux/gameBoardSlice";
import { Container } from "../common/Container";
import { Card } from "./Card";

const GameBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const GamePage = () => {
  const cards = useSelector(getGameBoard);
  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(startNewGame());
  }, []);

  return (
    <Container>
      <GameBoard>
        {cards.map((card, index) => (
          <Card
            onClick={() => dispatch(cardClicked(index))}
            key={card.number + index}
            cardNumber={card.number}
            visible={card.visible}
            flipped={card.flipped}
          />
        ))}
      </GameBoard>
    </Container>
  );
};
