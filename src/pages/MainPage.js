import React from "react";
import { connect } from "react-redux";
import PDFViewer from "../components/PDFViewer";
import Mindmap from "../components/Mindmap";
import Chatbar from "../components/Chatbar";

const MainPage = ({
  isDocumentVisible,
  isMindmapVisible,
  isChatbarVisible,
}) => {
  return (
    <div className="main-container">
      {isDocumentVisible && <PDFViewer />}
      {isMindmapVisible && <Mindmap />}
      {isChatbarVisible && <Chatbar />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isDocumentVisible: state.currentDocument.isDocumentVisible,
  isMindmapVisible: state.mindmap.isMindmapVisible,
  isChatbarVisible: state.chats.isChatbarVisible,
});

export default connect(mapStateToProps)(MainPage);
