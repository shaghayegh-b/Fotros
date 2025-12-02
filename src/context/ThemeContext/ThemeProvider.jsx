import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // خواندن انتخاب ذخیره شده کاربر
  const storedTheme = localStorage.getItem("theme"); // light | dark | system | null

  // بررسی تم سیستم
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  // تعیین تم اولیه
  const getInitialTheme = () => {
    if (storedTheme) return storedTheme;     // انتخاب دستی کاربر
    return "system";                         // ابتدا با حالت سیستم وارد شو
  };

  // userTheme = light | dark | system
  const [userTheme, setUserTheme] = useState(getInitialTheme);

  // realTheme = dark | light → تم واقعی که باید اعمال شود
  const realTheme =
    userTheme === "system"
      ? systemPrefersDark.matches
        ? "dark"
        : "light"
      : userTheme;

  // اعمال تم واقعی روی html
  useEffect(() => {
    const root = document.documentElement;

    if (realTheme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    localStorage.setItem("theme", userTheme);
  }, [realTheme, userTheme]);

  // واکنش اتوماتیک به تغییرات سیستم
  useEffect(() => {
    const handler = () => {
      if (userTheme === "system") {
        // اگر کاربر در حالت system باشد → تغییر سیستم بر سایت اعمال شود
if (userTheme === "system") {
  setUserTheme(prev => prev); // فقط رفرش، بدون تغییر واقعی
}
      }
    };

    systemPrefersDark.addEventListener("change", handler);
    return () => systemPrefersDark.removeEventListener("change", handler);
  }, [userTheme]);

  return (
    <ThemeContext.Provider value={{ userTheme, realTheme, setUserTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
