import React, { useEffect, useState } from "react";
import Card from "./Card";
import { getCards, shuffleCards } from "../utils";
import PropTypes from "prop-types";

const Board = ({ numberOfCards }) => {
  const [loading, setLoading] = useState(false);
  const [uniqueCards, setUniqueCards] = useState([]);
  //TODO: Que tome aleatorias.

  //When the components is rendered for the first time it gets sprites for cards from an API.
  useEffect(() => {
    setLoading(true);

    const getSprites = async () => {
      //We only need half of the total number of cards since they go in pairs.
      const numberOfCardsNeeded = numberOfCards / 2
      const cards = await getCards(numberOfCardsNeeded);

      setUniqueCards(cards);
    };
    getSprites();

    setLoading(false);

  }, []);
  //They are randomly ordered and divided into 2 groups 
  const [cards1, cards2] = shuffleCards(uniqueCards);

  return loading ? null : (
    <>
      <div>
        {cards1.map((el, idx) => {
          return <Card sprite={el} key={idx} />;
        })}
      </div>
      <div>
        {cards2.map((el, idx) => {
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
