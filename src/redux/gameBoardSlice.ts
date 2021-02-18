import { AppDispatch } from "./store";

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
    default:
      return state;
  }
};

//thunks
export const testThunk = () => (dispatch: AppDispatch) => {};

//actions
export const testAction = () => ({ type: "gameBoard/testAction" } as const);

export type GameBoardActions = ReturnType<typeof testAction>;
