import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { PRODUCT_CATEGORIES } from "../../constants/categories";

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

// کلید واقعی دسته‌بندی که برای فیلتر روی item.category استفاده میشه
// (ممکنه با برچسب نمایشی selectedCategory فرق داشته باشه)
const [categoryMatchKey, setCategoryMatchKey] = useState(() => {
  return localStorage.getItem("categoryMatchKey") || "";
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
  // اگه همین url اخیراً (کمتر از CACHE_DURATION) گرفته شده باشه، دوباره از
  // شبکه نمی‌گیره و از کش استفاده می‌کنه؛ این باعث میشه موقع رفتن و برگشتن
  // بین صفحات، لودینگ الکی نشون داده نشه.
  async function funcAxios(url) {
    const lastFetch = parseInt(localStorage.getItem("productsFetchTime")) || 0;
    const lastUrl = localStorage.getItem("productsFetchUrl") || "";
    const cachedData = JSON.parse(localStorage.getItem("products")) || [];
    const now = Date.now();

    if (
      lastUrl === url &&
      cachedData.length &&
      now - lastFetch < CACHE_DURATION
    ) {
      setAllProducts(cachedData);
      setFilteredProducts(cachedData);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(url);
      const newData = res.data;

      setAllProducts(newData);
      setFilteredProducts(newData);
      localStorage.setItem("products", JSON.stringify(newData));
      localStorage.setItem("productsFetchTime", Date.now().toString());
      localStorage.setItem("productsFetchUrl", url);
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
  const allUrl = "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?sortBy=idsortby&order=desc";

  if (cachedData.length && now - lastFetch < CACHE_DURATION) {
    setAllProducts(cachedData);
    setFilteredProducts(cachedData);
    if (!localStorage.getItem("productsFetchUrl")) {
      localStorage.setItem("productsFetchUrl", allUrl);
    }
  } else {
    funcAxios(allUrl);
  }
}, []);

  // تابع فیلتر کردن داده‌ها
function applyFilter(
  newSort = sortFilter,
  newAvailable = onlyAvailable,
  newCategory = selectedCategory,
  newMatchCategory
) {
  // اگه صدا زننده کلید واقعی دسته (matchCategory) رو نداد، خودمون تشخیص
  // میدیم: اگه دسته عوض نشده همون قبلی رو نگه می‌داریم، وگرنه از روی
  // PRODUCT_CATEGORIES پیدا می‌کنیم؛ اگه دسته‌ی واقعی‌ای نبود (مثل
  // «همه محصولات» یا عنوان‌های اسلایدرهای صفحه اصلی) فیلتر دسته اعمال نمیشه.
  if (newMatchCategory === undefined) {
    if (newCategory === selectedCategory) {
      newMatchCategory = categoryMatchKey;
    } else if (!newCategory || newCategory === "همه محصولات") {
      newMatchCategory = null;
    } else {
      const found = PRODUCT_CATEGORIES.find(
        (c) => c.filterName === newCategory
      );
      newMatchCategory = found ? found.matchCategory : null;
    }
  }

  setSortFilter(newSort);
  setOnlyAvailable(newAvailable);
  setSelectedCategory(newCategory);
  setCategoryMatchKey(newMatchCategory);
  if (newMatchCategory) {
    localStorage.setItem("categoryMatchKey", newMatchCategory);
  } else {
    localStorage.removeItem("categoryMatchKey");
  }

  let result = [...allProducts];

  // فیلتر دسته‌بندی: با کلید واقعی دسته (matchCategory) مقایسه میشه، نه
  // برچسب نمایشی. چون برچسب نمایشی («شلوار و دامن») با مقدار واقعی فیلد
  // category توی دیتابیس («شلوار») فرق داره و قبلاً باعث میشد با زدن هر
  // فیلتر/مرتب‌سازی، لیست محصولات خالی بشه.
  if (newMatchCategory) {
    result = result.filter(item => item.category?.trim() === newMatchCategory.trim());
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
        categoryMatchKey,
        setCategoryMatchKey,
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
