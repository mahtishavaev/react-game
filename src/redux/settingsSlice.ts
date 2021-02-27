import { AppDispatch, AppState } from "./store";

//types
export type SettingsState = {
  musicVolume: number;
  soundsVolume: number;
  isMute: boolean;
  isOpen: boolean;
  numberOfCards: number;
  speed: number;
  showCardsAtStart: boolean;
};

//initial state
const initState: SettingsState = {
  musicVolume: 0.05,
  soundsVolume: 0.05,
  isMute: true,
  isOpen: false,
  numberOfCards: 12,
  speed: 1000,
  showCardsAtStart: true,
};

// reducer
export const settingsReducer = (
  state: SettingsState = initState,
  action: SettingsActions
): SettingsState => {
  switch (action.type) {
    case "settings/openSettings":
      return { ...state, isOpen: true };
    case "settings/closeSettings":
      return { ...state, isOpen: false };
    case "settings/setSettings":
      return {
        ...state,
        musicVolume: action.payload.musicVolume,
        soundsVolume: action.payload.soundsVolume,
        numberOfCards: action.payload.numberOfCards,
        speed: action.payload.speed,
        showCardsAtStart: action.payload.showCardsAtStart,
      };
    case "settings/muteSounds":
      return { ...state, isMute: action.payload };
    default:
      return state;
  }
};

//thunks
export const SaveSettings = (
  musicVolume: number,
  soundsVolume: number,
  numberOfCards: number,
  speed: number,
  showCardsAtStart: boolean
) => (dispatch: AppDispatch, getState: () => AppState) => {
  dispatch(setSettings(musicVolume, soundsVolume, numberOfCards, speed, showCardsAtStart));
  dispatch(closeSettings());
};

export const loadSettingsFromLocalStorage = () => (dispatch: AppDispatch) => {
  const lsSettings = localStorage.getItem("ms-game-settings");
  if (lsSettings !== null) {
    const { musicVolume, soundsVolume, numberOfCards, speed, showCardsAtStart } = JSON.parse(
      lsSettings
    );
    dispatch(setSettings(musicVolume, soundsVolume, numberOfCards, speed, showCardsAtStart));
  }
};

export const saveSettingsToLocalStorage = () => (
  dispatch: AppDispatch,
  getState: () => AppState
) => {
  const { musicVolume, soundsVolume, numberOfCards, speed, showCardsAtStart } = getState().settings;
  localStorage.setItem(
    "ms-game-settings",
    JSON.stringify({ musicVolume, soundsVolume, numberOfCards, speed, showCardsAtStart })
  );
};
//actions
export const openSettings = () => ({ type: "settings/openSettings" } as const);

export const closeSettings = () => ({ type: "settings/closeSettings" } as const);

export const setSettings = (
  musicVolume: number,
  soundsVolume: number,
  numberOfCards: number,
  speed: number,
  showCardsAtStart: boolean
) =>
  ({
    type: "settings/setSettings",
    payload: { musicVolume, soundsVolume, numberOfCards, speed, showCardsAtStart },
  } as const);

export const muteSounds = (mute: boolean) =>
  ({ type: "settings/muteSounds", payload: mute } as const);

export type SettingsActions =
  | ReturnType<typeof openSettings>
  | ReturnType<typeof closeSettings>
  | ReturnType<typeof setSettings>
  | ReturnType<typeof muteSounds>;

//selectors
export const getMusicVolume = (state: AppState) => state.settings.musicVolume;
export const getSoundsVolume = (state: AppState) => state.settings.soundsVolume;
export const getAllSettings = (state: AppState) => state.settings;
export const areSettingsOpen = (state: AppState) => state.settings.isOpen;
export const areSoundsMute = (state: AppState) => state.settings.isMute;
