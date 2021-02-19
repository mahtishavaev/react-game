import { increaseFlippedCardsCount, resetFlippedCardsCount, startGame } from "./gameInfoSlice";
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
      return state.map((card, i) => {
        return action.payload === i ? { ...card, flipped: true } : card;
      });
    default:
      return state;
  }
};

//thunks
export const createGameBoard = (cardsCount: number) => (dispatch: AppDispatch) => {
  let gameBoard: GameBoardState = [];
  for (let i = 0; i < cardsCount / 2; i++) {
    let cardNum = Math.ceil(Math.random() * 52).toString();
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
  }
  gameBoard.sort(() => Math.random() - 0.5);
  dispatch(setGameBoardData(gameBoard));
};

export const cardClicked = (cardIndex: number) => (
  dispatch: AppDispatch,
  getState: () => AppState
) => {
  const isStarted = getState().gameInfo.isStarted;
  if (!isStarted) return;
  const flippedCardsCount = getState().gameInfo.flippedCardsCount;
  if (flippedCardsCount === 0) {
    dispatch(flipCard(cardIndex));
    dispatch(increaseFlippedCardsCount());
  } else if (flippedCardsCount === 1) {
    dispatch(flipCard(cardIndex));
    dispatch(increaseFlippedCardsCount());
    setTimeout(() => {
      dispatch(resetFlippedCardsCount());
      dispatch(unFlipAllCards());
    }, 2500);
  }
};

export const startNewGame = () => (dispatch: AppDispatch) => {
  const cardsCount = 18;
  dispatch(createGameBoard(cardsCount));
  dispatch(startGame(cardsCount));
};

//actions
const setGameBoardData = (gameBoard: GameBoardState) =>
  ({ type: "gameBoard/setGameBoardData", payload: gameBoard } as const);

const flipAllCards = () => ({ type: "gameBoard/flipAllCards" } as const);

const unFlipAllCards = () => ({ type: "gameBoard/unFlipAllCards" } as const);

const flipCard = (index: number) => ({ type: "gameBoard/flipCard", payload: index } as const);

export type GameBoardActions =
  | ReturnType<typeof setGameBoardData>
  | ReturnType<typeof flipAllCards>
  | ReturnType<typeof unFlipAllCards>
  | ReturnType<typeof flipCard>;

//selectors
export const getGameBoard = (state: AppState) => state.gameBoard;
