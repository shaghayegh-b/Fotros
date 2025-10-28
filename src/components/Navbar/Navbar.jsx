import { useState, createContext, memo, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link, NavLink } from "react-router-dom";

import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiShoppingCartLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { MdClose, MdKeyboardArrowDown } from "react-icons/md";
import { LuCircleUser } from "react-icons/lu";
import logoimg from "../../assets/img/Fotros.png";
import wingfotros from "../../assets/img/wingfotros.png";

import { useCart } from "../../context/CartContext/CartContext";
import { useAxios } from "../../context/AxiosContaext/AxiosContaext";
import { useSearch } from "../../context/SearchContext/SearchContext";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { PRODUCT_CATEGORIES } from "../../constants/categories";
import Meno from "../Meno/Meno";
import SearchBar from "../SearchBar/SearchBar";

import "./Navbar.css";

export const mymeno = createContext();

function Navbar() {
  const [fSearch, setFSearch] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [meno, setMeno] = useState(false);

  const { cartItems } = useCart();
  const { funcAxios, applyFilter, setSortFilter, setOnlyAvailable } =
    useAxios();
  const { searchProducts, searchedProducts, searchQuery } = useSearch();
  const { isLoggedIn, user } = useAuth();

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
    0
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

  return (
    <>
      {/* Navbar */}
      <div
        className={`Navbar bg-[#fffffff7] py-[5px] px-[3px] md:p-[unset] border-b-[3px] border-b-solid border-b-[#f5f5f5]  w-full fixed top-0 z-20 `}
      >
        <div
          className={`Navbarchild px-[8px] lg:px-[15px] w-full flex items-center justify-between  shadow-[0px 4px 4px 0px rgba(0, 0, 0, 0.04)]
            ${fSearch ? "hidden" : "flex"} `}
        >
          {/* menumobile */}
          <button
            onClick={() => setMeno(true)}
            className="flex-1 lg:flex-0 inline-block lg:hidden"
          >
            <HiBars3BottomRight />
          </button>
          {/* menumd */}
          <div className="hidden flex-3 lg:flex items-center gap-[21px] ">
            <div className="flex items-center gap-[7px] px-[5px]">
              <div className="relative w-[45px] h-[55px] mb-[2px]">
                <img
                  src={wingfotros}
                  alt="Logoimg"
                  className=" w-[37px] absolute top-[-3px] left-0 "
                />
              </div>
              <h2 className="font-semibold text-[130%]">فطروس</h2>
            </div>
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
                  <div className="rounded-lg border border-[#afafaf] w-[105px] h-[fit-content] absolute top-[31px] left-0 bg-[#f5f5f5]">
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <NavLink
                        key={cat.name}
                        to="/Fotros/Products"
                        onClick={() => {
                          funcAxios(cat.url);
                          setSortFilter("");
                          setOnlyAvailable(false);
                          applyFilter("", false, cat.filterName);
                        }}
                        className=" flex justify-center items-center border-b border-b-[#d8d4d4c9] w-full px-[7px] py-[5px] hover:bg-[#e0dede] "
                      >
                        {cat.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
              {["ست", "محصولات جدید", "فروش ویژه"].map((filterName) => {
                const category = PRODUCT_CATEGORIES.find(
                  (c) => c.filterName === filterName
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
                      applyFilter("", false, category.filterName);
                    }}
                  >
                    {filterName}
                  </NavLink>
                );
              })}
            </div>
          </div>
          {/* logo */}
          <div className="flex-3 h-[29px] self-center mx-[8px] flex justify-center lg:hidden">
            <img src={logoimg} alt="Logoimg" className=" h-[24px]" />
          </div>
          {/* search & shopping & userdashboard */}
          <div className="flex-1 lg:flex-0 flex gap-[4px] md:gap-[8px] justify-end items-center ">
            {/* search desktop */}
            <SearchBar
              mode="desktop"
              ref={searchRef}
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

            <button
              onFocus={() => setFSearch(true)}
              className={`lg:hidden   py-[2px] lg:py-[6px] rounded-xl
              ${totalQuantity == 0 ? "mx-[4px] lg:mx-[8px]" : "mx-[10px] lg:mx-[12px]"}`}
            >
              <IoSearchSharp />
            </button>
            {/* shopping */}
            <NavLink to="/Fotros/ShoppingCart" className="relative">
              <RiShoppingCartLine />
              {!totalQuantity == 0 && (
                <span className="absolute bottom-[-2px] right-[-10px] py-[3px] px-[4px] rounded-full text-[45%] bg-blue-400 text-white shadow-sm">
                  {totalQuantity}
                </span>
              )}
            </NavLink>
            {/* userdashboard */}
            {isLoggedIn ? (
              <NavLink
                to="/Fotros/userdashboard/UserInfo"
                className="h-full w-[80px] lg:w-[115px] hidden md:flex items-center justify-around gap-2 px-[6px] py-[2px] rounded-full bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
              >
                <img
                  src={user.profilePic}
                  alt={user.fname}
                  className="h-[1.2rem] md:h-[2rem] rounded-full object-cover border border-white shadow-sm"
                />
                <p className=" flex-1 text-center text-ellipsis whitespace-nowrap ">
                  {user.fname}
                </p>
                <MdKeyboardArrowDown className="hidden lg:inline-block shrink-0" />
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
            className={`fixed top-[38px] md:top-[60px] left-[50%] md:left-[160px] -translate-x-1/2 w-full md:w-[300px] bg-white border border-gray-300 shadow-lg rounded-lg z-5 transform transition-all duration-300 ease-in-out ${
              isSearchDropdownOpen
                ? "scale-y-100 opacity-100"
                : "scale-y-0 opacity-0"
            } origin-top max-h-[72vh] md:max-h-[90vh] flex flex-col`}
          >
            <div className=" text-[105%] flex justify-between items-center  p-2 border-b border-gray-300">
              <h5>{searchQuery}</h5>
              <button
                onClick={() => {
                  setIsSearchDropdownOpen(false);
                  setFSearch(false);
                  setinputValue("");
                  searchProducts("");
                }}
                className="hover:text-gray-700 font-bold"
              >
                <MdClose />
              </button>
            </div>

            <div className=" flex-1 overflow-y-auto">
              {searchedProducts.slice(0, 8).map((p) => (
                <Link
                  key={p.idsortby}
                  to={`/Fotros/Products/${p.idsortby}`}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-[100px] h-[100px]">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="h-full object-cover rounded"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <span className="text-sm font-semibold text-gray-700">
                      {p.title}
                    </span>
                    <div className="flex items-baseline gap-2">
                      {p.off > 0 && (
                        <span className="text-gray-400 line-through text-xs">
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
            <div className="border-t border-gray-300">
              {searchedProducts.length > 0 && (
                <button
                  onClick={() => {
                    setIsSearchDropdownOpen(false);
                    navigate("/Fotros/Products");
                  }}
                  className="w-full py-2 text-center bg-[#1e88e5] text-white hover:bg-[#1874c4] rounded-b-lg"
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
              className={`rounded-full shadow flex justify-center items-center bg-[#d9dadb] m-[8px]
                        ${meno ? "" : "hidden"}`}
            />
          </div>
        </div>
        {/* serchmobile */}
        {fSearch && (
          <div className="bg-[#ffff] w-full fixed top-0 z-2 flex justify-center">
            <SearchBar
              mode="mobile"
              ref={searchRef}
              inputValue={inputValue}
              onChange={(e) => {
                setinputValue(e.target.value);
                searchProducts(e.target.value);
                setIsSearchDropdownOpen(e.target.value.length > 0);
              }}
              onFocus={() =>
                setIsSearchDropdownOpen(searchedProducts.length > 0)
              }
              onClose={() => {
                setFSearch(false);
                setIsSearchDropdownOpen(false);
                setinputValue("");
                searchProducts("");
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
export default memo(Navbar);
