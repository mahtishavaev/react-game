import { act } from "react-dom/test-utils";
import { AppDispatch, AppState } from "./store";

//types
type CardType = {
  number: string;
  id: number;
};

type GameStatusType = "init" | "starting" | "started" | "finished";

type TimerStatusType = "started" | "stopped";

export type GameInfoState = {
  gameStatus: GameStatusType;
  flippedCards: CardType[];
  cardsLeft: number;
  movesCounter: number;
  fullScreen: boolean;
  timerValue: number;
  timerStatus: TimerStatusType;
};

//initial state
const initState: GameInfoState = {
  gameStatus: "init",
  flippedCards: [],
  cardsLeft: 0,
  movesCounter: 0,
  fullScreen: false,
  timerValue: 0,
  timerStatus: "stopped",
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
        timerValue: 0,
        timerStatus: "stopped",
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
    case "gameInfo/setGameInfoData":
      return {
        ...state,
        cardsLeft: action.payload.cardsLeft,
        flippedCards: action.payload.flippedCards,
        gameStatus: action.payload.gameStatus,
        movesCounter: action.payload.movesCounter,
        timerStatus: action.payload.timerStatus,
        timerValue: action.payload.timerValue,
      };
    case "gameInfo/setTimerStatus":
      return { ...state, timerStatus: action.payload };
    case "gameInfo/timerTick":
      return { ...state, timerValue: state.timerValue + 1 };
    default:
      return state;
  }
};

//thunks
export const fullScreenClicked = () => (dispatch: AppDispatch, getState: () => AppState) => {
  const isFullScreen = getState().gameInfo.fullScreen;
  isFullScreen ? document.exitFullscreen() : document.documentElement.requestFullscreen();
  dispatch(changeFullScreenState());
};

let interval: NodeJS.Timeout;

export const startTimer = () => (dispatch: AppDispatch, getState: () => AppState) => {
  dispatch(setTimerStatus("started"));
  interval = setInterval(() => {
    if (getState().gameInfo.timerStatus === "stopped") clearInterval(interval);
    dispatch(timerTick());
  }, 1000);
};

export const stopTimer = () => (dispatch: AppDispatch, getState: () => AppState) => {
  clearInterval(interval);
  dispatch(setTimerStatus("stopped"));
};

export const resumeTimer = () => (dispatch: AppDispatch, getState: () => AppState) => {
  dispatch(setTimerStatus("started"));
  interval = setInterval(() => {
    if (getState().gameInfo.timerStatus === "stopped") clearInterval(interval);
    dispatch(timerTick());
  }, 1000);
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

const setTimerStatus = (status: TimerStatusType) =>
  ({ type: "gameInfo/setTimerStatus", payload: status } as const);

const timerTick = () => ({ type: "gameInfo/timerTick" } as const);

export const setGameInfoData = (
  cardsLeft: number,
  flippedCards: CardType[],
  gameStatus: GameStatusType,
  movesCounter: number,
  timerValue: number,
  timerStatus: TimerStatusType
) =>
  ({
    type: "gameInfo/setGameInfoData",
    payload: {
      cardsLeft,
      flippedCards,
      gameStatus,
      movesCounter,
      timerValue,
      timerStatus,
    },
  } as const);

export type GameInfoActions =
  | ReturnType<typeof startGame>
  | ReturnType<typeof addFlippedCard>
  | ReturnType<typeof resetFlippedCards>
  | ReturnType<typeof decreaseRemainingCardsNumber>
  | ReturnType<typeof changeGameStatus>
  | ReturnType<typeof increaseMovesCounterValue>
  | ReturnType<typeof changeFullScreenState>
  | ReturnType<typeof setTimerStatus>
  | ReturnType<typeof timerTick>
  | ReturnType<typeof setGameInfoData>;

//selectors
export const getGameStatus = (state: AppState) => state.gameInfo.gameStatus;
export const getMovesCounterValue = (state: AppState) => state.gameInfo.movesCounter;
export const getFullScreenState = (state: AppState) => state.gameInfo.fullScreen;
export const getTimerValue = (state: AppState) => state.gameInfo.timerValue;
