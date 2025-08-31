import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AxiosProvider } from "./context/AxiosContaext/AxiosContaext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
                <AxiosProvider>
                   <App></App>   </AxiosProvider>
    </BrowserRouter>
  </React.StrictMode>
);
