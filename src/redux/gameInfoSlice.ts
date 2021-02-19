import { AppDispatch } from "./store";

//types
export type GameInfoState = {
  isStarted: boolean;
  isFinished: boolean;
  flippedCardsCount: number;
  cardsLeft: number;
  firstFlippedCardNumber: string;
};

//initial state
const initState: GameInfoState = {
  isStarted: false,
  isFinished: false,
  flippedCardsCount: 0,
  cardsLeft: 0,
  firstFlippedCardNumber: "",
};

// reducer
export const gameInfoReducer = (
  state: GameInfoState = initState,
  action: GameInfoActions
): GameInfoState => {
  switch (action.type) {
    case "gameInfo/startGame":
      return {
        isStarted: true,
        isFinished: false,
        flippedCardsCount: 0,
        cardsLeft: action.payload,
        firstFlippedCardNumber: "",
      };
    case "gameInfo/increaseFlippedCardsCount":
      return {
        ...state,
        flippedCardsCount: state.flippedCardsCount + 1,
      };
    case "gameInfo/resetFlippedCardsCount":
      return {
        ...state,
        flippedCardsCount: 0,
      };
    case "gameInfo/decreaseRemainingCardsCount":
      return {
        ...state,
        cardsLeft: state.cardsLeft - 2,
      };
    case "gameInfo/setFirstFlippedCardNumber":
      return {
        ...state,
        firstFlippedCardNumber: action.payload,
      };
    default:
      return state;
  }
};

//thunks
export const testThunk = () => (dispatch: AppDispatch) => {};

//actions
export const startGame = (cardsCount: number) =>
  ({ type: "gameInfo/startGame", payload: cardsCount } as const);

export const increaseFlippedCardsCount = () =>
  ({ type: "gameInfo/increaseFlippedCardsCount" } as const);

export const resetFlippedCardsCount = () => ({ type: "gameInfo/resetFlippedCardsCount" } as const);

export const decreaseRemainingCardsCount = () =>
  ({ type: "gameInfo/decreaseRemainingCardsCount" } as const);

export const setFirstFlippedCardNumber = (cardNumber: string) =>
  ({ type: "gameInfo/setFirstFlippedCardNumber", payload: cardNumber } as const);

export type GameInfoActions =
  | ReturnType<typeof startGame>
  | ReturnType<typeof increaseFlippedCardsCount>
  | ReturnType<typeof resetFlippedCardsCount>
  | ReturnType<typeof setFirstFlippedCardNumber>
  | ReturnType<typeof decreaseRemainingCardsCount>;
