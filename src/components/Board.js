import React, { useEffect, useState } from "react";
import Card from "./Card";
import { getCards, shuffleCards } from "../utils";
import PropTypes from "prop-types";

const Board = ({ numberOfCards, time }) => {
  const [loading, setLoading] = useState(false);
  const [uniqueCards, setUniqueCards] = useState([]);

  //When the components is rendered for the first time it gets sprites for cards from an API.
  useEffect(() => {
    setLoading(true);

    const getSprites = async () => {
      //We only need half of the total number of cards since they go in pairs.
      const numberOfCardsNeeded = numberOfCards / 2
      const cards = await getCards(numberOfCardsNeeded);

      setUniqueCards(cards);
      setLoading(false);
    };
    getSprites();


  }, []);
  //They are randomly ordered and divided into 2 groups 
  const [cards1, cards2] = shuffleCards(uniqueCards);

  return loading ? (<h1>Cargando...</h1>) : (
    <>
      <div>
        {cards1.map((el, idx) => {
          return <Card sprite={el} key={idx} time={time}/>;
        })}
      </div>
      <div>
        {cards2.map((el, idx) => {
          return <Card sprite={el} key={idx} time={time}/>;
        })}
      </div>
    </>
  );
};

Board.propTypes = {
  numberOfCards: PropTypes.number,
};

export default Board;
