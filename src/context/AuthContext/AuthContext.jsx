import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // گرفتن کاربر از localStorage در شروع
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // ورود با شماره موبایل
  const login = useCallback(async (phone) => {
    setLoading(true);
    setError(null);
    try {
      if (!/^09\d{9}$/.test(phone)) {
        setError("شماره موبایل معتبر نیست!");
        setLoading(false);
        return false;
      }

      // اگه کاربر قبلا ثبت نام کرده باشه → همون داده‌هاش رو بیار
      const storedUser = JSON.parse(localStorage.getItem("user"));

      const fakeUser = storedUser && storedUser.username === phone
        ? storedUser
        : {
            id: Date.now(),
            username: phone,
            fname: "",
            lname: "",
            email: "",
            profilePic: "",
            favorites: [],
            token: "JWT_TOKEN_EXAMPLE",
          };

      localStorage.setItem("user", JSON.stringify(fakeUser));
      setUser(fakeUser);
      return true;
    } catch (err) {
      setError("خطا در ورود کاربر");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // خروج
  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  // آپدیت اطلاعات کاربر (UserInfo)
  const updateUser = useCallback((newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        updateUser,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
