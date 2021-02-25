import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AutoplayActions, AutoplayState } from "./autoplaySlice";
import { GameBoardState, GameBoardActions } from "./gameBoardSlice";
import { GameInfoActions, GameInfoState } from "./gameInfoSlice";
import { rootReducer } from "./rootReducer";
import { SettingsActions, SettingsState } from "./settingsSlice";
const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

export const store: Store<AppState, AppActions> & {
  dispatch: AppDispatch;
} = createStore(rootReducer, composedEnhancer);

export type AppState = {
  gameBoard: GameBoardState;
  gameInfo: GameInfoState;
  settings: SettingsState;
  autoplay: AutoplayState;
};

export type AppActions = GameBoardActions | GameInfoActions | SettingsActions | AutoplayActions;

export type AppDispatch = ThunkDispatch<AppState, unknown, AppActions>;
