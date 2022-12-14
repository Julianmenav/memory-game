import React, { useState } from "react";
import Board from "../../components/Board";
import LinkButton from "../../components/LinkButton";
import levels from "../../models/levels";
import "./Game.css";


function Game() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [boardKey, setBoardKey] = useState(0);
  const maxLevel = 16;

  const restart = () => {
    setLevel(1);
    setScore(0);
    //Key changes will remount component.
    setBoardKey((prev) => prev + 1);
  };

  const levelUp = () => {
    setLevel((prev) => prev + 1);
    setBoardKey((prev) => prev + 1);
  };

  const scoreUp = () => {
    setScore((prev) => prev + 1);
  };

  return (
    <div className="app">
      <div className="Board">
        <div className="board-bg"></div>
        <Board
          numberOfCards={levels[level]["numberOfCards"]}
          time={levels[level]["time"]}
          levelUp={levelUp}
          scoreUp={scoreUp}
          restart={restart}
          key={boardKey}
        />
        <div className="score statistics">Puntuación: {score}</div>
        <div className="level statistics">Nivel: {level}/{maxLevel}</div>
      </div>
          <LinkButton path="/">Volver</LinkButton>
    </div>
  );
}

export default Game;
