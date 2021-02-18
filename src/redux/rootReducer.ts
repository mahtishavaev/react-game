import { combineReducers } from "redux";
import { gameBoardReducer } from "./gameBoardSlice";

export const rootReducer = combineReducers({
  gameBoard: gameBoardReducer,
});
