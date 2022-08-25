import React, { useState } from "react";
import "../App.css";
import Board from "../components/Board";
import LinkButton from "../components/LinkButton";
import levels from "../models/levels";

function App() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);






  return (
    <>
      <LinkButton path="/">Go Back</LinkButton>
      <p>Score: {score} - Level: {level}</p>
      <div className="Board">
        <Board numberOfCards={levels[level]["numberOfCards"]} time={levels[level]["time"]} />
      </div>
    </>
  );
}

export default App;
