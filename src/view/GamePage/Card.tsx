import { FC } from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  width: 16.6666%;
  padding: 10px 15px;
  perspective: 600px;
`;

const CardItem = styled.div<{ flipped?: boolean; visible: boolean }>`
  padding-top: 125%;
  position: relative;
  transition: transform 0.5s;
  transform-style: preserve-3d;
  cursor: pointer;
  ${(props) => props.flipped && "transform: rotateY(180deg);"}
  ${(props) => !props.visible && "visibility: hidden;"}
`;

const CardImage = styled.img<{ type: "front" | "back" }>`
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
          src={`/assets/img/playing-cards/${cardNumber}.png`}
          alt={`card id: ${cardNumber}`}
        />
        <CardImage
          draggable="false"
          type="back"
          src={`/assets/img/playing-cards/back.png`}
          alt={`back`}
        />
      </CardItem>
    </CardWrapper>
  );
};
