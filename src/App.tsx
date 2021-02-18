import { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { GamePage } from "./view/GamePage/GamePage";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <GamePage />
    </Provider>
  );
}

export default App;
