import { memo, useEffect, useState } from "react";
import "./Meno.css";
import { mymeno } from "../Navbar/Navbar";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
function Meno() {
  const [grouping, setGrouping] = useState(false);
  const { meno, setMeno } = useContext(mymeno);

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
  return (
    <>
      <div
        className={`Meno h-[100vh]    transition-all duration-300 ease-in-out ${
          meno ? "w-[85vw]" : "w-[0]"
        } `}
      >
        <div className="overflow-y-scroll h-[inherit]">
          <div>
            <div className="Meno2 flex flex-col gap-2">
              <ul className="flex flex-col gap-3">
                <li
                  onClick={() => {
                    setMeno(false);

                  }}
                >
                  <i className="fa fa-home text-[#1974ba]"></i>
                  <span className="font-[600]">همه محصولات</span>
                </li>
                <li
                  className={`relative ${grouping ? "grouping" : ""}`}
                  onClick={() => setGrouping(!grouping)}
                >
                  <i className="fas fa-store text-[#1974ba]"></i>
                  <span className="font-[600]">دسته بندی</span>
                  <i
                    className={`fa fa-chevron-up absolute left-0 top-[7px] transition-all duration-300 ease-in-out ${
                      grouping ? "rotate-[180deg]" : ""
                    }`}
                  ></i>
                  <div
                    className={`transition-all duration-1000 ease-in-out ${
                      grouping ? "" : "hidden"
                    }`}
                  >
                    <ul
                      className={`transition-all duration-1000 ease-in-out ${
                        grouping ? "" : "h-0"
                      }`}
                    >
                      <li
                        onClick={() => {
                          setMeno(false);

                        }}
                      >
                        <p className=" tracking-tighter  p-1 pr-2">مانتو</p>
                      </li>
                      <li
                        onClick={() => {
                          setMeno(false);

                        }}
                      >
                        <p className=" tracking-tighter  p-1 pr-2">
                          شلوار{"\u2009"}و{"\u2009"}دامن
                        </p>
                      </li>
                      <li
                        onClick={() => {
                          setMeno(false);

                        }}
                      >
                        <p className=" tracking-tighter  p-1 pr-2">ست</p>
                      </li>
                      <li
                        onClick={() => {
                          setMeno(false);

                        }}
                      >
                        <p className=" tracking-tighter  p-1 pr-2">
                          تو{"\u2009"}خونه{"\u200A"}ای
                        </p>
                      </li>
                      <li
                        onClick={() => {
                          setMeno(false);

                        }}
                      >
                        <p className=" tracking-tighter  p-1 pr-2">
                          ارایشی{"\u2009"}بهداشتی
                        </p>
                      </li>
                      <li
                        onClick={() => {
                          setMeno(false);

                        }}
                      >
                        <p className=" tracking-tighter  p-1 pr-2">
                          لباس{"\u200A"}گرم
                        </p>
                      </li>
                      <li
                        onClick={() => {
                          setMeno(false);
                        }}
                      >
                        <p className=" tracking-tighter  p-1 pr-2">
                          کیف{"\u2009"}و{"\u2009"}کفش
                        </p>
                      </li>
                      <li
                        onClick={() => {
                          setMeno(false);

                        }}
                      >
                        <p className=" tracking-tighter  p-1 pr-2">اکسسوری</p>
                      </li>
                    </ul>
                  </div>
                </li>
                <li
                  onClick={() => {
                    setMeno(false);
                  }}
                >
                  <Link to="/bazrafkan-store/FavProduct">
                    <i className="fa fa-star text-[#1974ba]"></i>
                    <span className="font-[600]">محصولات مورد علاقه</span>
                  </Link>
                </li>
                <li
                  onClick={() => {
                    setMeno(false);
                  }}
                >
                  <NavLink to="/bazrafkan-store/AskedQuestion">
                    <i className="fas fa-comments text-[#1974ba]"></i>
                    <span className="font-[600]">سوالات متداول</span>
                  </NavLink>
                </li>
                {/* <li
                                onClick={() => {
                          setMeno(false);
                        }}>
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
                  <NavLink to="/bazrafkan-store/ContactUs">
                    <i className="fa fa-link text-[#1974ba]"></i>
                    <span className="font-[600]">ارتباط با ما</span>
                  </NavLink>
                </li>
              </ul>

              <hr className=" border-gray-500" />
              <ul className="flex flex-col gap-3">
                <li
                  title="Change Theme Mode"
                  onClick={() => setIsDark(!isDark)}
                >
                  <button type="submit" className="">
                    <i
                      className={`text-[#1974ba] fas ${
                        isDark ? "fa-sun" : "fa-moon"
                      }`}
                    ></i>
                    <span className="font-[600]">
                      {isDark ? "حالت روز" : "حالت شب "}
                    </span>
                  </button>
                </li>


              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default memo(Meno);
