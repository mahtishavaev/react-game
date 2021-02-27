import { FC } from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  width: 16.6666%;
  padding: 10px;
  perspective: 600px;
  @media (max-width: 991.98px) {
    padding: 5px;
  }
  @media (max-width: 767.98px) {
    width: 33.3333%;
  }
`;

const CardItem = styled.div<{ flipped?: boolean; visible: boolean }>`
  margin: auto;
  width: 140px;
  height: 140px;
  position: relative;
  transition: transform 0.3s;
  transform-style: preserve-3d;
  border: 1px solid gray;
  cursor: pointer;
  ${(props) => props.flipped && "transform: rotateY(180deg);"}
  ${(props) => !props.visible && "visibility: hidden;"}
  @media (max-width: 991.98px) {
    width: 110px;
    height: 110px;
  }
  @media (max-width: 767.98px) {
    width: 170px;
    height: 170px;
  }
  @media (max-width: 575.98px) {
    width: 140px;
    height: 140px;
  }
`;

const CardImage = styled.img<{ type: "front" | "back" }>`
  backface-visibility: hidden;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  ${(props) => props.type === "front" && "transform: rotateY(180deg);"}
`;

type CardPropsType = {
  cardNumber: string;
  flipped: boolean;
  visible: boolean;
  onClick: () => void;
};

export const Card: FC<CardPropsType> = ({ cardNumber, flipped, visible, onClick }) => {
  return (
    <CardWrapper>
      <CardItem flipped={flipped} visible={visible} onClick={onClick}>
        <CardImage
          draggable="false"
          type="front"
          src={`/assets/img/cards/image${cardNumber}.png`}
          alt={`card id: ${cardNumber}`}
        />
        <CardImage draggable="false" type="back" src={`/assets/img/cards/back.png`} alt={`back`} />
      </CardItem>
    </CardWrapper>
  );
};
