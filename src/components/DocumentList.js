import React from "react";
import { connect } from "react-redux";
import { setCurrentDocument } from "../actions/currentDocumentActions";

const DocumentList = ({
  documents,
  currentDocumentName,
  setCurrentDocument,
}) => {
  return (
    <div className="doc-list">
      <h1>Documents</h1>
      {Object.keys(documents).map((documentName) => {
        return (
          <li
            className={
              currentDocumentName === documentName
                ? "doc-listItem selected"
                : "doc-listItem"
            }
            key={documentName}
            onClick={() =>
              setCurrentDocument({
                fileName: documentName,
                fileUrl: documents[documentName],
              })
            }
          >
            {documentName}
          </li>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  documents: state.documentList.documents,
  currentDocumentName: state.currentDocument.fileName,
});

const mapDispatchToProps = {
  setCurrentDocument,
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
