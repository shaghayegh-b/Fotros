import React, { createContext, useContext } from "react";
import { useAuth } from "../AuthContext/AuthContext";

const FavContext = createContext();

export function FavProvider({ children }) {
  const { user, updateUser } = useAuth();

  const favoriteItems = user?.favorites || [];

  const addToFav = (product) => {
    if (!user) return;
    const exists = favoriteItems.find((item) => item.id === product.id);
    if (!exists) {
      updateUser({ favorites: [...favoriteItems, { ...product, totalFavorites: 1 }] });
    }
  };

  const removeFromFav = (productId) => {
    if (!user) return;
    const updatedFavs = favoriteItems.filter((item) => item.id !== productId);
    updateUser({ favorites: updatedFavs });
  };

  const clearFav = () => {
    if (!user) return;
    updateUser({ favorites: [] });
  };

  const totalFavorites = favoriteItems.reduce(
    (acc, item) => acc + (item.totalFavorites || 1),
    0
  );

  return (
    <FavContext.Provider value={{ favoriteItems, addToFav, removeFromFav, clearFav, totalFavorites }}>
      {children}
    </FavContext.Provider>
  );
}

export const useFav = () => useContext(FavContext);
