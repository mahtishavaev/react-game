import React from "react";
import { FC } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getAutoplayStatus } from "../../redux/autoplaySlice";

const CardWrapper = styled.div<{ selected: boolean }>`
  width: 16.6666%;
  padding: 10px;
  perspective: 600px;
  ${(props) => props.selected && "box-shadow: 0 0 0 2px grey;"}
  @media (max-width: 991.98px) {
    padding: 5px;
  }
  @media (max-width: 767.98px) {
    width: 25%;
  }
`;

const CardItem = styled.div<{ flipped?: boolean; visible: boolean; clickable: boolean }>`
  margin: auto;
  width: 140px;
  height: 140px;
  position: relative;
  transition: transform 0.3s;
  transform-style: preserve-3d;
  border: 1px solid gray;
  ${(props) => props.clickable && "cursor: pointer;"}
  ${(props) => props.flipped && "transform: rotateY(180deg);"}
  ${(props) => !props.visible && "visibility: hidden;"}
  @media (max-width: 991.98px) {
    width: 110px;
    height: 110px;
  }
  @media (max-width: 767.98px) {
    width: 125px;
    height: 125px;
  }
  @media (max-width: 575.98px) {
    width: 100px;
    height: 100px;
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
  selected: boolean;
  onClick: () => void;
};

export const Card: FC<CardPropsType> = React.memo(
  ({ cardNumber, flipped, visible, selected, onClick }) => {
    const autoplay = useSelector(getAutoplayStatus);
    return (
      <CardWrapper selected={selected}>
        <CardItem flipped={flipped} visible={visible} clickable={!autoplay} onClick={onClick}>
          <CardImage
            draggable="false"
            type="front"
            src={`/assets/img/cards/image${cardNumber}.png`}
            alt={`card id: ${cardNumber}`}
          />
          <CardImage
            draggable="false"
            type="back"
            src={`/assets/img/cards/back.png`}
            alt={`back`}
          />
        </CardItem>
      </CardWrapper>
    );
  }
);
