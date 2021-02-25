import { correctSound, flipSound, victorySound } from "../sound/sounds";
import {
  addFlippedCard,
  changeGameStatus,
  decreaseRemainingCardsNumber,
  increaseMovesCounterValue,
  resetFlippedCards,
  setGameInfoData,
  startGame,
} from "./gameInfoSlice";
import { setSettings } from "./settingsSlice";
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
  const clickedCard = getState().gameBoard[cardIndex];
  if (clickedCard.flipped || !clickedCard.visible) return;
  const { flippedCards } = getState().gameInfo;
  const clickedCardNumber = clickedCard.number;
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

export const saveToLocalStorage = () => (dispatch: AppDispatch, getState: () => AppState) => {
  const { gameBoard } = getState();
  const { cardsLeft, flippedCards, gameStatus, movesCounter } = getState().gameInfo;
  const { musicVolume, soundsVolume, numberOfCards, speed, showCardsAtStart } = getState().settings;
  localStorage.setItem("ms-game-board", JSON.stringify(gameBoard));
  localStorage.setItem(
    "ms-game-info",
    JSON.stringify({ cardsLeft, flippedCards, gameStatus, movesCounter })
  );
  localStorage.setItem(
    "ms-game-settings",
    JSON.stringify({ musicVolume, soundsVolume, numberOfCards, speed, showCardsAtStart })
  );
};

export const loadFromLocalStorage = () => (dispatch: AppDispatch) => {
  const lsSettings = localStorage.getItem("ms-game-settings");
  if (lsSettings !== null) {
    const { musicVolume, soundsVolume, numberOfCards, speed, showCardsAtStart } = JSON.parse(
      lsSettings
    );
    dispatch(setSettings(musicVolume, soundsVolume, numberOfCards, speed, showCardsAtStart));
  }
  const lsGameInfo = localStorage.getItem("ms-game-info");
  if (lsGameInfo !== null) {
    const { cardsLeft, flippedCards, gameStatus, movesCounter } = JSON.parse(lsGameInfo);
    dispatch(setGameInfoData(cardsLeft, flippedCards, gameStatus, movesCounter));
  }
  const lsGameBoard = localStorage.getItem("ms-game-board");
  if (lsGameBoard !== null) {
    const gameBoard = JSON.parse(lsGameBoard);
    dispatch(setGameBoardData(gameBoard));
  } else {
    dispatch(startNewGame());
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
