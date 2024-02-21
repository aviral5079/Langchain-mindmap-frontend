import * as types from "../constants/actionTypes";

const initialState = {
  fileName: null,
  fileUrl: null,
  uploading: false,
  downloading: false,
  uploadingError: null,
  downloadingError: null,
};

const documentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_DOCUMENT:
      return {
        ...state,
        fileName: action.payload.fileName,
        fileUrl: action.payload.fileUrl,
      };
    case types.UPLOAD_DOCUMENT_REQUEST:
      return {
        ...state,
        uploading: true,
        uploadingError: null,
      };
    case types.DOWNLOAD_DOCUMENT_REQUEST:
      return { ...state, downloading: true, downloadingError: null };
    case types.UPLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        fileName: action.payload.pdf_id,
        fileUrl: action.payload.file_path,
        uploading: false,
        uploadingError: null,
      };
    case types.DOWNLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        downloading: false,
        downloadingError: null,
      };
    case types.UPLOAD_DOCUMENT_FAILURE:
      return {
        ...state,
        uploading: false,
        uploadingError: action.payload,
        fileUrl: null,
      };
    case types.DOWNLOAD_DOCUMENT_FAILURE:
      return {
        ...state,
        downloading: false,
        downloadingError: action.payload,
        fileUrl: null,
      };
    default:
      return state;
  }
};

export default documentReducer;
