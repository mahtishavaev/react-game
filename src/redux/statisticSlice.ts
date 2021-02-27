import { AppDispatch, AppState } from "./store";

//types
type StatisticType = {
  date: Date;
  timeSpent: number;
  moves: number;
  numberOfCards: number;
  speed: number;
};

export type StatisticState = StatisticType[];

//initial state
const initState: StatisticState = [];

// reducer
export const statisticReducer = (
  state: StatisticState = initState,
  action: StatisticActions
): StatisticState => {
  switch (action.type) {
    case "statistic/setStatistic":
      return action.payload;
    case "statistic/addStatisticRecord":
      return [...state, action.payload];
    default:
      return state;
  }
};

//thunks
export const saveStatisticToLocalStorage = () => (
  dispatch: AppDispatch,
  getState: () => AppState
) => {
  const { statistic } = getState();
  localStorage.setItem("ms-game-statistic", JSON.stringify(statistic));
};

export const loadStatisticFromLocalStorage = () => (dispatch: AppDispatch) => {
  const lsStatisctic = localStorage.getItem("ms-game-statistic");
  if (lsStatisctic !== null) {
    const statistic = JSON.parse(lsStatisctic);
    dispatch(setStatistic(statistic));
  }
};

//actions
export const addStatisticRecord = (record: StatisticType) =>
  ({ type: "statistic/addStatisticRecord", payload: record } as const);

export const setStatistic = (statistic: StatisticState) =>
  ({ type: "statistic/setStatistic", payload: statistic } as const);

export type StatisticActions =
  | ReturnType<typeof addStatisticRecord>
  | ReturnType<typeof setStatistic>;

//selectors
export const getStatistic = (state: AppState) => state.statistic;
