import React from "react";
import LinkButton from "../components/LinkButton";
import "./Home.css";

const Home = () => {
  return (
    <div className="homePage">
      <div className="title">
        <h1>BUSCA LAS PAREJAS</h1>
      </div>
      <LinkButton path="game">JUGAR</LinkButton>
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
