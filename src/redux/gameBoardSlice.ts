import { correctSound, flipSound, victorySound } from "../sound/sounds";
import {
  addFlippedCard,
  changeGameStatus,
  decreaseRemainingCardsNumber,
  increaseMovesCounterValue,
  resetFlippedCards,
  startGame,
} from "./gameInfoSlice";
import { AppDispatch, AppState } from "./store";

//types
type CardType = {
  number: string;
  flipped: boolean;
  visible: boolean;
};

export type GameBoardState = CardType[];

//init state
const initState: GameBoardState = [];

// reducer
export const gameBoardReducer = (state: GameBoardState = initState, action: GameBoardActions) => {
  switch (action.type) {
    case "gameBoard/setGameBoardData":
      return action.payload;
    case "gameBoard/flipAllCards":
      return state.map((card) => ({
        ...card,
        flipped: true,
      }));
    case "gameBoard/unFlipAllCards":
      return state.map((card) => ({
        ...card,
        flipped: false,
      }));
    case "gameBoard/flipCard":
      return state.map((card, i) => (action.payload === i ? { ...card, flipped: true } : card));
    case "gameBoard/unFlipCard":
      return state.map((card, i) => (action.payload === i ? { ...card, flipped: false } : card));
    case "gameBoard/hideCard":
      return state.map((card, i) => (action.payload === i ? { ...card, visible: false } : card));
    default:
      return state;
  }
};

//thunks
export const createGameBoard = (numberOfCards: number) => (dispatch: AppDispatch) => {
  let gameBoard: GameBoardState = [];
  let i = 0;
  while (i < numberOfCards / 2) {
    let cardNum = Math.ceil(Math.random() * 52).toString();
    if (gameBoard.some((el) => el.number === cardNum)) continue;
    gameBoard.push({
      number: cardNum,
      flipped: false,
      visible: true,
    });
    gameBoard.push({
      number: cardNum,
      flipped: false,
      visible: true,
    });
    i++;
  }

  gameBoard.sort(() => Math.random() - 0.5);
  dispatch(setGameBoardData(gameBoard));
};

export const cardClicked = (cardIndex: number) => (
  dispatch: AppDispatch,
  getState: () => AppState
) => {
  if (getState().gameInfo.gameStatus !== "started") return;
  const { flippedCards } = getState().gameInfo;
  const clickedCardNumber = getState().gameBoard[cardIndex].number;
  const { speed } = getState().settings;
  if (flippedCards.length === 0) {
    flipSound.play();
    dispatch(flipCard(cardIndex));
    dispatch(addFlippedCard({ number: clickedCardNumber, id: cardIndex }));
  } else if (flippedCards.length === 1) {
    flipSound.play();
    dispatch(flipCard(cardIndex));
    dispatch(addFlippedCard({ number: clickedCardNumber, id: cardIndex }));
    setTimeout(() => {
      const { flippedCards } = getState().gameInfo;
      if (flippedCards[0].number === flippedCards[1].number) {
        dispatch(hideCard(flippedCards[0].id));
        dispatch(hideCard(flippedCards[1].id));
        dispatch(decreaseRemainingCardsNumber());
        if (getState().gameInfo.cardsLeft === 0) {
          dispatch(changeGameStatus("finished"));
          victorySound.play();
        } else {
          correctSound.play();
        }
      }
      dispatch(unFlipAllCards());
      dispatch(resetFlippedCards());
      dispatch(increaseMovesCounterValue());
    }, speed);
  }
};

export const startNewGame = () => (dispatch: AppDispatch, getState: () => AppState) => {
  const { numberOfCards, speed, showCardsAtStart } = getState().settings;
  dispatch(changeGameStatus("starting"));
  dispatch(createGameBoard(numberOfCards));
  if (showCardsAtStart) {
    setTimeout(() => {
      dispatch(flipAllCards());
      setTimeout(() => {
        dispatch(unFlipAllCards());
        dispatch(startGame(numberOfCards));
      }, speed + 500);
    }, 500);
  } else {
    dispatch(startGame(numberOfCards));
  }
};

//actions
const setGameBoardData = (gameBoard: GameBoardState) =>
  ({ type: "gameBoard/setGameBoardData", payload: gameBoard } as const);

const flipAllCards = () => ({ type: "gameBoard/flipAllCards" } as const);

const unFlipAllCards = () => ({ type: "gameBoard/unFlipAllCards" } as const);

const flipCard = (index: number) => ({ type: "gameBoard/flipCard", payload: index } as const);

const unFlipCard = (index: number) => ({ type: "gameBoard/unFlipCard", payload: index } as const);

const hideCard = (index: number) => ({ type: "gameBoard/hideCard", payload: index } as const);

export type GameBoardActions =
  | ReturnType<typeof setGameBoardData>
  | ReturnType<typeof flipAllCards>
  | ReturnType<typeof unFlipAllCards>
  | ReturnType<typeof flipCard>
  | ReturnType<typeof unFlipCard>
  | ReturnType<typeof hideCard>;

//selectors
export const getGameBoard = (state: AppState) => state.gameBoard;
