import styled, { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GamePage } from "./view/GamePage/GamePage";
import { Header } from "./view/Header/Header";
import { StatisticPage } from "./view/StatisticPage/StatisticPage";
import React, { useEffect } from "react";
import { Footer } from "./view/Footer/Footer";
import { music } from "./sound/sounds";
import { Howler } from "howler";
import { areSoundsMute } from "./redux/settingsSlice";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body{
    background:#FAFAFA;
    font-family: 'Roboto', sans-serif;
  }
`;

const AppInner = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  const mute = useSelector(areSoundsMute);
  useEffect(() => {
    music.play();
    return () => {
      music.stop();
    };
  }, []);

  useEffect(() => {
    Howler.mute(mute);
  }, [mute]);

  return (
    <BrowserRouter>
      <AppInner>
        <GlobalStyle />
        <Header />
        <Switch>
          <Route exact path="/">
            <GamePage />
          </Route>
          <Route exact path="/statistic">
            <StatisticPage />
          </Route>
        </Switch>
        <Footer />
      </AppInner>
    </BrowserRouter>
  );
}

export default App;
