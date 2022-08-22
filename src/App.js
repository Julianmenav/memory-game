import React from "react";
import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <div className="App">
      <Board numberOfCards={8} />
    </div>
  );
}

export default App;
