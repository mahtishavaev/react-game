import { AppDispatch } from "./store";

//types
type CardType = {
  number: string;
  id: number;
};

export type GameInfoState = {
  isStarted: boolean;
  isFinished: boolean;
  flippedCards: CardType[];
  cardsLeft: number;
};

//initial state
const initState: GameInfoState = {
  isStarted: false,
  isFinished: false,
  flippedCards: [],
  cardsLeft: 0,
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
        flippedCards: [],
        cardsLeft: action.payload,
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
    default:
      return state;
  }
};

//thunks
export const testThunk = () => (dispatch: AppDispatch) => {};

//actions
export const startGame = (numberOfCards: number) =>
  ({ type: "gameInfo/startGame", payload: numberOfCards } as const);

export const addFlippedCard = (card: CardType) =>
  ({ type: "gameInfo/addFlippedCard", payload: card } as const);

export const resetFlippedCards = () => ({ type: "gameInfo/resetFlippedCards" } as const);

export const decreaseRemainingCardsNumber = () =>
  ({ type: "gameInfo/decreaseRemainingCardsNumber" } as const);

export type GameInfoActions =
  | ReturnType<typeof startGame>
  | ReturnType<typeof addFlippedCard>
  | ReturnType<typeof resetFlippedCards>
  | ReturnType<typeof decreaseRemainingCardsNumber>;
