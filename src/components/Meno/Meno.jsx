import { memo, useState } from "react";
import "./Meno.css";
import { mymeno } from "../Navbar/Navbar";
import { useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
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
import { ThemeContext } from "../../context/ThemeContext/ThemeProvider";

import { FiLogOut } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { HiHome } from "react-icons/hi2";
import ModalAlert from "../ModalAlert/ModalAlert";
function Meno() {
  const { isLoggedIn, user, logout } = useAuth();

  const [grouping, setGrouping] = useState(false);
  const { meno, setMeno } = useContext(mymeno);
  const { funcAxios, applyFilter, setSortFilter, setOnlyAvailable } =
    useAxios();

  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalButtons, setModalButtons] = useState([]);
  const navigate = useNavigate();
  const { userTheme, setUserTheme, realTheme } = useContext(ThemeContext);

  // ترتیب چرخش حالت‌ها
  const nextTheme = () => {
    if (userTheme === "light") return "dark";
    if (userTheme === "dark") return "system";
    return "light"; // وقتی system بود → برگرد به light
  };

  const handleThemeToggle = () => {
    setUserTheme(nextTheme());
  };
  return (
    <>
      <div
        className={`Meno h-[100vh] bg-[var(--menu2)] transition-all duration-300 ease-in-out ${
          meno ? "w-[85vw]" : "w-[0]"
        } `}
      >
        <div className="overflow-y-scroll h-[inherit]">
          {isLoggedIn && (
            <Link
              to="/Fotros/userdashboard/UserInfo"
              className="Meno1 bg-[var(--menu1)] w-[100%] flex flex-row p-3 py-8 gap-3 items-center"
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
          <div className="Meno2 bg-[var(--menu2)] p-[.5rem] flex flex-col gap-2">
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
                    size={25}
                    className={` ${
                      location.pathname === "/Fotros/"
                        ? "text-[#4f93e8]"
                        : "text-[var(--icon-menu)]"
                    }`}
                  />
                  <span className="font-[600]">صفحه اصلی</span>
                </NavLink>
              </li>
              {/* دسته بندی */}
              <li className="flex flex-col relative">
                <div
                  className={`font-[600] flex justify-between items-center px-[7px] cursor-pointer  transition-all duration-500 ease-in-out ${
                    grouping ? "pb-[15px]" : ""
                  }`}
                  onClick={() => setGrouping(!grouping)}
                >
                  <span className="flex gap-[8px] items-center">
                    <MdCategory
                      size={25}
                      className={`${
                        location.pathname === "/Fotros/Products" || grouping
                          ? "text-[#4f93e8]"
                          : "text-[var(--icon-menu)]"
                      } transition-colors duration-300`}
                    />
                    دسته بندی
                  </span>
                  <MdKeyboardArrowUp
                    size={25}
                    className={`transition-transform duration-300 ease-in-out ${
                      grouping ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>

                {/* Container انیمیشن */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out`}
                  style={{
                    maxHeight: grouping ? "1000px" : "0",
                    opacity: grouping ? 1 : 0,
                  }}
                >
                  <div className="flex flex-col bg-[var(--category-menu)]">
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
                        className="tracking-tighter w-full px-[7px] py-[8px] hover:bg-[#afd2fd] rounded-lg border-y border-y-[2px] border-y-[var(--category-menu-border)]"
                      >
                        {cat.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </li>

              {[
                {
                  id: "questions",
                  text: "سوالات متداول",
                  icon: AiOutlineMessage,
                },
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
                      size={25}
                      className={` ${
                        location.pathname === `/Fotros/${id}`
                          ? "text-[#4f93e8]"
                          : "text-[var(--icon-menu)] "
                      }`}
                    />
                    <span className="font-[600]">{text}</span>
                  </Link>
                </li>
              ))}
              <li
                title="تغییر تم"
                onClick={handleThemeToggle}
                className="flex gap-[8px] items-center px-[7px] cursor-pointer"
              >
                {/* آیکون بر اساس realTheme */}
                {realTheme === "dark" ? (
                  <MdLightMode size={25} className="text-[#897705]" />
                ) : (
                  <MdDarkMode size={25} className="text-[var(--icon-menu)]" />
                )}

                {/* متن بر اساس userTheme */}
                <span className="font-[600]">
                  {userTheme === "light"
                    ? "حالت شب"
                    : userTheme === "dark"
                    ? "حالت سیستم"
                    : "حالت روز"}
                </span>
              </li>
            </ul>

            <hr className=" border-gray-500" />
            <ul className="flex flex-col gap-[15px] pb-[20px]">
              {isLoggedIn &&
                [
                  {
                    id: "userdashboard/UserInfo",
                    text: "ویرایش اطلاعات کاربری",
                    icon: CgProfile,
                  },
                  {
                    id: "userdashboard/Orders",
                    text: "سفارش های من",
                    icon: FaShoppingCart,
                  },
                  {
                    id: "userdashboard/Favorites",
                    text: "علاقه مندی ها",
                    icon: FaHeart,
                  },
                  {
                    id: "userdashboard/Addresses",
                    text: "آدرس های من",
                    icon: FaMapMarkerAlt,
                  },
                  {
                    id: "userdashboard/Support",
                    text: "پشتیبانی",
                    icon: BiSupport,
                  },
                ].map(({ text, id, icon: Icon }, idx) => (
                  <li key={idx} onClick={() => setMeno(false)}>
                    <Link
                      to={`/Fotros/${id}`}
                      className="flex gap-[8px] items-center px-[7px]"
                    >
                      <Icon
                        size={25}
                        className={`${
                          location.pathname === `/Fotros/${id}`
                            ? "text-[#4f93e8]"
                            : "text-[var(--icon-menu)]"
                        }`}
                      />
                      <span className="font-[600]">{text}</span>
                    </Link>
                  </li>
                ))}

              {isLoggedIn ? (
                <li
                  onClick={() => {
                    setMeno(false);
                    setModalMessage("میخوای از حساب کاربری خارج بشی؟");
                    setModalButtons([
                      {
                        label: "بله",
                        type: "yes",
                        onClick: () => {
                          logout();
                          navigate("/Fotros/");
                          setIsModalOpen(false);
                        },
                      },
                      {
                        label: "خیر",
                        type: "no",
                        onClick: () => {
                          setIsModalOpen(false);
                        },
                      },
                    ]);
                    setIsModalOpen(true);
                  }}
                >
                  <NavLink className="flex gap-[8px] items-center  px-[7px]">
                    <FiLogOut size={25} className="text-[var(--icon-menu)]" />
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
                    <FaUserPlus size={25} className="text-[var(--icon-menu)]" />
                    <span className="font-[600]">ساخت حساب کاربری</span>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
        <ModalAlert
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          message={modalMessage}
          timer={4000} // مدت زمان نوار progress
          buttons={modalButtons}
        />
      </div>
    </>
  );
}
export default memo(Meno);
