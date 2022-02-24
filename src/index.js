import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./modules";
import { composeWithDevTools } from "redux-devtools-extension";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
const store = createStore(rootReducer, composeWithDevTools());
//composeWithDevTools 리덕스 개발자 도구 활성화

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
