import { cardClicked, startNewGame } from "./gameBoardSlice";
import { AppDispatch, AppState } from "./store";

//types
type CardType = {
  number: string;
  id: number;
};

export type AutoplayState = {
  autoplay: boolean;
  cards: CardType[];
};

//initial state
const initState: AutoplayState = {
  autoplay: false,
  cards: [],
};

// reducer
export const autoplayReducer = (
  state: AutoplayState = initState,
  action: AutoplayActions
): AutoplayState => {
  switch (action.type) {
    case "autoplay/setAutoplayStatus":
      return {
        ...state,
        autoplay: action.payload,
      };
    default:
      return state;
  }
};

//thunks
export const startAutoplay = () => async (dispatch: AppDispatch, getState: () => AppState) => {
  dispatch(setAutoplayStatus(true));
  dispatch(startNewGame());
  await new Promise((res) => {
    setInterval(() => {
      if (getState().gameInfo.gameStatus === "started") res(true);
    }, 500);
  });
  const { speed } = getState().settings;
  const { numberOfCards } = getState().settings;
  const cards = Array(numberOfCards)
    .fill({})
    .map((el, i) => ({ number: "", id: i, hidden: false }));
  let cardIndex = 0;
  while (getState().gameInfo.gameStatus !== "finished") {
    if (!getState().gameBoard[cardIndex].visible) {
      cardIndex++;
      continue;
    }
    const openedCards = getState().gameInfo.flippedCards.length;
    if (openedCards === 0) {
      dispatch(cardClicked(cardIndex, false));
      cards[cardIndex].number = getState().gameBoard[cardIndex].number;
    } else if (openedCards === 1) {
      let firstCardNumber = getState().gameInfo.flippedCards[0].number;
      let firstCardIndex = getState().gameInfo.flippedCards[0].id;
      let secondCardIndex = cardIndex;
      cards.forEach((el) => {
        if (el.number === firstCardNumber && el.id !== firstCardIndex) secondCardIndex = el.id;
      });
      if (secondCardIndex !== cardIndex) cardIndex--;
      dispatch(cardClicked(secondCardIndex, false));
      cards[secondCardIndex].number = getState().gameBoard[secondCardIndex].number;
    }
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, speed + 500);
    });
    cardIndex < numberOfCards - 1 ? cardIndex++ : (cardIndex = 0);
  }
  dispatch(setAutoplayStatus(false));
};

//actions
export const setAutoplayStatus = (status: boolean) =>
  ({ type: "autoplay/setAutoplayStatus", payload: status } as const);

export type AutoplayActions = ReturnType<typeof setAutoplayStatus>;

//selectors
export const getAutoplayStatus = (state: AppState) => state.autoplay.autoplay;
