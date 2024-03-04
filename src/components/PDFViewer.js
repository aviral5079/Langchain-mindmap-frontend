import React from "react";
import { connect } from "react-redux";
import { BASE_URL } from "../constants/baseURL";

const PDFViewer = ({ currentDocument }) => {
  if (currentDocument.fileName !== null) {
    return (
      <div className="pdf-container">
        <iframe
          title={currentDocument.fileName}
          src={`${BASE_URL}/download/pdf/?file_path=${currentDocument.fileUrl}`}
        />
      </div>
    );
  } else {
    return (
      <div className="not-available">
        <h1>UPLOAD/SELECT A DOCUMENT TO GET STARTED</h1>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  currentDocument: state.currentDocument,
});

export default connect(mapStateToProps)(PDFViewer);
