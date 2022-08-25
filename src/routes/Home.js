import React from "react";
import LinkButton from "../components/LinkButton";

const Home = () => {
  return (
    <div className="homePage">
      <h1>Juego de Memoria</h1>
      <h3>Trata de emparejar correctamente las cartas que se muestren</h3>
      <LinkButton path="game">START</LinkButton>
      <div className="author">
        Designed and Coded by <br />
        <a
          href="https://github.com/Julianmenav/"
          target="_blank"
          rel="noreferrer"
        >
          Julian Mena
        </a>
      </div>
    </div>
  );
};

export default Home;
