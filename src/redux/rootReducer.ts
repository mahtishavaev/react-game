import { combineReducers } from "redux";
import { autoplayReducer } from "./autoplaySlice";
import { gameBoardReducer } from "./gameBoardSlice";
import { gameInfoReducer } from "./gameInfoSlice";
import { settingsReducer } from "./settingsSlice";
import { statisticReducer } from "./statisticSlice";

export const rootReducer = combineReducers({
  gameBoard: gameBoardReducer,
  gameInfo: gameInfoReducer,
  settings: settingsReducer,
  autoplay: autoplayReducer,
  statistic: statisticReducer,
});
