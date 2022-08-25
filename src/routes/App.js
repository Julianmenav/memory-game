import React from "react";
import "../App.css";
import Board from "../components/Board";
import LinkButton from "../components/LinkButton";

function App() {
  return (
    <>
      <LinkButton path="/">Go Back</LinkButton>
      <div className="App">
        <Board numberOfCards={8} />
      </div>
    </>
  );
}

export default App;
