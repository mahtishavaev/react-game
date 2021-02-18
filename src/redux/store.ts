import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkDispatch } from "redux-thunk";
import { GameBoardState, GameBoardActions } from "./gameBoardSlice";
import { rootReducer } from "./rootReducer";
const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

export const store: Store<AppState, AppActions> & {
  dispatch: AppDispatch;
} = createStore(rootReducer, composedEnhancer);

export type AppState = {
  gameBoard: GameBoardState;
};

export type AppActions = GameBoardActions;

export type AppDispatch = ThunkDispatch<AppState, unknown, AppActions>;
