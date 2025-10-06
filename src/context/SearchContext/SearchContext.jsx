import { createContext, useContext, useState } from "react";
import { useAxios } from "../AxiosContaext/AxiosContaext"; // برای دسترسی به allProducts

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const { allProducts } = useAxios(); // محصولات اصلی از axios context
  const [searchedProducts, setSearchedProducts] = useState([]);
const [searchQuery, setSearchQuery] = useState(""); // اضافه کردن state برای query

  function searchProducts(query) {
  setSearchQuery(query); // <-- این خط اضافه شد
  if (!query.trim()) {
    setSearchedProducts([]);
    return;
  }

  const result = allProducts.filter(item =>
    item.title?.toLowerCase().includes(query.toLowerCase()) ||
    item.category?.toLowerCase().includes(query.toLowerCase())
  );

  setSearchedProducts(result);
}


  return (
<SearchContext.Provider value={{ searchedProducts, searchProducts, searchQuery }}>
  {children}
</SearchContext.Provider>

  );
}

export function useSearch() {
  return useContext(SearchContext);
}
