import * as types from "../constants/actionTypes";
import { get } from "../services/api";

export const fetchDocumentsRequest = () => ({
  type: types.FETCH_DOCUMENTS_REQUEST,
});

export const fetchDocumentsSuccess = (documents) => ({
  type: types.FETCH_DOCUMENTS_SUCCESS,
  payload: { documents },
});

export const fetchDocumentsFailure = (error) => ({
  type: types.FETCH_DOCUMENTS_FAILURE,
  payload: { error },
});

export const addDocument = (document) => ({
  type: types.ADD_DOCUMENT,
  payload: { document },
});

export const fetchDocuments = (userId) => {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_DOCUMENTS_REQUEST });

    try {
      const response = await get("getDocuments", { user_id: userId });

      dispatch({
        type: types.FETCH_DOCUMENTS_SUCCESS,
        payload: {
          documents: response.uploaded_files,
        },
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_DOCUMENTS_FAILURE,
        payload: {
          error: error.message || "Failed to fetch documents",
        },
      });
    }
  };
};
