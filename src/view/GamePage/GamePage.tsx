import styled from "styled-components";
import { Container } from "../common/Container";
import { Card } from "./Card";

const GameBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const cards = ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"];

export const GamePage = () => {
  return (
    <Container>
      <GameBoard>
        {cards.map((card, index) => (
          <Card key={card + index} cardNumber={card} />
        ))}
      </GameBoard>
    </Container>
  );
};
