import styled, { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { GamePage } from "./view/GamePage/GamePage";

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
`;

function App() {
  return (
    <AppInner>
      <Provider store={store}>
        <GlobalStyle />
        <GamePage />
      </Provider>
    </AppInner>
  );
}

export default App;
