import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";
import getCards from "../utils/api";
import shuffleCards from "../utils/shuffleCards";
import boxHeader from "../assets/boxHeader.svg";

const Board = ({ numberOfCards, time, levelUp, scoreUp, restart }) => {
  const [loading, setLoading] = useState(true);
  const [loss, setLoss] = useState(false);
  const [idArray, setIdArray] = useState([]);
  const [cards, setCards] = useState([]);
  const [showPhase, setShowPhase] = useState(false);
  const [initialHide, setInitialHide] = useState(false);

  const showTime_ms = time * 1000;
  const COVERED_TIME_MS = 1750;

  //When the components is rendered for the first time it gets sprites for cards from an API.
  useEffect(() => {
    const getSprites = async () => {
      //We only need half of the total number of cards since they go in pairs.
      const numberOfCardsNeeded = numberOfCards / 2;
      const uniqueCards = await getCards(numberOfCardsNeeded);
      //They are randomly ordered and divided into 2 groups
      const randomCards = shuffleCards(uniqueCards);
      setCards(randomCards);

      setLoading(false);
      setInitialHide(true);
    };
    getSprites();

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
      return setTimeout(() => {
        setLoss(true);
      }, 300);
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
    <div className="guideText memo">¡Memoriza las parejas!</div>
  ) : initialHide ? (
    <div className="guideText ready">¿Preparado?</div>
  ) : null;

  const gameOverElement = loss ? (
    <div className="gameOverContainer">
      <div className="lossMessage">
        <p>GAME OVER</p>
      </div>
      <button className="restartButton" onClick={restart}>
        REINICIAR PARTIDA
      </button>
    </div>
  ) : null;

  const cardsOrganization =
    numberOfCards >= 12
      ? {
          gridTemplateColumns: "none",
          gridTemplateRows: "repeat(3, 1fr)",
          gridAutoFlow: "column",
        }
      : null;

  return (
    <>
      <div className="guideTextContainer">
        <img src={boxHeader} alt="" />
        {guideText}
      </div>
      {loading ? (
        <h1>Cargando...</h1>
      ) : (
        <>
          {gameOverElement}
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
      )}
    </>
  );
};

export default Board;
