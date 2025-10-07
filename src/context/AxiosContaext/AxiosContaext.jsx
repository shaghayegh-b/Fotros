import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

// 1. ساخت Context
const AxiosContext = createContext();
const CACHE_DURATION = 5 * 60 * 1000;
// 2. ساخت Provider
export function AxiosProvider({ children }) {

const [allProducts, setAllProducts] = useState(() => {
  return JSON.parse(localStorage.getItem("products")) || [];
});

const [filteredProducts, setFilteredProducts] = useState(() => {
  return JSON.parse(localStorage.getItem("products")) || [];
});
  const [loading, setLoading] = useState(false);

    const [sortFilter, setSortFilter] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

const [selectedCategory, setSelectedCategory] = useState(() => {
  return localStorage.getItem("selectedCategory") || "";
});


// هر بار که selectedCategory تغییر کنه، چک می‌کنیم
useEffect(() => {
  const oldCategory = localStorage.getItem("selectedCategory") || "";

  // فقط اگه مقدار جدید با مقدار قبلی فرق داشت، ذخیره کن
  if (selectedCategory !== oldCategory) {
    if (selectedCategory === "") {
      localStorage.removeItem("selectedCategory");
    } else {
      localStorage.setItem("selectedCategory", selectedCategory);
    }
  }
}, [selectedCategory]);



  // تابع دریافت داده از API
async function funcAxios(url) {
  try {
    setLoading(true);
    const res = await axios.get(url);
    const newData = res.data;

    const oldData = JSON.parse(localStorage.getItem("products")) || [];

    if (JSON.stringify(newData) !== JSON.stringify(oldData)) {
      setAllProducts(newData);
      setFilteredProducts(newData);
      localStorage.setItem("products", JSON.stringify(newData));
      localStorage.setItem("productsFetchTime", Date.now().toString()); // ذخیره زمان
    }
  } catch (error) {
    console.error("خطا در دریافت دیتا:", error);
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  const cachedData = JSON.parse(localStorage.getItem("products")) || [];
  const lastFetch = parseInt(localStorage.getItem("productsFetchTime")) || 0;
  const now = Date.now();

  if (cachedData.length && now - lastFetch < CACHE_DURATION) {
    setAllProducts(cachedData);
    setFilteredProducts(cachedData);
  } else {
    funcAxios("https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?sortBy=idsortby&order=desc");
  }
}, []);

  // تابع فیلتر کردن داده‌ها
function applyFilter(
  newSort = sortFilter,
  newAvailable = onlyAvailable,
  newCategory = selectedCategory
) {
  setSortFilter(newSort);
  setOnlyAvailable(newAvailable);
  setSelectedCategory(newCategory);

  let result = [...allProducts];

  // فیلتر دسته‌بندی
  if (newCategory && newCategory !== "همه محصولات") {
    result = result.filter(item => item.category?.trim() === newCategory.trim());
  }

  // فیلتر موجودی
 if (newAvailable) {
  result = result.filter(item => item.remaining !== "اتمام موجودی");
}


  // مرتب‌سازی
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
      result.sort((a, b) => (b.off || 0) - (a.off || 0));
      break;
    default:
      break;
  }

  setFilteredProducts(result);
};




  return (
    <AxiosContext.Provider
      value={{
        allProducts,
        setAllProducts,
        filteredProducts,
        setFilteredProducts,
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
