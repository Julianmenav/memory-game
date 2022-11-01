import React from "react";
import LinkButton from "../../components/LinkButton";
import title from "../../assets/title.png";
import "./Home.css";

const Home = () => {
  return (
    <div className="homePage">
      <div className="title">
        <img src={title} alt="" />
      </div>
      <LinkButton path="game">JUGAR</LinkButton>
      <a
        href="https://github.com/Julianmenav/"
        target="_blank"
        rel="noreferrer"
        className="author"
      >
        <div >
          Designed and Coded by <br />
          <span className="authorName">Julian Mena</span>
        </div>
      </a>
    </div>
  );
};

export default Home;
