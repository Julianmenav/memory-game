import React from "react";
import Card from "./Card";
import pokemonSprites from "../models/pokemonSprites";
import PropTypes from "prop-types";

const Board = ({ numberOfCards }) => {
  //TODO: Que tome aleatorias.
  const halfCards = pokemonSprites.slice(0, numberOfCards / 2);

  return (
    <>
      <div>
        {halfCards.map((el, idx) => {
          return <Card sprite={el} key={idx} />;
        })}
      </div>
      <div>
        {halfCards.map((el, idx) => {
          return <Card sprite={el} key={idx} />;
        })}
      </div>
    </>
  );
};

Board.propTypes = {
  numberOfCards: PropTypes.number,
};

export default Board;
