import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import logo from "../icons/logo.svg";


const Card = ({ sprite, time, compareCards }) => {
  const [flipped, setFlipped] = useState(false);
  const [showPhase, setShowPhase] = useState(true);
  const showTime = time * 1000

  //ComponentWillMount
  useEffect(() => {
    //Tras 1 sec, muestra las cartas
    setTimeout(() => {
      setFlipped(true);
      //3 segundos despues de mostrarse, vuelven a voltearse, y ya se puede jugar.
      setTimeout(() => {
        setFlipped(false);
        setShowPhase(false);
      }, showTime);
    }, 1000);
  }, []);

  const flip = () => {
    if (showPhase || flipped) return;
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
          <img src={logo} alt="back" />
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
};

export default Card;
