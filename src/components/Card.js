import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import logo from "../icons/logo.svg";

const SHOW_TIME_SC = 3 * 1000

const Card = ({ sprite }) => {
  const [flipped, setFlipped] = useState(false);
  const [showPhase, setShowPhase] = useState(true);

  //ComponentDidMount
  useEffect(() => {
    //Tras 1 sec, muestra las cartas
    setTimeout(() => {
      setFlipped(true);
      //3 segundos despues de mostrarse, vuelven a voltearse, y ya se puede jugar.
      setTimeout(() => {
        setFlipped(false)
        setShowPhase(false)
      }, SHOW_TIME_SC);
    }, 1000);
  }, []);

  const voltear = () => {
    if(showPhase) return
    setFlipped(true);
    //TODO: Comparar ID
  };



  return (
    <div onClick={voltear} className="flip-card-button">
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
