import * as types from "../constants/actionTypes";

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
