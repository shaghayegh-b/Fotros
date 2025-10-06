import React, { forwardRef, memo } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { HiArrowCircleRight } from "react-icons/hi";

const SearchBar = forwardRef(function SearchBar(
  {
    mode = "desktop",       // "desktop" | "mobile"
    inputValue,
    onChange,
    onFocus,
    onClose,
    placeholder = "جستجو",
  },
  ref
) {
  const isMobile = mode === "mobile";

  return (
    <form
      ref={ref}
      onSubmit={(e) => e.preventDefault()}
      action="#"
      dir="ltr"
      className={
        isMobile
          ? "p-1 flex items-center gap-[10px] w-full bg-[#e5f3ff] m-[4px] rounded-sm border border-[#1874c4]"
          : "hidden px-[3px] lg:flex justify-between w-[130px] lg:w-[200px] bg-[#d8dce496] mx-[7px] lg:mx-[8px] py-[2px] lg:py-[6px] rounded-xl"
      }
    >
      <input
        dir="rtl"
        type="text"
        className={isMobile ? "flex-2 w-full" : "pl-2 w-[87%] placeholder:text-[#0b3a63]"}
        placeholder={placeholder}
        value={inputValue}
        onChange={onChange}
        onFocus={onFocus}
      />

      {/* آیکون سرچ */}
      <button type="button" className="flex justify-center items-center">
        <IoSearchSharp />
      </button>

      {/* فقط در حالت موبایل دکمه برگشت */}
      {isMobile && (
        <button
          type="button"
          onClick={onClose}
          className="h-full flex justify-center items-center"
        >
          <HiArrowCircleRight />
        </button>
      )}
    </form>
  );
});

export default memo(SearchBar);
