import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AxiosProvider } from "./context/AxiosContaext/AxiosContaext";
import { FavProvider } from "./context/FavProvider/FavProvider";
import { CartProvider } from "./context/CartContext/CartContext";
import { SearchProvider } from "./context/SearchContext/SearchContext";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import { AddressProvider } from "./context/AddressContext/AddressContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AxiosProvider>
        <CartProvider>
          <SearchProvider>
            <AuthProvider>
              <FavProvider>
                <AddressProvider>
                <App></App></AddressProvider>
              </FavProvider>
            </AuthProvider>
          </SearchProvider>
        </CartProvider>
      </AxiosProvider>
    </BrowserRouter>
  </React.StrictMode>
);
