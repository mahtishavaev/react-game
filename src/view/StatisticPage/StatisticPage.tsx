import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useThunkDispatch } from "../../hooks/useThunkDispatch";
import { getStatistic, loadStatisticFromLocalStorage } from "../../redux/statisticSlice";
import { Container } from "../common/Container";

const StatisticPageInner = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`;
const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: left;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  display: flex;
`;

const TableHeader = styled.th`
  border: 1px solid #dddddd;
  padding: 5px;
  flex: 1;
`;

const TableCell = styled.td`
  border: 1px solid #dddddd;
  padding: 5px;
  flex: 1;
`;

const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };
const timeOptions = { hour: "numeric", minute: "numeric" };

function secToTime(s: number) {
  function pad(n: number) {
    return ("00" + n).slice(-2);
  }
  const secs = s % 60;
  s = (s - secs) / 60;
  const mins = s % 60;
  return pad(mins) + ":" + pad(secs);
}

function speedToString(speed: number) {
  switch (speed) {
    case 1000:
      return "Standart";
    case 1500:
      return "Slow";
    default:
      return "Fast";
  }
}

export const StatisticPage = () => {
  const stats = useSelector(getStatistic);
  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(loadStatisticFromLocalStorage());
  }, []);

  const data = [...stats].sort((a, b) => b.date.toString().localeCompare(a.date.toString()));
  return (
    <StatisticPageInner>
      <Container>
        <Table>
          <TableBody>
            <TableRow>
              <TableHeader>Date</TableHeader>
              <TableHeader>Moves</TableHeader>
              <TableHeader>Time spent</TableHeader>
              <TableHeader>Number of cards</TableHeader>
              <TableHeader>Speed</TableHeader>
            </TableRow>
            {data.map((el, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    {new Date(el.date).toLocaleDateString("ru-RU", dateOptions)}{" "}
                    {new Date(el.date).toLocaleTimeString("ru-RU", timeOptions)}
                  </TableCell>
                  <TableCell>{el.moves}</TableCell>
                  <TableCell>{secToTime(el.timeSpent)}</TableCell>
                  <TableCell>{el.numberOfCards}</TableCell>
                  <TableCell>{speedToString(el.speed)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Container>
    </StatisticPageInner>
  );
};
