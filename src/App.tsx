import { createGlobalStyle } from "styled-components";
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
    <>
      <GlobalStyle />
      <GamePage />
    </>
  );
}

export default App;
