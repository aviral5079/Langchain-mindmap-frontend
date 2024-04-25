import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Select, Stack, Button } from "@chakra-ui/react";
import { uploadDocument } from "../actions/currentDocumentActions";
import { addDocument } from "../actions/documentsActions";
import { fileOptions as options } from "../constants/fileOptions";

const FileInput = ({ isUploading }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const dispatch = useDispatch();

  const addDocuments = async (e) => {
    e.preventDefault();
    if (selectedFiles.length > 0) {
      try {
        const uploadPromises = selectedFiles.map((file) => {
          const formData = new FormData();
          formData.append("pdf_file", file);
          return dispatch(uploadDocument(formData));
        });
        await Promise.all(uploadPromises);
        setSelectedFiles([]);
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newFiles = Array.from(files);
    setSelectedFiles(newFiles);
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
            multiple
          />
          <Button
            className="file-submit-btn"
            onClick={addDocuments}
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
