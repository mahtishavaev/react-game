import { combineReducers } from "redux";
import { gameBoardReducer } from "./gameBoardSlice";
import { gameInfoReducer } from "./gameInfoSlice";
import { settingsReducer } from "./settingsSlice";

export const rootReducer = combineReducers({
  gameBoard: gameBoardReducer,
  gameInfo: gameInfoReducer,
  settings: settingsReducer,
});
