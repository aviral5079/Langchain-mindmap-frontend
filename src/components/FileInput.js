import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Select, Stack, Button } from "@chakra-ui/react";
import { uploadDocument } from "../actions/currentDocumentActions";
import { addDocument } from "../actions/documentsActions";
import { fileOptions as options } from "../constants/fileOptions";

const FileInput = ({ isUploading }) => {
  const [newDocument, setNewDocument] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const addDocument = async (e) => {
    e.preventDefault();
    if (newDocument.trim() !== "") {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("pdf_file", selectedFile);
        try {
          setNewDocument("");
          setSelectedFile(null);
          dispatch(uploadDocument(formData));
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewDocument(file.name);
    setSelectedFile(file);
  };

  return (
    <div className="file-input-container">
      <form>
        <Stack spacing={3}>
          <h3>Upload Document</h3>
          <Select defaultValue={"option1"}>
            {options.map((option, index) => (
              <option key={index} value={`option${index + 1}`}>
                {option}
              </option>
            ))}
          </Select>
          <input
            id="file-input"
            type="file"
            required={true}
            onChange={handleFileChange}
          />
          <Button
            className="file-submit-btn"
            onClick={addDocument}
            isLoading={isUploading}
            loadingText="Uploading"
          >
            Upload
          </Button>
        </Stack>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isUploading: state.currentDocument.uploading,
});

const mapDispatchToProps = {
  uploadDocument,
  addDocument,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileInput);
