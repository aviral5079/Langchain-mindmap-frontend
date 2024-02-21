import React from "react";
import FileButton from "./FileButton";
import "../styles/Appbar.scss";
import logoImage from "../assets/images/logo.png";

const Appbar = () => {
  return (
    <div className="appbar">
      <div className="left-section">
        <FileButton />
      </div>
      <div className="middle-section">
        <img className="app-logo" src={logoImage} alt="logo" />
        <h1 className="app-name">DocMind AI</h1>
      </div>
      <div className="right-section">
        <button className="nav-button">PDF</button>
        <button className="nav-button">Mindmap</button>
        <button className="nav-button">Chat</button>
      </div>
    </div>
  );
};

export default Appbar;
