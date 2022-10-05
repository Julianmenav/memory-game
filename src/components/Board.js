import React, { useEffect, useState } from "react";
import Card from "./Card";
import { getCards, shuffleCards } from "../utils";
import PropTypes from "prop-types";

const Board = ({ numberOfCards, time, levelUp, scoreUp, restart }) => {
  const [loading, setLoading] = useState(false);
  const [loss, setLoss] = useState(false);
  const [idArray, setIdArray] = useState([]);
  const [cards, setCards] = useState([]);
  const [showPhase, setShowPhase] = useState(false);
  const [initialHide, setInitialHide] = useState(true);

  const showTime_ms = time * 1000;
  const COVERED_TIME_MS = 1750;

  //When the components is rendered for the first time it gets sprites for cards from an API.
  useEffect(() => {
    setLoading(true);
    console.count("Obteniendo cartas...");
    const getSprites = async () => {
      //We only need half of the total number of cards since they go in pairs.
      const numberOfCardsNeeded = numberOfCards / 2;
      const uniqueCards = await getCards(numberOfCardsNeeded);
      //They are randomly ordered and divided into 2 groups
      const randomCards = shuffleCards(uniqueCards);
      setCards(randomCards);

      setLoading(false);
    };
    getSprites();

    return () => {
      console.log("Desmontando tablero");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //controls dinamic guide message, following cards flips
  useEffect(() => {
    setTimeout(() => {
      setInitialHide(false);
      setShowPhase(true);
      
      setTimeout(() => {
        setShowPhase(false);
      }, showTime_ms);
    }, COVERED_TIME_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const compareCards = (spriteID) => {
    //Flip first card of a pair.
    if (idArray.length % 2 === 0) {
      return setIdArray((prev) => [...prev, spriteID]);
    }
    //Loss
    const lastID = idArray.slice(-1)[0];
    if (lastID !== spriteID) {
      return setLoss(true);
    }
    //If Correct pair card, add id to the array:
    setIdArray((prev) => [...prev, spriteID]);
    scoreUp();
    //If all cards are flipped
    if (idArray.length === numberOfCards - 1) {
      setTimeout(() => levelUp(), 1000);
    }
  };

  const guideText = showPhase ? (
    <div className="guideText memo">Memoriza las parejas!</div>
  ) : initialHide ? (
    <div className="guideText ready">Preparado?</div>
  ) : null

  const gameOverElement = (
    <>
      <h1 className="lossMessage">GAME OVER</h1>
      <button className="restartButton" onClick={restart}>REINICIAR PARTIDA</button>
    </>
  )

  const cardsOrganization = numberOfCards >= 12 ? {
    gridTemplateColumns: "none",
    gridTemplateRows: "repeat(3, 1fr)",
    gridAutoFlow: "column"
  } : null

  return loading ? (
    <h1>Cargando...</h1>
  ) : (
    <>
      {guideText}
      {loss ? gameOverElement : null}
      <div className="shuffleCards" style={cardsOrganization}>
        {cards.map((el, idx) => {
          return (
            <Card
              sprite={el}
              key={idx}
              time={showTime_ms}
              coveredTime={COVERED_TIME_MS}
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
