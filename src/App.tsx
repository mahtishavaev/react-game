import styled, { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { store } from "./redux/store";
import { GamePage } from "./view/GamePage/GamePage";
import { Header } from "./view/Header/Header";
import { StatisticPage } from "./view/StatisticPage/StatisticPage";
import React, { useEffect } from "react";
import { Footer } from "./view/Footer/Footer";
import { music } from "./sound/sounds";

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
  useEffect(() => {
    music.play();
    return () => {
      music.stop();
    };
  });
  return (
    <BrowserRouter>
      <AppInner>
        <Provider store={store}>
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
        </Provider>
      </AppInner>
    </BrowserRouter>
  );
}

export default App;
