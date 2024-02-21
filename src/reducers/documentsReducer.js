import * as types from "../constants/actionTypes";

const initialState = {
  documents: {},
  loading: false,
  error: null,
};

const documentListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_DOCUMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_DOCUMENTS_SUCCESS:
      return {
        ...state,
        documents: action.payload.documents,
        loading: false,
        error: null,
      };
    case types.FETCH_DOCUMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case types.ADD_DOCUMENT:
      return {
        ...state,
        documents: { ...state.documents, ...action.payload.document },
      };
    default:
      return state;
  }
};

export default documentListReducer;
