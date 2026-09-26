// src/constants/apiEndpoints.js

const BASE_URL = "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store";

export const API_ENDPOINTS = {
  ALL_PRODUCTS: `${BASE_URL}/products?sortBy=idsortby&order=desc`,
  CATEGORY: (cat) => `${BASE_URL}/products?category=${cat}`,
  SORT_BY_OFF: `${BASE_URL}/products?sortBy=off&order=desc`,
  SPORT_SETS: `${BASE_URL}/products?category=ست`,
  NEW_PRODUCTS: `${BASE_URL}/products?sortBy=idsortby&order=desc`,
  PANTS_SKIRTS: `${BASE_URL}/products?category=شلوار`,
  // TODO: بک‌اند فعلاً فیلد "تعداد فروش" نداره. وقتی فیلد sales/salesCount
  // به مدل محصول اضافه شد، این رو به sortBy=sales&order=desc تغییر بده.
  BEST_SELLERS: `${BASE_URL}/products?sortBy=idsortby&order=desc`,
};
