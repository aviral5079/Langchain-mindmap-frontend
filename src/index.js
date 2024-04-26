import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { fetchDocuments } from "./actions/documentsActions";

const emotionCache = createCache({
  key: "emotion-css-cache",
  prepend: true,
});

const store = configureStore();
store.dispatch(fetchDocuments("Aviral"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CacheProvider value={emotionCache}>
    <ChakraProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </CacheProvider>
);
