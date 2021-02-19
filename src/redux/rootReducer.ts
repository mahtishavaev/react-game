import { combineReducers } from "redux";
import { gameBoardReducer } from "./gameBoardSlice";
import { gameInfoReducer } from "./gameInfoSlice";

export const rootReducer = combineReducers({
  gameBoard: gameBoardReducer,
  gameInfo: gameInfoReducer,
});
