import { cardClicked, selectCard } from "./gameBoardSlice";
import { AppDispatch, AppState } from "./store";

//types
export type KeyboardState = {
  selectedCardindex: number | null;
};

//initial state
const initState: KeyboardState = {
  selectedCardindex: null,
};

// reducer
export const keyboardReducer = (
  state: KeyboardState = initState,
  action: KeyboardActions
): KeyboardState => {
  switch (action.type) {
    case "keyboard/setSelectedCardIndex":
      return { selectedCardindex: action.payload };
    default:
      return state;
  }
};

//thunks
export const keyPressed = (key: string) => async (
  dispatch: AppDispatch,
  getState: () => AppState
) => {
  const arrowKeys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
  if (!(arrowKeys.includes(key) || key === "Enter")) return;
  if (getState().gameInfo.gameStatus !== "started") return;
  let { selectedCardindex } = getState().keyboard;
  const cardsOnRow = window.innerWidth < 768 ? 4 : 6;
  const cardsTotal = getState().gameBoard.length;
  if (selectedCardindex === null) {
    selectedCardindex = 0;
    dispatch(setSelectedCardIndex(selectedCardindex));
    dispatch(selectCard(selectedCardindex));
  }
  const column = selectedCardindex % cardsOnRow;
  const row = Math.floor(selectedCardindex / cardsOnRow);
  switch (key) {
    case "ArrowDown":
      if (selectedCardindex + cardsOnRow < cardsTotal) {
        selectedCardindex += cardsOnRow;
        dispatch(setSelectedCardIndex(selectedCardindex));
        dispatch(selectCard(selectedCardindex));
      } else {
        selectedCardindex = selectedCardindex % cardsOnRow;
        dispatch(setSelectedCardIndex(selectedCardindex));
        dispatch(selectCard(selectedCardindex));
      }
      break;
    case "ArrowUp":
      if (selectedCardindex - cardsOnRow >= 0) {
        selectedCardindex -= cardsOnRow;
        dispatch(setSelectedCardIndex(selectedCardindex));
        dispatch(selectCard(selectedCardindex));
      } else {
        selectedCardindex = selectedCardindex + cardsOnRow * Math.floor(cardsTotal / cardsOnRow);
        if (selectedCardindex >= cardsTotal) selectedCardindex -= cardsOnRow;
        dispatch(setSelectedCardIndex(selectedCardindex));
        dispatch(selectCard(selectedCardindex));
      }
      break;
    case "ArrowRight":
      if (column < cardsOnRow - 1 && selectedCardindex + 1 < cardsTotal) {
        selectedCardindex++;
        dispatch(setSelectedCardIndex(selectedCardindex));
        dispatch(selectCard(selectedCardindex));
      } else {
        selectedCardindex = row * cardsOnRow;
        dispatch(setSelectedCardIndex(selectedCardindex));
        dispatch(selectCard(selectedCardindex));
      }

      break;
    case "ArrowLeft":
      if (column !== 0) {
        selectedCardindex--;
        dispatch(setSelectedCardIndex(selectedCardindex));
        dispatch(selectCard(selectedCardindex));
      } else {
        selectedCardindex =
          selectedCardindex + cardsOnRow < cardsTotal
            ? selectedCardindex + cardsOnRow - 1
            : cardsTotal - 1;
        dispatch(setSelectedCardIndex(selectedCardindex));
        dispatch(selectCard(selectedCardindex));
      }
      break;
    case "Enter":
      dispatch(cardClicked(selectedCardindex, true));
      break;
    default:
      break;
  }
};

//actions
export const setSelectedCardIndex = (index: number | null) =>
  ({ type: "keyboard/setSelectedCardIndex", payload: index } as const);

export type KeyboardActions = ReturnType<typeof setSelectedCardIndex>;
