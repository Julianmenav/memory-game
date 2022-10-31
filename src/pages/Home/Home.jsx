import React from "react";
import LinkButton from "../../components/LinkButton";
import title from "../../assets/title.png"
import "./Home.css";


const Home = () => {
  return (
    <div className="homePage">
      <div className="title">
        <img src={title} alt="" />
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
