import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AxiosProvider } from "./context/AxiosContaext/AxiosContaext";
import { FavProvider } from "./context/FavProvider/FavProvider";
import { CartProvider } from "./context/CartContext/CartContext";
import { SearchProvider } from "./context/SearchContext/SearchContext";
import { AuthContext } from "./context/AuthContext/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AxiosProvider>
        <FavProvider>
          <CartProvider>
            <SearchProvider>
              <AuthContext>
                <App></App>
              </AuthContext>
            </SearchProvider>
          </CartProvider>
        </FavProvider>
      </AxiosProvider>
    </BrowserRouter>
  </React.StrictMode>
);
