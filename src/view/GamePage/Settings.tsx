import { Howler } from "howler";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useThunkDispatch } from "../../hooks/useThunkDispatch";
import { closeSettings, getAllSettings, SaveSettings } from "../../redux/settingsSlice";
import { music } from "../../sound/sounds";
import { Button } from "../common/Button";

const SettingsOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(34, 34, 34, 0.8);
  display: flex;
`;

const SettingsWrapper = styled.div`
  width: 480px;
  background-color: #fff;
  margin: auto;
  padding: 10px;
`;

const SettingsTitle = styled.h2`
  text-align: center;
  margin: 20px 0;
  font-size: 36px;
`;

const InputWrapper = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  margin-top: 20px;
`;

const InputRange = styled.input.attrs({
  type: "range",
})`
  cursor: pointer;
`;

const Label = styled.span`
  font-size: 18px;
  font-weight: 700;
  margin-right: 20px;
  width: 50%;
`;

const Select = styled.select`
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  padding: 3px;
  width: 100px;
`;

const CheckBox = styled.input.attrs({
  type: "checkbox",
})`
  width: 20px;
  height: 20px;
`;

export const Settings = () => {
  const settings = useSelector(getAllSettings);
  const [musicVolume, setMusicVolume] = useState(settings.musicVolume);
  const [soundsVolume, setSoundsVolume] = useState(settings.soundsVolume);
  const [numberOfCards, setNumberOfCards] = useState(settings.numberOfCards);
  const [speed, setSpeed] = useState(settings.speed);
  const [showAtStart, setShowAtStart] = useState(settings.showCardsAtStart);

  const dispatch = useThunkDispatch();

  useEffect(() => {
    music.volume(musicVolume);
    Howler.mute(false);
    return () => {
      Howler.mute(settings.isMute);
      music.volume(settings.musicVolume);
    };
  }, [musicVolume]);

  return (
    <SettingsOverlay>
      <SettingsWrapper>
        <SettingsTitle>Settings</SettingsTitle>
        <InputWrapper>
          <Label>Music Volume:</Label>
          <InputRange
            value={musicVolume * 100}
            onChange={(e) => setMusicVolume(Number(e.target.value) / 100)}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Sounds Volume:</Label>
          <InputRange
            value={soundsVolume * 100}
            onChange={(e) => setSoundsVolume(Number(e.target.value) / 100)}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Number of cards</Label>
          <Select value={numberOfCards} onChange={(e) => setNumberOfCards(Number(e.target.value))}>
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="18">18</option>
          </Select>
        </InputWrapper>
        <InputWrapper>
          <Label>Speed</Label>
          <Select value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
            <option value="1500">Slow</option>
            <option value="1000">Standart</option>
            <option value="500">Fast</option>
          </Select>
        </InputWrapper>
        <InputWrapper>
          <Label>Show cards at start</Label>
          <CheckBox checked={showAtStart} onChange={(e) => setShowAtStart(e.target.checked)} />
        </InputWrapper>
        <ButtonsWrapper>
          <Button
            onClick={() =>
              dispatch(SaveSettings(musicVolume, soundsVolume, numberOfCards, speed, showAtStart))
            }
          >
            Save
          </Button>
          <Button onClick={() => dispatch(closeSettings())}>Cancel</Button>
        </ButtonsWrapper>
      </SettingsWrapper>
    </SettingsOverlay>
  );
};
