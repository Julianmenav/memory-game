import React, { useState } from "react";
import "./App.css";
import Board from "../components/Board";
import LinkButton from "../components/LinkButton";
import levels from "../models/levels";

function App() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const maxLevel = 16;

  const levelUp = () => {
    setLevel((prev) => prev + 1);
  };

  const scoreUp = () => {
    setScore((prev) => prev + 1);
  };

  return (
    <div className="app">
      <div className="Board">
        <div className="score">PUNTUACION:{score}</div>
        <Board
          numberOfCards={levels[level]["numberOfCards"]}
          time={levels[level]["time"]}
          levelUp={levelUp}
          scoreUp={scoreUp}
          key={level}
        />
        <div className="level">
          Nivel: {level}/{maxLevel}
        </div>
      </div>
      <LinkButton path="/">Volver</LinkButton>
    </div>
  );
}

export default App;
