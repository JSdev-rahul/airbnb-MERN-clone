import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import axios from "axios";
import { removeToken } from "./redux/slices/auth.slice";

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response } = error;
    let errorObj = { error: response };

    switch (response.status) {
      case 401:
      // store.dispatch(removeToken());
      // localStorage.clear();
      // return (window.location.href = "/");
      case 404:
      case 403:
        errorObj.error = response?.data?.message;
        break;
      case 400:
        errorObj = {
          errorType: "fieldError",
          error: response.data,
        };
        break;
      case 422:
        errorObj.error = response.data?.errors;
      case 409:
        errorObj.error = response.data;
        break;
      default:
        break;
    }

    return Promise.reject(errorObj);
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
