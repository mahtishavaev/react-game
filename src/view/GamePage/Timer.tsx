import { useSelector } from "react-redux";
import styled from "styled-components";
import { getTimerValue } from "../../redux/gameInfoSlice";

const TimerInner = styled.span`
  border: 1px solid #000;
  background: #fff;
  font-size: 24px;
  text-align: center;
  padding: 2px 10px;
  margin-right: 5px;
  margin-left: auto;
  display: inline-flex;
  align-self: center;
  cursor: default;
  @media (max-width: 767.98px) {
    margin-left: 0;
  }
`;

function secToTime(s: number) {
  function pad(n: number) {
    return ("00" + n).slice(-2);
  }
  const secs = s % 60;
  s = (s - secs) / 60;
  const mins = s % 60;
  return pad(mins) + ":" + pad(secs);
}

export const Timer = () => {
  const timer = useSelector(getTimerValue);
  return <TimerInner>{secToTime(timer)}</TimerInner>;
};
