import React, { useEffect, useState } from "react";
import Card from "./Card";
import { getCards, shuffleCards } from "../utils";
import PropTypes from "prop-types";

const Board = ({ numberOfCards, time, levelUp, scoreUp }) => {
  const [loading, setLoading] = useState(false);
  const [loss, setLoss] = useState(false);
  const [lastID, setLastID] = useState([]);
  const [splittedCards, setSplittedCards] = useState({
    firstRowOfCards: [],
    secondRowOfCards: [],
  });

  //When the components is rendered for the first time it gets sprites for cards from an API.
  useEffect(() => {
    setLoading(true);
    console.count("Obteniendo cartas...");
    const getSprites = async () => {
      //We only need half of the total number of cards since they go in pairs.
      const numberOfCardsNeeded = numberOfCards / 2;
      const cards = await getCards(numberOfCardsNeeded);
      //They are randomly ordered and divided into 2 groups
      const [firstRow, secondRow] = shuffleCards(cards);
      setSplittedCards({
        firstRowOfCards: firstRow,
        secondRowOfCards: secondRow,
      });

      setLoading(false);
    };
    getSprites();

    return () => {
      console.log("Desmontando tablero");
    };
  }, []);

  const compareCards = (spriteID) => {
    //Flip first card.
    if (lastID.length % 2 === 0) {
      return setLastID((prev) => [...prev, spriteID]);
    }
    //Loss
    if (lastID.slice(-1)[0] !== spriteID) {
      return setLoss(true);
    }
    //If Correct pair card:
    setLastID((prev) => [...prev, spriteID]);
    scoreUp();
    //If all cards are flipped
    if (lastID.length === numberOfCards - 1) {
      setTimeout(() => levelUp(), 1000)
    }
  };

  return loss ? (
    <>
      <h1>Has perdido.</h1>
    </>
  ) : loading ? (
    <h1>Cargando...</h1>
  ) : (
    <>
      <div>
        {splittedCards.firstRowOfCards.map((el, idx) => {
          return (
            <Card
              sprite={el}
              key={idx}
              time={time}
              compareCards={compareCards}
            />
          );
        })}
      </div>
      <div>
        {splittedCards.secondRowOfCards.map((el, idx) => {
          return (
            <Card
              sprite={el}
              key={idx}
              time={time}
              compareCards={compareCards}
            />
          );
        })}
      </div>
    </>
  );
};

Board.propTypes = {
  numberOfCards: PropTypes.number,
};

export default Board;
