import Home from "./pages/Home/Home";
import ProductId from "./pages/ProductId/ProductId";
import Products from "./pages/Products/Products";

export let router = [
  { path: "/Fotros/", element: <Home /> },
  { path: "/Fotros/Products", element: <Products /> },
  { path: "/Fotros/Products/:idsortby", element: <ProductId /> },
];
