import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import NoPage from "./pages/NoPage/NoPage";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div id="bg-image"></div>
    <HashRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Home />} />
          <Route path="game" element={<Game />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
