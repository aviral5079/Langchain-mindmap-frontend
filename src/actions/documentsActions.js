import * as types from "../constants/actionTypes";
// import { get, post } from '../utils/api'; // Assuming you have utility functions for making API requests

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

// Action creator for adding a document
export const addDocument = (document) => ({
  type: types.ADD_DOCUMENT,
  payload: { document },
});

// Thunk action creator to fetch documents from the backend
// export const fetchDocuments = () => async (dispatch) => {
//   try {
//     dispatch(fetchDocumentsRequest());
//     const documents = await get("http://127.0.0.1:5000", "/documents"); // Example API endpoint for fetching documents
//     dispatch(fetchDocumentsSuccess(documents));
//   } catch (error) {
//     dispatch(
//       fetchDocumentsFailure(error.message || "Failed to fetch documents")
//     );
//   }
// };
