import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import backImage from "../images/card_back.png";


const Card = ({ sprite, time, compareCards, loss }) => {
  const [flipped, setFlipped] = useState(false);
  const [showPhase, setShowPhase] = useState(true);
  const showTime_seconds = time * 1000
  const COVERED_CARD_TIME_MS = 1750

  //ComponentWillMount
  useEffect(() => {
    //Tras 1 sec, muestra las cartas
    setTimeout(() => {
      setFlipped(true);
      //3 segundos despues de mostrarse, vuelven a voltearse, y ya se puede jugar.
      setTimeout(() => {
        setFlipped(false);
        setShowPhase(false);
      }, showTime_seconds);
    }, COVERED_CARD_TIME_MS);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const flip = () => {
    if (showPhase || flipped || loss) return;
    setFlipped(true);
    compareCards(sprite.id)
  };

  return (
    <div onClick={flip} className="flip-card-button">
      <div className={`flip-card-inner ${flipped ? "" : "hover-trigger"}`}>
        <div className="flip-card-front">
          <img src={sprite.img} alt="front" />
        </div>
        <div className="flip-card-back">
          <img src={backImage} alt="back" />
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  sprite: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
  }),
  compareCards: PropTypes.func,
  time: PropTypes.number
};

export default Card;
