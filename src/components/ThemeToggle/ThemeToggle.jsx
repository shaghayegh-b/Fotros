import { useContext } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { ThemeContext } from "../../context/ThemeContext/ThemeProvider";

/**
 * دکمه ساده‌ی تعویض تم (روشن/تاریک) برای هدر — یک دکمه‌ی تک‌آیکونه،
 * نه یک سویچر دوحالته.
 */
function ThemeToggle({ className = "" }) {
  const { realTheme, setUserTheme } = useContext(ThemeContext);
  const isDark = realTheme === "dark";

  const toggle = () => {
    setUserTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="تغییر حالت روشن و تاریک"
      title={isDark ? "حالت روشن" : "حالت تاریک"}
      className={`md:flex hidden items-center justify-center ml-[14px] h-[34px] w-[34px] md:h-[38px] md:w-[38px] shrink-0 rounded-full border border-[var(--sup-b)] bg-[var(--f5)]/50 text-[var(--text)] transition-all duration-200 hover:scale-110 hover:bg-[var(--cartcategory-hover)] active:scale-90 ${className}`}
    >
      {isDark ? (
        <MdLightMode size={17} className="animate-pop" key="light" />
      ) : (
        <MdDarkMode size={17} className="animate-pop" key="dark" />
      )}
    </button>
  );
}

export default ThemeToggle;
