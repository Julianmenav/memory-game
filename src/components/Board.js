import React, { useEffect, useState } from "react";
import Card from "./Card";
import { getCards, shuffleCards } from "../utils";
import PropTypes from "prop-types";

const Board = ({ numberOfCards, time, levelUp, scoreUp }) => {
  const [loading, setLoading] = useState(false);
  const [loss, setLoss] = useState(false);
  const [idArray, setIdArray] = useState([]);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const compareCards = (spriteID) => {
    //Flip first card of a pair.
    if (idArray.length % 2 === 0) {
      return setIdArray((prev) => [...prev, spriteID]);
    }
    //Loss
    const lastID = idArray.slice(-1)[0]
    if (lastID !== spriteID) {
      return setTimeout(() => setLoss(true), 500);
    }
    //If Correct pair card, add id to the array:
    setIdArray((prev) => [...prev, spriteID]);
    scoreUp();
    //If all cards are flipped
    if (idArray.length === numberOfCards - 1) {
      setTimeout(() => levelUp(), 1000)
    }
  };

  return loading ? (
    <h1>Cargando...</h1>
  ) : (
    <>
      {loss ? <h1 className="lossMessage">GAME OVER</h1> : null}
      <div>
        {splittedCards.firstRowOfCards.map((el, idx) => {
          return (
            <Card
              sprite={el}
              key={idx}
              time={time}
              compareCards={compareCards}
              loss={loss}
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
              loss={loss}
            />
          );
        })}
      </div>
    </>
  );
};

Board.propTypes = {
  numberOfCards: PropTypes.number,
  time: PropTypes.number,
  levelUp: PropTypes.func, 
  scoreUp: PropTypes.func
};

export default Board;
