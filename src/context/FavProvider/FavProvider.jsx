import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const FavContext = createContext();

export function FavProvider({ children }) {
  const [favoriteItems, setFavoriteItems] = useState(() => {
    const saved = localStorage.getItem("favoriteItems");
    return saved ? JSON.parse(saved) : [];
  });

  // ذخیره در LocalStorage هر بار که تغییر کرد
  useEffect(() => {
    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  // بارگذاری اولیه از MockAPI علاقه‌مندی‌ها
  useEffect(() => {
    axios
      .get("https://68ada2e7a0b85b2f2cf41848.mockapi.io/favorite/favorite")
      .then(res => {
        const products = res.data.map(item => ({
          id: item.productId,
          totalFavorites: 1,
        }));
        setFavoriteItems(products);
      })
      .catch(err => console.error("Load favorites error:", err));
  }, []);

  // اضافه کردن محصول
  const addToFav = async (product) => {
    const exists = favoriteItems.find(item => item.id === product.id);

    if (!exists) {
      setFavoriteItems(prev => [...prev, { ...product, totalFavorites: 1 }]);
      try {
        await axios.post(
          "https://68ada2e7a0b85b2f2cf41848.mockapi.io/favorite/favorite",
          { productId: product.id, fav: true }
        );
      } catch (err) {
        console.error("Add favorite error:", err);
      }
    }
  };

  // حذف محصول
  const removeFromFav = async (productId) => {
    setFavoriteItems(prev => prev.filter(item => item.id !== productId));
    try {
      const res = await axios.get(
        "https://68ada2e7a0b85b2f2cf41848.mockapi.io/favorite/favorite"
      );
      const favItem = res.data.find(i => i.productId === productId);
      if (favItem) {
        await axios.delete(
         ` https://68ada2e7a0b85b2f2cf41848.mockapi.io/favorite/favorite/${favItem.id}`
        );
      }
    } catch (err) {
      console.error("Remove favorite error:", err);
    }
  };

  // پاک کردن کل علاقه‌مندی‌ها
  const clearFav = () => setFavoriteItems([]);

  // تعداد کل علاقه‌مندی‌ها
  const totalFavorites = favoriteItems.reduce(
    (acc, item) => acc + item.totalFavorites,
    0
  );

  return (
    <FavContext.Provider
      value={{
        favoriteItems,
        addToFav,
        removeFromFav,
        clearFav,
        totalFavorites,
      }}
    >
      {children}
    </FavContext.Provider>
  );
}

// هوک برای استفاده راحت
export const useFav = () => useContext(FavContext);
