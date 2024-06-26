import { post } from "../services/api";
import { addDocument } from "../actions/documentsActions";
import { getMindmap } from "../actions/mindmapActions";
import { resetChats } from "../actions/chatsActions";
import { resetNodeQuestions } from "../actions/nodeDetailsActions";
import * as types from "../constants/actionTypes";

export const setCurrentDocument = (document) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.SET_CURRENT_DOCUMENT,
        payload: document,
      });
      dispatch(getMindmap(document.fileName));
      dispatch(resetChats());
      dispatch(resetNodeQuestions());
    } catch (e) {
      console.error(e);
    }
  };
};

export const toggleIsDocumentVisible = () => ({
  type: types.TOGGLE_IS_DOCUMENT_VISIBLE,
});

export const uploadDocument = (file) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.UPLOAD_DOCUMENT_REQUEST });
      // perform API call to upload the document

      const user_id = "Aviral";
      // Construct the URL without square brackets
      let url = "upload/pdf/?user_id=" + user_id;
      const response = await post(url, file);
      // dispatch success action if needed
      dispatch({ type: types.UPLOAD_DOCUMENT_SUCCESS, payload: response });

      // dipatch action to add newDocument to DocumentList
      const newDocument = {
        [response.pdf_id]: response.file_path,
      };
      dispatch(addDocument(newDocument));
      dispatch(getMindmap(response.pdf_id));
      dispatch(resetChats());
      dispatch(resetNodeQuestions());
    } catch (err) {
      // Dispatch failure action if needed
      dispatch({ type: types.UPLOAD_DOCUMENT_FAILURE, payload: err.message });
    }
  };
};

export const fetchDocument = (documentId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.DOWNLOAD_DOCUMENT_REQUEST });
      // Make an API call

      dispatch({ type: types.DOWNLOAD_DOCUMENT_SUCCESS });
    } catch (err) {
      dispatch({ type: types.DOWNLOAD_DOCUMENT_FAILURE, payload: err.message });
    }
  };
};
