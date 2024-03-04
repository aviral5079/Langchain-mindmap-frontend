import React from "react";
import { connect, useDispatch } from "react-redux";
import { toggleIsMindmapVisible } from "../actions/mindmapActions";
import { toggleIsChatbarVisible } from "../actions/chatsActions";
import { toggleIsDocumentVisible } from "../actions/currentDocumentActions";
import FileButton from "./FileButton";
import logoImage from "../assets/images/logo.png";

const Appbar = ({ isDocumentVisible, isMindmapVisible, isChatbarVisible }) => {
  const dispatch = useDispatch();
  return (
    <div className="appbar">
      <div className="left-section">
        <FileButton />
      </div>
      <div className="middle-section">
        <img className="app-logo" src={logoImage} alt="logo" />
        <h1 className="app-name">
          <span className="app-name__letter">V</span>
          <span className="app-name__rest">READ</span>
        </h1>
      </div>
      <div className="right-section">
        <button
          className={`nav-button ${isDocumentVisible ? "visible" : ""}`}
          onClick={() => {
            dispatch(toggleIsDocumentVisible());
            dispatch(toggleIsMindmapVisible());
          }}
        >
          PDF
        </button>
        <button
          className={`nav-button ${isMindmapVisible ? "visible" : ""}`}
          onClick={() => {
            dispatch(toggleIsMindmapVisible());
            dispatch(toggleIsDocumentVisible());
          }}
        >
          Mindmap
        </button>
        <button
          className={`nav-button ${isChatbarVisible ? "visible" : ""}`}
          onClick={() => {
            dispatch(toggleIsChatbarVisible());
          }}
        >
          Chat
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isDocumentVisible: state.currentDocument.isDocumentVisible,
  isMindmapVisible: state.mindmap.isMindmapVisible,
  isChatbarVisible: state.chats.isChatbarVisible,
});

export default connect(mapStateToProps)(Appbar);
