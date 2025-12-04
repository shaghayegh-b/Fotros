import { createContext, useEffect, useMemo, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const [userTheme, setUserTheme] = useState(
    localStorage.getItem("theme") || "system"
  );

  // محاسبه‌ی تم واقعی، بدون state اضافه
  const realTheme = useMemo(() => {
    if (userTheme === "system") {
      return media.matches ? "dark" : "light";
    }
    return userTheme;
  }, [userTheme]);

  // وقتی userTheme تغییر کند → ذخیره کن
  useEffect(() => {
    localStorage.setItem("theme", userTheme);
  }, [userTheme]);

  // واکنش به تغییر تم سیستم
  useEffect(() => {
    const handler = () => {
      if (userTheme === "system") {
        document.documentElement.classList.toggle("dark", media.matches);
      }
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [userTheme]);

  // اعمال تم واقعی روی html
  useEffect(() => {
    document.documentElement.classList.toggle("dark", realTheme === "dark");
  }, [realTheme]);

  return (
    <ThemeContext.Provider value={{ userTheme, realTheme, setUserTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
