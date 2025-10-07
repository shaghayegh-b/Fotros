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
              <div className="w-[2rem] h-[2rem] rounded-full flex justify-center items-center">
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
            <ul className="flex flex-col gap-[15px]">
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
                      location.pathname === "/Fotros/" ? "text-[#4f93e8]" : ""
                    }`}
                  />
                  <span className="font-[600]">صفحه اصلی</span>
                </NavLink>
              </li>
              <li
                className={`flex flex-col gap-[10px] relative
                 `}
                onClick={() => setGrouping(!grouping)}
              >
                <div className="font-[600] flex-2 flex justify-between items-center px-[7px] py-[5px]">
                  <span className="flex-2 flex gap-[8px]">
                    <MdCategory
                      className={`${
                        location.pathname === "/Fotros/Products" || grouping
                          ? "text-[#4f93e8]"
                          : ""
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
                      className="tracking-tighter w-full px-[7px] py-[5px] hover:bg-[#afd2fd] border-y border-y-[#afd2fd] "
                    >
                      {cat.name}
                    </NavLink>
                  ))}
                </div>
              </li>
              <li
                onClick={() => {
                  setMeno(false);
                }}
              >
                <Link
                  to="/Fotros/userdashboard/Favorites"
                  className="flex gap-[8px] items-center  px-[7px] "
                >
                  <BiHeart  className={` ${
                      location.pathname === "/Fotros/userdashboard/Favorites" ? "text-[#4f93e8]" : ""
                    }`} />
                  <span className="font-[600]">محصولات مورد علاقه</span>
                </Link>
              </li>
              <li
                onClick={() => {
                  setMeno(false);
                }}
              >
                <NavLink
                  to="/Fotros/questions"
                  className="flex gap-[8px] items-center  px-[7px] "
                >
                  <AiOutlineMessage  className={` ${
                      location.pathname === "/Fotros/questions" ? "text-[#4f93e8]" : ""
                    }`} />
                  <span className="font-[600]">سوالات متداول</span>
                </NavLink>
              </li>
              {/* <li
                                onClick={() => {
                          setMeno(false);
                        }}
                    className="flex gap-[8px] items-center  px-[7px] "
>
                  <a href="">
                    <i className="fa fa-bell text-[#1974ba]"></i>
                    <span className="font-[600]">اعلانات</span>
                  </a>
                </li> */}
              <li
                onClick={() => {
                  setMeno(false);
                }}
              >
                <NavLink
                  to="/Fotros/contactus"
                  className="flex gap-[8px] items-center  px-[7px] "
                >
                  <AiOutlineLink  className={` ${
                      location.pathname === "/Fotros/contactus" ? "text-[#4f93e8]" : ""
                    }`} />
                  <span className="font-[600]">ارتباط با ما</span>
                </NavLink>
              </li>
            </ul>

            <hr className=" border-gray-500" />
            <ul className="flex flex-col gap-3">
              <li
                title="Change Theme Mode"
                onClick={() => setIsDark(!isDark)}
                className="flex gap-[8px] items-center  px-[7px] "
              >
                {isDark ? <MdLightMode /> : <MdDarkMode />}
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
                    <FiLogOut />
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
                    <FaUserPlus />
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
