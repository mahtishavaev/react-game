import { correctSound, flipSound, victorySound } from "../sound/sounds";
import { setAutoplayStatus } from "./autoplaySlice";
import {
  addFlippedCard,
  changeGameStatus,
  decreaseRemainingCardsNumber,
  increaseMovesCounterValue,
  resetFlippedCards,
  resumeTimer,
  setGameInfoData,
  startGame,
  startTimer,
  stopTimer,
} from "./gameInfoSlice";
import { setSettings } from "./settingsSlice";
import { addStatisticRecord, setStatistic } from "./statisticSlice";
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
    let cardNum = Math.ceil(Math.random() * 54).toString();
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

export const cardClicked = (cardIndex: number, fromUser: boolean) => (
  dispatch: AppDispatch,
  getState: () => AppState
) => {
  if (getState().gameInfo.gameStatus !== "started") return;
  if (getState().autoplay.autoplay && fromUser) return;
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
          dispatch(stopTimer());
          const { gameInfo } = getState();
          const { settings } = getState();
          if (!getState().autoplay.autoplay) {
            dispatch(
              addStatisticRecord({
                date: new Date(),
                moves: gameInfo.movesCounter + 1,
                numberOfCards: settings.numberOfCards,
                speed: settings.speed,
                timeSpent: gameInfo.timerValue,
              })
            );
          }
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
  dispatch(stopTimer());
  dispatch(createGameBoard(numberOfCards));
  if (showCardsAtStart) {
    setTimeout(() => {
      dispatch(flipAllCards());
      setTimeout(() => {
        dispatch(unFlipAllCards());
        dispatch(startGame(numberOfCards));
        dispatch(startTimer());
      }, speed + 500);
    }, 500);
  } else {
    dispatch(startGame(numberOfCards));
    dispatch(startTimer());
  }
};

export const saveGameBoardToLocalStorage = () => (
  dispatch: AppDispatch,
  getState: () => AppState
) => {
  const { gameBoard } = getState();
  if (getState().autoplay.autoplay) {
    localStorage.removeItem("ms-game-board");
    dispatch(setAutoplayStatus(false));
  } else {
    localStorage.setItem("ms-game-board", JSON.stringify(gameBoard));
  }
};

export const loadGameBoardFromLocalStorage = () => (dispatch: AppDispatch) => {
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

const hideCard = (index: number) => ({ type: "gameBoard/hideCard", payload: index } as const);

export type GameBoardActions =
  | ReturnType<typeof setGameBoardData>
  | ReturnType<typeof flipAllCards>
  | ReturnType<typeof unFlipAllCards>
  | ReturnType<typeof flipCard>
  | ReturnType<typeof hideCard>;

//selectors
export const getGameBoard = (state: AppState) => state.gameBoard;
