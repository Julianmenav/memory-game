import React, { useState } from "react";





const Card = ({sprite}) => {
  const [volteada, setVolteada] = useState(false);
  


  const voltear = () => {
    setVolteada(!volteada);
    //TODO: Animation
  };

  const img = <img src={sprite.img} alt="img_carta" />
  // const style = volteada ? "buttonCard" : "pollarda"
  return(
  <button className="buttonCard" onClick={voltear}>
    {volteada ? img : null}
  </button>

  )
};

export default Card;
