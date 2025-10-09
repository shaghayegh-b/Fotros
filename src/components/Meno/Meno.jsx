import { memo, useEffect, useState } from "react";
import "./Meno.css";
import { mymeno } from "../Navbar/Navbar";
import { useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "../../constants/categories";
import { useAxios } from "../../context/AxiosContaext/AxiosContaext";
import {
  AiOutlineLink,
  AiOutlineMessage,
  AiOutlineProduct,
} from "react-icons/ai";
import { HiArrowCircleLeft } from "react-icons/hi";

import { CgProfile } from "react-icons/cg";
import { FaHeart, FaMapMarkerAlt, FaShoppingCart } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import {
  MdCategory,
  MdDarkMode,
  MdKeyboardArrowUp,
  MdLightMode,
} from "react-icons/md";
import { BiHeart } from "react-icons/bi";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { FiLogOut } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { HiHome } from "react-icons/hi2";
function Meno() {
  const { isLoggedIn, user, logout } = useAuth();

  const [grouping, setGrouping] = useState(false);
  const { meno, setMeno } = useContext(mymeno);
  const { funcAxios, applyFilter, setSortFilter, setOnlyAvailable } =
    useAxios();
  const [isDark, setIsDark] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches &&
        !localStorage.getItem("theme"))
    );
  });
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  const location = useLocation();

  return (
    <>
      <div
        className={`Meno h-[100vh]    transition-all duration-300 ease-in-out ${
          meno ? "w-[85vw]" : "w-[0]"
        } `}
      >
        <div className="overflow-y-scroll h-[inherit]">
          {isLoggedIn && (
            <Link
              to="/Fotros/userdashboard/UserInfo"
              className="Meno1 bg-blue-300 w-[100%] flex flex-row p-3 py-8 gap-3 items-center"
            >
              <div className="w-[3.5rem] h-[3.5rem] rounded-full flex justify-center items-center">
                <img
                  src={user.profilePic}
                  alt={user.fname}
                  className="w-full rounded-full "
                />
              </div>
              <div className="w-[70%]">
                <p>{user.fname}</p>
                <p dir="ltr" className="pEmail overflow-auto">
                  {user.email}
                </p>
              </div>
              <span className="HiArrowCircleLeft relative w-[7%] ">
                <HiArrowCircleLeft className=" text-[#1974ba] absolute bottom-[-0.7rem] left-[-0.6rem]" />
              </span>
            </Link>
          )}
          <div className="Meno2 flex flex-col gap-2">
            <ul className="flex flex-col gap-[20px] pb-[5px]">
              <li
                onClick={() => {
                  funcAxios(PRODUCT_CATEGORIES[0].url);
                  setSortFilter("");
                  setOnlyAvailable(false);
                  applyFilter("", false, PRODUCT_CATEGORIES[0].filterName);
                  setMeno(false);
                }}
              >
                <NavLink
                  className="flex gap-[8px] items-center  px-[7px] "
                  to="/Fotros/"
                >
                  <HiHome
                    className={` ${
                      location.pathname === "/Fotros/" ? "text-[#4f93e8]" : "text-[#042a50]"
                    }`}
                  />
                  <span className="font-[600]">صفحه اصلی</span>
                </NavLink>
              </li>
              {/* دسته بندی */}
              <li
                className={`flex flex-col gap-[10px] relative
                 `}
                onClick={() => setGrouping(!grouping)}
              >
                <div className="font-[600] flex-2 flex justify-between items-center px-[7px] py-[5px]">
                  <span className="flex-2 flex gap-[8px]">
                    <MdCategory
                      className={` ${
                        location.pathname === "/Fotros/Products" || grouping
                          ? "text-[#4f93e8]"
                          : "text-[#042a50]"
                      }`}
                    />
                    دسته بندی
                  </span>
                  <span>
                    <MdKeyboardArrowUp
                      className={` transition-all duration-300 ease-in-out ${
                        grouping ? "rotate-[180deg]" : ""
                      }`}
                    ></MdKeyboardArrowUp>
                  </span>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-500 flex flex-col  ${
                    grouping ? "block grouping rounded-lg" : "hidden"
                  }
               `}
                >
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <NavLink
                      key={cat.name}
                      to="/Fotros/Products"
                      onClick={() => {
                        funcAxios(cat.url);
                        setSortFilter("");
                        setOnlyAvailable(false);
                        applyFilter("", false, cat.filterName);
                        setMeno(false);
                      }}
                      className="tracking-tighter w-full px-[7px] py-[8px] hover:bg-[#afd2fd] border-y border-y-[#afd2fd] "
                    >
                      {cat.name}
                    </NavLink>
                  ))}
                </div>
              </li>
              {[
                { id: "userdashboard/Orders", text: "سفارش های من", icon: FaShoppingCart },
                { id: "userdashboard/Favorites", text: "علاقه مندی ها", icon: FaHeart },
                { id: "userdashboard/Addresses", text: "ادرس های من", icon: FaMapMarkerAlt },
                { id: "userdashboard/Support", text: "پشتیبانی", icon: BiSupport },
                { id: "questions", text: "سوالات متداول", icon: AiOutlineMessage },
                { id: "contactus", text: "ارتباط با ما", icon: AiOutlineLink },
              ].map(({ text, id, icon: Icon }, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setMeno(false);
                  }}
                >
                  <Link
                    to={`/Fotros/${id}`}
                    className="flex gap-[8px] items-center  px-[7px] "
                  >
                    <Icon
                      className={` ${
                        location.pathname === `/Fotros/${id}`
                          ? "text-[#4f93e8]"
                          : "text-[#042a50] "
                      }`}
                    />
                    <span className="font-[600]">{text}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <hr className=" border-gray-500" />
            <ul className="flex flex-col gap-[15px] pb-[20px]">
              <li
                title="Change Theme Mode"
                onClick={() => setIsDark(!isDark)}
                className="flex gap-[8px] items-center  px-[7px] "
              >
                {isDark ? <MdLightMode className="text-[#897705]" /> : <MdDarkMode className="text-[#042a50]" />}
                <span className="font-[600]">
                  {isDark ? "حالت روز" : "حالت شب "}
                </span>
              </li>
              {isLoggedIn ? (
                <li
                  onClick={() => {
                    logout();
                    setMeno(false);
                  }}
                >
                  <NavLink
                    to="/Fotros/"
                    className="flex gap-[8px] items-center  px-[7px]"
                  >
                    <FiLogOut className="text-[#042a50]" />
                    <span className="font-[600]">خروج از حساب کاربری</span>
                  </NavLink>
                </li>
              ) : (
                <li
                  onClick={() => {
                    setMeno(false);
                  }}
                >
                  <NavLink
                    to="/Fotros/login"
                    className="flex gap-[8px] items-center  px-[7px] "
                  >
                    <FaUserPlus className="text-[#042a50]" />
                    <span className="font-[600]">ساخت حساب کاربری</span>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default memo(Meno);
