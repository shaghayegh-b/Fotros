import React, { forwardRef, memo, useRef } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { HiArrowCircleRight } from "react-icons/hi";

const SearchBar = forwardRef(function SearchBar(
  {
    mode = "desktop",
    inputValue,
    onChange,
    onFocus,
    onClose,
    placeholder = "جستجو",
  },
  ref
) {
  const isMobile = mode === "mobile";

  // ref واقعی برای input
  const inputRef = useRef(null);

  const handleSearchClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form
      ref={ref}
      onSubmit={(e) => e.preventDefault()}
      action="#"
      dir="ltr"
      className={
        `${isMobile
          ? "p-1.5 flex items-center gap-[10px] w-full bg-[var(--navbar-searchbar-bg)] m-[4px] rounded-full border border-[var(--sup-b)]"
          : "hidden lg:flex items-center justify-between w-[150px] lg:w-[220px] bg-[var(--f5)]/60 mx-[7px] lg:ml-[0px] py-[1px] px-[12px] rounded-full border border-[var(--navbar-searchbar-bg)]  focus-within:border-[var(--btn)] transition-colors duration-200"
      }`}
    >
      <input
        ref={inputRef}
        dir="rtl"
        type="text"
        className={
          isMobile
            ? "flex-2 w-full bg-transparent outline-none"
            : "pl-2 w-[87%] bg-transparent outline-none placeholder:text-[var(--text-gary)]"
        }
        placeholder={placeholder}
        value={inputValue}
        onChange={onChange}
        onFocus={onFocus}
      />

      <button
        type="button"
        onClick={handleSearchClick}
        className="flex justify-center items-center"
      >
        <IoSearchSharp />
      </button>

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
