import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // خواندن انتخاب ذخیره‌شده کاربر
  const storedTheme = localStorage.getItem("theme"); // light | dark | system | null

  // وضعیت تم سیستم
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const getInitialTheme = () => {
    if (storedTheme) return storedTheme;
    return "system"; // ورود اولیه بر اساس سیستم
  };

  const [userTheme, setUserTheme] = useState(getInitialTheme);

  // تم واقعی → فقط dark یا light
  const realTheme =
    userTheme === "system" ? (media.matches ? "dark" : "light") : userTheme;

  // اعمال تم روی HTML و جلوگیری از override مرورگر/افزونه
  useEffect(() => {
    const root = document.documentElement;

    if (realTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // برای اطمینان از اینکه مرورگر و افزونه ها استایل های خودشان را اعمال نکنند
    root.style.forcedColorAdjust = "none";

    localStorage.setItem("theme", userTheme);
  }, [realTheme, userTheme]);

  // واکنش به تغییر تم سیستم
  useEffect(() => {
    const handler = () => {
      if (userTheme === "system") {
        // فقط در حالت system، تم واقعی باید تغییر کند
        setUserTheme("system");
      }
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [userTheme]);

  return (
    <ThemeContext.Provider value={{ userTheme, realTheme, setUserTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
