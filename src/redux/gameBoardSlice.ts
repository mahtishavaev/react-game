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
    default:
      return state;
  }
};

//thunks
export const createGameBoard = () => (dispatch: AppDispatch) => {
  let gameBoard: GameBoardState = [];
  for (let i = 0; i < 9; i++) {
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

//actions
const setGameBoardData = (gameBoard: GameBoardState) =>
  ({ type: "gameBoard/setGameBoardData", payload: gameBoard } as const);

const flipAllCards = () => ({ type: "gameBoard/flipAllCards" } as const);

const unFlipAllCards = () => ({ type: "gameBoard/unFlipAllCards" } as const);

export type GameBoardActions =
  | ReturnType<typeof setGameBoardData>
  | ReturnType<typeof flipAllCards>
  | ReturnType<typeof unFlipAllCards>;

//selectors
export const getGameBoard = (state: AppState) => state.gameBoard;
