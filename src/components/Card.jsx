import React, { useEffect, useState } from "react";
import backImage from "../assets/card_back.svg"


const Card = ({ sprite, time, coveredTime, compareCards, loss }) => {
  const [flipped, setFlipped] = useState(false);
  const [showPhase, setShowPhase] = useState(true);

  //ComponentWillMount
  useEffect(() => {
    //Tras 1 sec, muestra las cartas
    setTimeout(() => {
      setFlipped(true);
      //3 segundos despues de mostrarse, vuelven a voltearse, y ya se puede jugar.
      setTimeout(() => {
        setFlipped(false);
        setShowPhase(false);
      }, time);
    }, coveredTime);
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

export default Card;
