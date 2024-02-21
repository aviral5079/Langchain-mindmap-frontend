import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
);
