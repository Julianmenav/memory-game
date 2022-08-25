import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

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

LinkButton.propTypes = {
  path: PropTypes.string,
};

export default LinkButton;
