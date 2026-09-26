import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();
const USERS_DB_KEY = "usersDB"; // { [phone]: {id, username, fname, lname, email, password, profilePic, favorites, token} }

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

  const getUsersDB = () => {
    try {
      return JSON.parse(localStorage.getItem(USERS_DB_KEY)) || {};
    } catch {
      return {};
    }
  };
  const saveUsersDB = (db) => {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));
  };

  // آیا این شماره موبایل قبلاً ثبت‌نام کرده؟
  const checkUserExists = useCallback((phone) => {
    const db = getUsersDB();
    return !!db[phone];
  }, []);

  // ورود کاربری که قبلاً ثبت‌نام کرده، فقط با شماره + رمز عبور
  const loginWithPassword = useCallback((phone, password) => {
    setError(null);
    const db = getUsersDB();
    const record = db[phone];
    if (!record) {
      setError("این شماره ثبت‌نام نشده است.");
      return false;
    }
    if (record.password !== password) {
      setError("رمز عبور اشتباه است.");
      return false;
    }
    localStorage.setItem("user", JSON.stringify(record));
    setUser(record);
    return true;
  }, []);

  // تولید و «ارسال» کد تایید برای شماره‌ی جدید
  // چون بک‌اند/سرویس پیامکی واقعی وصل نیست، کد به صورت نمایشی برگردونده میشه
  // (توی پروژه واقعی باید این تابع یک درخواست به سرور بزنه)
  const sendVerificationCode = useCallback((phone) => {
    const code = String(Math.floor(1000 + Math.random() * 9000));
    sessionStorage.setItem(`otp:${phone}`, code);
    return code;
  }, []);

  const verifyCode = useCallback((phone, code) => {
    const saved = sessionStorage.getItem(`otp:${phone}`);
    return !!saved && saved === code;
  }, []);

  // ثبت‌نام نهایی کاربر جدید (بعد از تایید کد پیامکی و پر کردن مشخصات)
  const registerUser = useCallback((phone, data) => {
    const db = getUsersDB();
    const newUser = {
      id: Date.now(),
      username: phone,
      fname: data.fname || "",
      lname: data.lname || "",
      email: data.email || "",
      password: data.password || "",
      profilePic: data.profilePic || "",
      favorites: [],
      token: "JWT_TOKEN_EXAMPLE",
    };
    db[phone] = newUser;
    saveUsersDB(db);
    sessionStorage.removeItem(`otp:${phone}`);
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  }, []);

  // خروج
  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  // آپدیت اطلاعات کاربر (UserInfo) — هم توی سشن جاری هم توی دیتابیس محلی
  const updateUser = useCallback((newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    if (updatedUser?.username) {
      const db = getUsersDB();
      db[updatedUser.username] = updatedUser;
      saveUsersDB(db);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        setError,
        checkUserExists,
        loginWithPassword,
        sendVerificationCode,
        verifyCode,
        registerUser,
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
