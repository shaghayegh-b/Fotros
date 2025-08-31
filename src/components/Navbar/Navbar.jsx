import { useState, createContext, memo } from "react";
import { NavLink } from "react-router-dom";
import Meno from "../Meno/Meno";
import logoimg from "../../assets/img/Fotros.png";
import { HiBars3BottomRight } from "react-icons/hi2";
import {FaSearch} from "react-icons/fa"
import {IoMdArrowRoundBack} from "react-icons/io"
import {RiShoppingCartLine} from "react-icons/ri"
import "./Navbar.css"
export const mymeno=createContext()

function Navbar() {
  const [fSearch, setFSearch] = useState(false);
  const [meno, setMeno] = useState(false);
  return (
    <>
    {/* Navbar */}
      <div className={`Navbar   border-b-[3px] border-b-solid border-b-[#f5f5f5]  bg-[#ffff] w-full fixed top-0 z-2 h-[48px]`}>
        <div className="flex items-center w-full h-full">
          {!fSearch ? (
            <div className="Navbarchild w-full flex items-center justify-between px-[8px] shadow-[0px 4px 4px 0px rgba(0, 0, 0, 0.04)]">
              {/* meno */}
              <button onClick={() => setMeno(true)} className="flex-0 ">
<HiBars3BottomRight />              </button>

              {/* logo */}
              <div className="flex-2 h-[29px] flex justify-center">
                <img src={logoimg} alt="Logoimg" className=" h-[22px]" />
              </div>
              {/* search & shopping */}
              <div className="flex-0">
                <div className="gap-[15px] flex justify-between items-center">
                  {/* search */}
                  <button onFocus={() => setFSearch(true)} className="">
                    <FaSearch />
                  </button>
                  {/* shopping */}
                  <NavLink to="/bazrafkan-store/ShoppingBag" className="relative">
                  <RiShoppingCartLine />
                      <span className="absolute bottom-[-2px] right-[-10px] py-[3px] px-[4px] rounded-full text-[45%] bg-blue-400 text-white shadow-sm">
                        0
                      </span>
                  </NavLink>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <form
                action="#"
                className="p-1 flex  justify-between w-[100%]   "
                dir="ltr"
              >
                <input
                  dir="rtl"
                  className="pl-2 w-[87%] placeholder:text-[#0b3a63]"
                  type="text"
                  placeholder="جستجو"
                  onFocus={() => setFSearch(true)}
                />
                <button
                  type="button"
                  className="w-6.5 h-6 flex justify-center items-center"
                >
                    <FaSearch />
                </button>
                <button
                  onClick={() => setFSearch(false)}
                  type="button"
                  className="w-6.5 h-6  flex justify-center items-center"
                >
                  <IoMdArrowRoundBack />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      {/* منو باز بشه اگر روی ایکون منو کلیک بشه */}
      <div
        className={`fixed z-20 top-0 h-[100vh] bg-[#000000a6]  ${
          meno ? "w-[100vw]" : "w-[0]"
        }`}
      >
        <mymeno.Provider value={{ meno, setMeno }}>
          <Meno></Meno>
        </mymeno.Provider>
        <div
          className={`h-[100vh] fixed top-0 left-0 z-20 w-[15vw] flex items-start justify-end
            ${meno ? "" : "hidden"}
            `}
          onClick={() => setMeno(false)}
        >
          <i
            className={`fa fa-times text-[140%] text-center rounded-full w-6 h-6 m-1 shadow flex justify-center items-center bg-[#d9dadb]
                        ${meno ? "" : "hidden"}`}
          ></i>
        </div>
      </div>
    </>
  );
}
export default memo(Navbar);
