import React from "react";
import { useNavigate } from "react-router-dom";

const LinkButton = ({ children, path }) => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <button type="button" className="linkButton" onClick={handleClick}>
      {children}
    </button>
  );
};

export default LinkButton;
