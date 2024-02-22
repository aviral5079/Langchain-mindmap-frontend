import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import documentsReducer from "../reducers/documentsReducer";
import currentDocumentReducer from "../reducers/currentDocumentReducer";
import mindmapReducer from "../reducers/mindmapReducer";

const composeMiddleware = applyMiddleware(thunk);

const configureStore = () => {
  const store = createStore(
    combineReducers({
      documentList: documentsReducer,
      currentDocument: currentDocumentReducer,
      mindmap: mindmapReducer,
    }),
    composeMiddleware
  );

  return store;
};

export default configureStore;
