import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import documentsReducer from "../reducers/documentsReducer";
import currentDocumentReducer from "../reducers/currentDocumentReducer";

const composeMiddleware = applyMiddleware(
  thunk
  // currentDocumentListenerMiddleware
);

const configureStore = () => {
  const store = createStore(
    combineReducers({
      documentList: documentsReducer,
      currentDocument: currentDocumentReducer,
    }),
    composeMiddleware
  );

  return store;
};

export default configureStore;
