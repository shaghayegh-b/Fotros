import Home from "./pages/Home/Home";
import ProductId from "./pages/ProductId/ProductId";
import Products from "./pages/Products/Products";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";

export let router = [
  { path: "/Fotros/", element: <Home /> },
  { path: "/Fotros/Products", element: <Products /> },
  { path: "/Fotros/Products/:idsortby", element: <ProductId /> },
  { path: "/Fotros/ShoppingCart", element: <ShoppingCart /> },

];
