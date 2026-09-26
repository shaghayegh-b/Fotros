import { useState, createContext, memo, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link, NavLink } from "react-router-dom";

import { IoMdArrowDropdown } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { LuMenu, LuShoppingCart, LuSearch, LuCircleUser } from "react-icons/lu";
import logoimg from "../../assets/img/Fotros.png";
import wingfotros from "../../assets/img/wingfotros.png";
import porofDefault from "../../assets/img/porof1.png";
import { useCart } from "../../context/CartContext/CartContext";
import { useAxios } from "../../context/AxiosContaext/AxiosContaext";
import { useSearch } from "../../context/SearchContext/SearchContext";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { PRODUCT_CATEGORIES } from "../../constants/categories";
import Meno from "../Meno/Meno";
import SearchBar from "../SearchBar/SearchBar";
import CartPreview from "../CartDrawer/CartPreview";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

import "./Navbar.css";

export const mymeno = createContext();

function Navbar() {
  const [fSearch, setFSearch] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [meno, setMeno] = useState(false);
  const [cartPreviewOpen, setCartPreviewOpen] = useState(false);
  const cartHoverTimer = useRef(null);

  const { cartItems } = useCart();
  const { funcAxios, applyFilter, setSortFilter, setOnlyAvailable } =
    useAxios();
  const { searchProducts, searchedProducts, searchQuery } = useSearch();
  const { isLoggedIn, user } = useAuth();
  const searchInputRef = useRef(null);

  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // بررسی اینکه مسیر فعلی صفحه Products نیست
  const isDropdownAllowed = location.pathname !== "/Fotros/Products";
  const dropdownRefSearch = useRef(null);
  const searchRef = useRef(null);
  useEffect(() => {
    function handleClickOutsideSearch(event) {
      if (
        dropdownRefSearch.current &&
        !dropdownRefSearch.current.contains(event.target) &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setIsSearchDropdownOpen(false);
      }
    }

    if (isSearchDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutsideSearch);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideSearch);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSearch);
    };
  }, [isSearchDropdownOpen]);

  const totalQuantity = cartItems?.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  // برای بستن منو وقتی بیرون کلیک میشه
  useEffect(() => {
    function handleClickOutsideDropdown(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProductDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  const openCartPreview = () => {
    clearTimeout(cartHoverTimer.current);
    setCartPreviewOpen(true);
  };
  const closeCartPreviewDelayed = () => {
    clearTimeout(cartHoverTimer.current);
    cartHoverTimer.current = setTimeout(() => setCartPreviewOpen(false), 180);
  };

  // بستن باکس سبد خرید با کلیک بیرون از اون (هم موبایل هم دسکتاپ)
  const cartWrapRef = useRef(null);
  useEffect(() => {
    function handleClickOutsideCart(event) {
      if (cartWrapRef.current && !cartWrapRef.current.contains(event.target)) {
        setCartPreviewOpen(false);
      }
    }
    if (cartPreviewOpen) {
      document.addEventListener("mousedown", handleClickOutsideCart);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideCart);
    };
  }, [cartPreviewOpen]);

  return (
    <>
      {/* Navbar */}
      <div
        className={`Navbar glass-panel h-[50px] md:h-[unset] bg-[var(--navbar-bg)]/90 py-[5px] px-[3px] md:p-[unset] border-b border-b-solid border-[var(--navbar-bb)] shadow-[0_1px_0_rgba(0,0,0,0.02)] w-full fixed top-0 z-20 `}
      >
        <div
          className={`Navbarchild h-full px-[4px] lg:px-[25px] lg:py-[7px]  w-full flex items-center justify-between
            ${fSearch ? "hidden" : "flex"} `}
        >
          {/* menumobile */}
          <div className="w-[fit-content] flex items-center lg:hidden">
            <button
              onClick={() => setMeno(true)}
              className="flex-1 lg:flex-0 inline-block lg:hidden h-full"
            >
              <LuMenu className="!h-[1.85rem] !w-[unset] md:!h-[1.5rem] md:!w-[1.5rem] " />
            </button>
            {/* search sm */}
            <button
              onClick={() => {
                setFSearch(true);
                setTimeout(() => {
                  searchInputRef.current?.focus();
                }, 50);
              }}
              className={`flex-1 py-[2px]  rounded-xl h-full transition-transform duration-200 hover:scale-110 active:scale-95
              `}
            >
              <LuSearch className="!h-[1.85rem] !w-[unset] md:!h-[1.5rem] md:!w-[1.5rem] " />
            </button>
          </div>
          {/* menumd */}
          <div className="hidden flex-3 lg:flex items-center gap-[21px] ">
            <Link
              to="/Fotros/"
              className="flex items-center gap-[7px] px-[5px]"
            >
              <div className="relative w-[45px] h-[55px] mb-[2px]">
                <img
                  src={wingfotros}
                  alt="Logoimg"
                  className=" w-[37px] absolute top-[-3px] left-0 logo"
                />
              </div>
              <h2 className="font-semibold text-[130%]">فطروس</h2>
            </Link>
            <div className="hidden md:flex items-center gap-[21px] ">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() =>
                    setIsProductDropdownOpen(!isProductDropdownOpen)
                  }
                  className="flex items-center gap-[3px]"
                >
                  <span>محصولات</span>
                  <IoMdArrowDropdown
                    size="11"
                    className={` w-[11px] h-[11px] ${
                      isProductDropdownOpen ? "rotate-[180deg] " : ""
                    } duration-400 ease-in-out`}
                  ></IoMdArrowDropdown>
                </button>
                {isProductDropdownOpen && (
                  <div className="rounded-lg border border-[var(--navbar-md-category-b)] w-[105px] h-[fit-content] absolute top-[31px] left-0 bg-[var(--navbar-md-category)]">
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <NavLink
                        key={cat.name}
                        to="/Fotros/Products"
                        onClick={() => {
                          funcAxios(cat.url);
                          setSortFilter("");
                          setOnlyAvailable(false);
                          applyFilter(
                            "",
                            false,
                            cat.filterName,
                            cat.matchCategory,
                          );
                        }}
                        className=" flex justify-center items-center border-b border-b-[var(--navbar-md-category-b)] w-full px-[7px] py-[5px] hover:bg-[var(--cartcategory-hover)] "
                      >
                        {cat.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
              {["ست", "محصولات جدید", "فروش ویژه"].map((filterName) => {
                const category = PRODUCT_CATEGORIES.find(
                  (c) => c.filterName === filterName,
                );
                if (!category) return null;
                return (
                  <NavLink
                    key={category?.id || filterName}
                    to="/Fotros/Products"
                    onClick={() => {
                      funcAxios(category.url);
                      setSortFilter("");
                      setOnlyAvailable(false);
                      applyFilter(
                        "",
                        false,
                        category.filterName,
                        category.matchCategory,
                      );
                    }}
                  >
                    {filterName}
                  </NavLink>
                );
              })}
            </div>
          </div>
          {/* logo */}
          <Link
            to="/Fotros/"
            className="flex-3 h-[49px] self-center mx-[8px] flex justify-center lg:hidden"
          >
            <img
              src={logoimg}
              alt="Logoimg"
              className=" h-[31px] mt-[6px] logo"
            />
          </Link>
          {/* search & shopping & userdashboard */}
          <div className="flex-1 lg:flex-0 flex gap-[4px] md:gap-[8px] justify-end items-center h-full">
            {/* search desktop */}
            <SearchBar
              mode="desktop"
              ref={searchInputRef}
              inputValue={inputValue}
              onChange={(e) => {
                setinputValue(e.target.value);
                searchProducts(e.target.value);
                setIsSearchDropdownOpen(e.target.value.length > 0);
              }}
              onFocus={() =>
                setIsSearchDropdownOpen(searchedProducts.length > 0)
              }
            />

            {/* theme toggle */}
            <ThemeToggle />

            {/* shopping */}
            <div
              ref={cartWrapRef}
              className="relative h-full"
              onMouseEnter={openCartPreview}
              onMouseLeave={closeCartPreviewDelayed}
            >
              <button
                type="button"
                onClick={() => setCartPreviewOpen((prev) => !prev)}
                className="relative h-full py-[2px] transition-transform duration-200 hover:scale-110 active:scale-95"
                aria-label="سبد خرید"
                aria-expanded={cartPreviewOpen}
              >
                <LuShoppingCart className="!h-[1.85rem] !w-[unset] md:!h-[1.5rem] md:!w-[1.5rem] " />
                {totalQuantity > 0 && (
                  <span className="absolute bottom-[-2px] right-[-10px] py-[3px] px-[4px] rounded-full text-xs bg-[var(--btn)] text-white shadow-sm animate-pop">
                    {totalQuantity}
                  </span>
                )}
              </button>

              {/* پیش‌نمایش سبد خرید: هم با هاور (دسکتاپ) هم با کلیک (همه‌ی دستگاه‌ها) */}
              <div
                className={`fixed sm:absolute left-1/15 -translate-x-1/15 top-[52px] sm:top-[calc(100%+14px)] w-[92vw] sm:w-[320px] max-w-[360px] z-30 transition-all duration-200 origin-top ${
                  cartPreviewOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <CartPreview
                  onClose={() => setCartPreviewOpen(false)}
                  onGoToCheckout={() => {
                    setCartPreviewOpen(false);
                    navigate("/Fotros/ShoppingCart");
                  }}
                />
              </div>
            </div>
            {/* userdashboard */}
            {isLoggedIn ? (
              <NavLink
                to="/Fotros/userdashboard/UserInfo"
                className="w-[41px] h-full md:w-[95px] lg:w-[115px] flex items-center justify-center gap-[4px] md:px-[6px] md:py-[2px] rounded-full bg-[var(--navbar-porof)] hover:bg-[var(--navbar-porof-hover)] transition-colors duration-200"
              >
                <img
                  src={user.profilePic || porofDefault}
                  alt={user.fname}
                  className="p-[3px] md:p-[unset] h-[41px] md:h-[30px] w-[41px]  rounded-full object-cover border border-[var(--sup-b)] shadow-sm"
                />
                <p className="hidden md:inline flex-1 text-center text-ellipsis whitespace-nowrap ">
                  {user.fname}
                </p>
              </NavLink>
            ) : (
              <NavLink to="/Fotros/login">
                <LuCircleUser className="hidden md:inline-block shrink-0" />
              </NavLink>
            )}
          </div>
        </div>
        {/* search box */}
        {isDropdownAllowed && (
          <div
            ref={dropdownRefSearch}
            className={`glass-panel fixed top-[38px] md:top-[64px] left-[50%] md:left-[160px] -translate-x-1/2 w-[94%] md:w-[320px] bg-[var(--sup-sm)]/95 border border-[var(--sup-b)] shadow-2xl rounded-2xl z-5 transform transition-all duration-300 ease-in-out ${
              isSearchDropdownOpen
                ? "scale-y-100 opacity-100"
                : "scale-y-0 opacity-0"
            } origin-top max-h-[72vh] md:max-h-[90vh] flex flex-col overflow-hidden`}
          >
            <div className="text-[105%] flex justify-between items-center px-4 py-3 border-b border-[var(--sup-b)]">
              <h5 className="font-medium">{searchQuery}</h5>
              <button
                onClick={() => {
                  setIsSearchDropdownOpen(false);
                  setFSearch(false);
                  setinputValue("");
                  searchProducts("");
                }}
                className="hover:text-[var(--text-gary2)] font-bold"
              >
                <MdClose />
              </button>
            </div>

            <div className="scroll-contain thin-scroll flex-1 overflow-y-auto">
              {searchedProducts.slice(0, 8).map((p) => (
                <Link
                  key={p.idsortby}
                  to={`/Fotros/Products/${p.idsortby}`}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-[var(--cartcategory-hover)] transition-colors"
                >
                  <div className="media-box h-[64px] w-[64px] shrink-0 rounded-xl bg-[var(--sup)]">
                    <img src={p.img} alt={p.title} loading="lazy" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <span className="text-sm font-semibold text-[var(--text-gary2)] truncate">
                      {p.title}
                    </span>
                    <div className="flex items-baseline gap-2">
                      {p.off > 0 && (
                        <span className="text-[var(--text-gary)] line-through text-xs">
                          {p.price.toLocaleString()} تومان
                        </span>
                      )}
                      <span className="text-red-600 font-bold text-sm">
                        {(p.price - (p.price * p.off) / 100).toLocaleString()}
                        تومان
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="border-t border-[var(--sup-b)]">
              {searchedProducts.length > 0 && (
                <button
                  onClick={() => {
                    setIsSearchDropdownOpen(false);
                    navigate("/Fotros/Products");
                  }}
                  className="w-full py-2.5 text-center bg-[var(--btn)] text-white hover:bg-[#1874c4] transition-colors rounded-b-2xl"
                >
                  دیدن همه محصولات سرچ شده
                </button>
              )}
            </div>
          </div>
        )}

        {/* منو باز بشه اگر روی ایکون منو کلیک بشه */}
        <div
          className={`fixed z-25 top-0 h-[100vh] bg-[#000000a6]  ${
            meno ? "w-[100vw]" : "w-[0]"
          }`}
        >
          <mymeno.Provider value={{ meno, setMeno }}>
            <Meno></Meno>
          </mymeno.Provider>
          <div
            className={`menoClose h-[100vh] fixed top-0 left-0 z-25 w-[15vw] flex items-start justify-end
            ${meno ? "" : "hidden"}
            `}
            onClick={() => setMeno(false)}
          >
            <MdClose
              className={`rounded-full shadow flex justify-center items-center bg-[var(--close-menu)] m-[8px]
                        ${meno ? "" : "hidden"}`}
            />
          </div>
        </div>
        {/* serchmobile */}
        <div
          className={`fixed h-[48px] top-0 left-0 w-full z-20 flex justify-center bg-[var(--navbar-bg)] transform transition-all duration-300 ease-in-out
    ${
      fSearch
        ? "opacity-100 scale-y-100"
        : "opacity-0 scale-y-0 pointer-events-none origin-top"
    }`}
        >
          <SearchBar
            mode="mobile"
            ref={searchRef}
            inputValue={inputValue}
            onChange={(e) => {
              setinputValue(e.target.value);
              searchProducts(e.target.value);
              setIsSearchDropdownOpen(e.target.value.length > 0);
            }}
            onFocus={() => setIsSearchDropdownOpen(searchedProducts.length > 0)}
            onClose={() => {
              setFSearch(false);
              setIsSearchDropdownOpen(false);
              setinputValue("");
              searchProducts("");
            }}
          />
        </div>
      </div>
    </>
  );
}
export default memo(Navbar);
