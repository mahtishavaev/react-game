import { act } from "react-dom/test-utils";
import { AppDispatch, AppState } from "./store";

//types
type CardType = {
  number: string;
  id: number;
};

type GameStatusType = "init" | "starting" | "started" | "finished";

export type GameInfoState = {
  gameStatus: GameStatusType;
  flippedCards: CardType[];
  cardsLeft: number;
  movesCounter: number;
  fullScreen: boolean;
};

//initial state
const initState: GameInfoState = {
  gameStatus: "init",
  flippedCards: [],
  cardsLeft: 0,
  movesCounter: 0,
  fullScreen: false,
};

// reducer
export const gameInfoReducer = (
  state: GameInfoState = initState,
  action: GameInfoActions
): GameInfoState => {
  switch (action.type) {
    case "gameInfo/startGame":
      return {
        gameStatus: "started",
        flippedCards: [],
        cardsLeft: action.payload,
        movesCounter: 0,
        fullScreen: state.fullScreen,
      };
    case "gameInfo/addFlippedCard":
      return {
        ...state,
        flippedCards: [...state.flippedCards, action.payload],
      };
    case "gameInfo/resetFlippedCards":
      return {
        ...state,
        flippedCards: [],
      };
    case "gameInfo/decreaseRemainingCardsNumber":
      return {
        ...state,
        cardsLeft: state.cardsLeft - 2,
      };
    case "gameInfo/changeGameStatus":
      return { ...state, gameStatus: action.payload };
    case "gameInfo/increaseMovesCounterValue":
      return { ...state, movesCounter: state.movesCounter + 1 };
    case "gameInfo/changeFullScreenState":
      return { ...state, fullScreen: !state.fullScreen };
    default:
      return state;
  }
};

//thunks
export const fullScreenClicked = (ref: HTMLDivElement) => (
  dispatch: AppDispatch,
  getState: () => AppState
) => {
  const isFullScreen = getState().gameInfo.fullScreen;
  isFullScreen ? document.exitFullscreen() : ref.requestFullscreen();
  dispatch(changeFullScreenState());
};

//actions
export const startGame = (numberOfCards: number) =>
  ({ type: "gameInfo/startGame", payload: numberOfCards } as const);

export const addFlippedCard = (card: CardType) =>
  ({ type: "gameInfo/addFlippedCard", payload: card } as const);

export const resetFlippedCards = () => ({ type: "gameInfo/resetFlippedCards" } as const);

export const decreaseRemainingCardsNumber = () =>
  ({ type: "gameInfo/decreaseRemainingCardsNumber" } as const);

export const changeGameStatus = (status: GameStatusType) =>
  ({ type: "gameInfo/changeGameStatus", payload: status } as const);

export const increaseMovesCounterValue = () =>
  ({ type: "gameInfo/increaseMovesCounterValue" } as const);

const changeFullScreenState = () => ({ type: "gameInfo/changeFullScreenState" } as const);

export type GameInfoActions =
  | ReturnType<typeof startGame>
  | ReturnType<typeof addFlippedCard>
  | ReturnType<typeof resetFlippedCards>
  | ReturnType<typeof decreaseRemainingCardsNumber>
  | ReturnType<typeof changeGameStatus>
  | ReturnType<typeof increaseMovesCounterValue>
  | ReturnType<typeof changeFullScreenState>;

//selectors
export const getGameStatus = (state: AppState) => state.gameInfo.gameStatus;
export const getMovesCounterValue = (state: AppState) => state.gameInfo.movesCounter;
export const getFullScreenState = (state: AppState) => state.gameInfo.fullScreen;
