import axios from "axios";
import React, { createContext, useContext, useState } from "react";

// 1. ساخت Context
const AxiosContext = createContext();

// 2. ساخت Provider
export function AxiosProvider({ children }) {
  const [isAxios, setIsAxios] = useState([]); // دیتای اصلی
  const [filteredProducts, setFilteredProducts] = useState([]); // دیتای فیلتر شده
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortFilter, setSortFilter] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // تابع دریافت داده از API
  async function funcAxios(url) {
    try {
      setLoading(true);
      const res = await axios.get(url);
      setIsAxios(res.data);
      setFilteredProducts(res.data); // وقتی دیتا میاد، فیلترشده هم برابرشه
    } catch (error) {
      console.error("خطا در دریافت دیتا:", error);
    } finally {
      setLoading(false);
    }
  }

  // تابع فیلتر کردن داده‌ها
function applyFilter(newSort = sortFilter, newAvailable = onlyAvailable) {
    setSortFilter(newSort);
    setOnlyAvailable(newAvailable);

    let result = [...isAxios];

    if (newAvailable) {
      result = result.filter(item => item.remaining !== "اتمام موجودی");
    }

    switch (newSort) {
      case "cheapest":
        result.sort((a, b) => a.price - b.price);
        break;
      case "mostExpensive":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => Number(b.id) - Number(a.id));
        break;
      case "mostDiscount":
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }


  return (
    <AxiosContext.Provider
      value={{
        isAxios,
        filteredProducts,
        funcAxios,
        loading,
        setLoading,
        selectedCategory,
        setSelectedCategory,
        applyFilter,
        sortFilter,
        setSortFilter,
        onlyAvailable,
        setOnlyAvailable,
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
}

// 3. هوک آماده برای استفاده در کامپوننت‌ها
export function useAxios() {
  return useContext(AxiosContext);
}
