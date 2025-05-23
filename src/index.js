import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { Provider } from "react-redux";
import rootReducer from "./stores/reducers/store";
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import notificationMiddleware from "./middlewares/notificationMiddleware";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, notificationMiddleware)
);

if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
