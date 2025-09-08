import Home from "./pages/Home/Home";
import ProductId from "./pages/ProductId/ProductId";
import Products from "./pages/Products/Products";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactUs from "./pages/ContactUs/ContactUs";
import Questions from "./pages/Questions/Questions";
import RulesPage from "./pages/RulesPage/RulesPage";
import RepolPage from "./pages/RepolPage/RepolPage";

export let router = [
  { path: "/Fotros/", element: <Home /> },
  { path: "/Fotros/Products", element: <Products /> },
  { path: "/Fotros/Products/:idsortby", element: <ProductId /> },
  { path: "/Fotros/ShoppingCart", element: <ShoppingCart /> },
  { path: "/Fotros/aboutme", element: <AboutPage /> },
    { path: "/Fotros/contactus", element: <ContactUs /> },
    { path: "/Fotros/questions", element: <Questions /> },
    { path: "/Fotros/rules", element: <RulesPage /> },
    { path: "/Fotros/repol", element: <RepolPage /> },

];
