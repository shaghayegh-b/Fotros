import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import wingfotros from "../../assets/img/wingfotros.png";
import imgdaman from "../../assets/img/daman.png";
import shirtimg from "../../assets/img/shirt.png";
import topimg from "../../assets/img/top.png";
import porof1 from "../../assets/img/porof1.png";
import porof2 from "../../assets/img/porof2.png";
import porof3 from "../../assets/img/porof3.png";
import porof4 from "../../assets/img/porof4.png";
import porof5 from "../../assets/img/porof5.png";
import porof6 from "../../assets/img/porof6.png";
import { useAuth } from "../../context/AuthContext/AuthContext";

const DEFAULT_PICS = [porof1, porof2, porof3, porof4, porof5, porof6];

function DecorImages() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <img
        src={imgdaman}
        alt=""
        className="h-[5.4rem] absolute right-[15px] md:right-[8%] z-0 bottom-[1rem] opacity-90"
      />
      <img
        src={shirtimg}
        alt=""
        className="h-[6rem] absolute left-[2px] md:left-[8%] z-0 top-[6rem] opacity-90"
      />
      <img
        src={topimg}
        alt=""
        className="h-[9rem] absolute left-[0px] md:left-[16%] z-0 bottom-[3rem] md:top-[2rem] opacity-90"
      />
      <img
        src={topimg}
        alt=""
        className="h-[7rem] absolute right-[19px] md:right-[16%] z-0 top-[2rem] opacity-90"
      />
    </div>
  );
}

function FieldError({ children }) {
  if (!children) return null;
  return <p className="text-red-500 text-sm mb-2">{children}</p>;
}

function LoginPage() {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    checkUserExists,
    loginWithPassword,
    sendVerificationCode,
    verifyCode,
    registerUser,
  } = useAuth();

  const inputRef = useRef(null);

  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [devCode, setDevCode] = useState(""); // فقط برای نمایش دمو، چون سرویس پیامکی واقعی وصل نیست
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(porof1);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/Fotros/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  // مرحله ۱: شماره موبایل
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!/^09\d{9}$/.test(phone)) {
      setErrors({ phone: "شماره موبایل معتبر وارد کنید" });
      return;
    }
    setErrors({});
    if (checkUserExists(phone)) {
      setStep("password");
    } else {
      const generated = sendVerificationCode(phone);
      setDevCode(generated);
      setStep("otp");
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setErrors({ password: "رمز عبور را وارد کنید" });
      return;
    }
    const ok = loginWithPassword(phone, password);
    if (!ok) {
      setErrors({ password: "شماره یا رمز عبور اشتباه است" });
      return;
    }
    navigate("/Fotros/");
  };

  // مرحله ۲-ب: کد تایید پیامکی (کاربر جدید)
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{4}$/.test(code)) {
      setErrors({ code: "کد ۴ رقمی را کامل وارد کنید" });
      return;
    }
    if (!verifyCode(phone, code)) {
      setErrors({ code: "کد تایید اشتباه است" });
      return;
    }
    setErrors({});
    setStep("details");
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!fname) newErrors.fname = "نام الزامی است";
    if (!lname) newErrors.lname = "نام خانوادگی الزامی است";
    if (!newPassword || newPassword.length < 4)
      newErrors.newPassword = "رمز عبور باید حداقل ۴ کاراکتر باشد";
    if (newPassword !== confirmPassword)
      newErrors.confirmPassword = "رمز عبور و تکرار آن یکسان نیستند";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "ایمیل معتبر نیست";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStep("photo");
  };
  
  const finishRegister = (pic) => {
    registerUser(phone, {
      fname,
      lname,
      email,
      password: newPassword,
      profilePic: pic || porof1,
    });
    navigate("/Fotros/");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setProfilePic(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[var(--bg-login)] px-4 py-10 overflow-hidden">
      <DecorImages />

      <div className="relative z-10 w-full max-w-[420px] max-h-[92vh] overflow-y-auto bg-[var(--sup-sm)] rounded-2xl shadow-xl p-6 md:p-8 flex flex-col items-center gap-3">
        <div className="w-full mb-2 flex items-center justify-center gap-[7px]">
          <img src={wingfotros} alt="Logoimg" className="h-[48px]" />
          <h2 className="font-semibold text-[130%]">فطروس</h2>
        </div>

        {/* مرحله ۱: شماره موبایل */}
        {step === "phone" && (
          <form onSubmit={handlePhoneSubmit} className="w-full flex flex-col gap-1">
            <p className="self-start text-[95%] mb-1">
              برای ورود یا ثبت‌نام شماره موبایل خود را وارد کنید.
            </p>
            <label htmlFor="phonenumber" className="block mb-1 font-semibold px-[5px]">
              شماره موبایل
            </label>
            <input
              ref={inputRef}
              type="text"
              id="phonenumber"
              value={phone}
              inputMode="numeric"
              maxLength={11}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setPhone(val.slice(0, 11));
              }}
              placeholder="مثال : 09399619640"
              className="w-full rounded-lg p-3 mb-1 bg-[var(--sup)] border border-transparent focus:outline-none focus:border-[#288fea] text-[var(--text-input)]"
            />
            <FieldError>{errors.phone}</FieldError>
            <button
              type="submit"
              className="mt-2 px-[30px] py-[10px] font-semibold text-[105%] w-full bg-[var(--btn)] text-white rounded-lg transition-transform duration-200 hover:scale-[1.02] active:scale-95"
            >
              ادامه
            </button>
          </form>
        )}

        {/* مرحله ۲-الف: رمز عبور برای کاربر قبلی */}
        {step === "password" && (
          <form onSubmit={handlePasswordSubmit} className="w-full flex flex-col gap-1">
            <p className="self-start text-[95%] mb-1">
              خوش برگشتی! رمز عبور حساب {phone} را وارد کن.
            </p>
            <label htmlFor="password" className="block mb-1 font-semibold px-[5px]">
              رمز عبور
            </label>
            <input
              ref={inputRef}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور"
              className="w-full rounded-lg p-3 mb-1 bg-[var(--sup)] border border-transparent focus:outline-none focus:border-[#288fea] text-[var(--text-input)]"
            />
            <FieldError>{errors.password}</FieldError>
            <button
              type="submit"
              className="mt-2 px-[30px] py-[10px] font-semibold text-[105%] w-full bg-[var(--btn)] text-white rounded-lg transition-transform duration-200 hover:scale-[1.02] active:scale-95"
            >
              ورود
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("phone");
                setPassword("");
                setErrors({});
              }}
              className="text-[85%] text-[var(--text-gary)] underline mt-1"
            >
              شماره موبایل دیگری وارد کنم
            </button>
          </form>
        )}

        {/* مرحله ۲-ب: کد تایید پیامکی برای کاربر جدید */}
        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="w-full flex flex-col gap-1">
            <p className="self-start text-[95%] mb-1">
              کد تایید ۴ رقمی ارسال‌شده به {phone} را وارد کن.
            </p>
            {/* توجه: چون به سرویس پیامکی واقعی وصل نیستیم، کد فقط برای دمو نمایش داده میشه */}
            <p className="self-start text-[80%] text-[var(--text-gary)] mb-1">
              کد نمایشی (دمو): {devCode}
            </p>
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="- - - -"
              className="w-full rounded-lg p-3 mb-1 text-center tracking-[10px] bg-[var(--sup)] border border-transparent focus:outline-none focus:border-[#288fea] text-[var(--text-input)]"
            />
            <FieldError>{errors.code}</FieldError>
            <button
              type="submit"
              className="mt-2 px-[30px] py-[10px] font-semibold text-[105%] w-full bg-[var(--btn)] text-white rounded-lg transition-transform duration-200 hover:scale-[1.02] active:scale-95"
            >
              تایید کد
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("phone");
                setCode("");
                setErrors({});
              }}
              className="text-[85%] text-[var(--text-gary)] underline mt-1"
            >
              ویرایش شماره موبایل
            </button>
          </form>
        )}

        {/* مرحله ۳: مشخصات کاربر جدید */}
        {step === "details" && (
          <form onSubmit={handleDetailsSubmit} className="w-full flex flex-col gap-1">
            <p className="self-start text-[95%] mb-1">حساب کاربری‌ت رو تکمیل کن.</p>

            <label htmlFor="fname" className="block mb-1 font-semibold px-[5px]">
              نام
            </label>
            <input
              ref={inputRef}
              id="fname"
              type="text"
              value={fname}
              placeholder="مثال : شقایق"
              onChange={(e) => setFname(e.target.value)}
              className="w-full rounded-lg p-3 mb-1 bg-[var(--sup)] border border-transparent focus:outline-none focus:border-[#288fea] text-[var(--text-input)]"
            />
            <FieldError>{errors.fname}</FieldError>

            <label htmlFor="lname" className="block mb-1 font-semibold px-[5px]">
              نام خانوادگی
            </label>
            <input
              id="lname"
              type="text"
              value={lname}
              placeholder="مثال : محمدی"
              onChange={(e) => setLname(e.target.value)}
              className="w-full rounded-lg p-3 mb-1 bg-[var(--sup)] border border-transparent focus:outline-none focus:border-[#288fea] text-[var(--text-input)]"
            />
            <FieldError>{errors.lname}</FieldError>

            <label htmlFor="email" className="block mb-1 font-semibold px-[5px]">
              ایمیل <span className="text-[80%] text-[var(--text-gary)] font-normal">(اختیاری)</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="مثال : bazrafkannjad.sh@email.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg p-3 mb-1 bg-[var(--sup)] border border-transparent focus:outline-none focus:border-[#288fea] text-[var(--text-input)]"
            />
            <FieldError>{errors.email}</FieldError>

            <label htmlFor="newPassword" className="block mb-1 font-semibold px-[5px]">
              رمز عبور
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              placeholder="یک رمز عبور تعیین کن"
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg p-3 mb-1 bg-[var(--sup)] border border-transparent focus:outline-none focus:border-[#288fea] text-[var(--text-input)]"
            />
            <FieldError>{errors.newPassword}</FieldError>

            <label htmlFor="confirmPassword" className="block mb-1 font-semibold px-[5px]">
              تکرار رمز عبور
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              placeholder="رمز عبور را دوباره وارد کن"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg p-3 mb-1 bg-[var(--sup)] border border-transparent focus:outline-none focus:border-[#288fea] text-[var(--text-input)]"
            />
            <FieldError>{errors.confirmPassword}</FieldError>

            <button
              type="submit"
              className="mt-2 px-[30px] py-[10px] font-semibold text-[105%] w-full bg-[var(--btn)] text-white rounded-lg transition-transform duration-200 hover:scale-[1.02] active:scale-95"
            >
              ادامه
            </button>
          </form>
        )}

        {/* مرحله ۴: انتخاب عکس پروفایل — اختیاری */}
        {step === "photo" && (
          <div className="w-full flex flex-col items-center gap-2">
            <p className="self-start text-[95%] mb-1">یک عکس پروفایل انتخاب کن (اختیاری).</p>

            <span className="flex justify-center items-center w-[100px] h-[100px] shadow-lg rounded-full overflow-hidden">
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover object-center"
              />
            </span>

            <div className="grid grid-cols-3 gap-3 py-2">
              {DEFAULT_PICS.map((pic, idx) => (
                <img
                  key={idx}
                  src={pic}
                  alt={`porof${idx + 1}`}
                  className={`rounded-full w-[60px] h-[60px] object-cover cursor-pointer border-[1.5px] transition-transform duration-200 hover:scale-110 ${
                    profilePic === pic ? "border-[#0b9ae7dd]" : "border-[#56a3ff61]"
                  }`}
                  onClick={() => setProfilePic(pic)}
                />
              ))}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="profilePicInput"
              className="hidden"
            />
            <label
              htmlFor="profilePicInput"
              className="text-[var(--btn)] border-[var(--btn)] border-[1px] text-center p-[10px] rounded-lg w-full cursor-pointer transition-colors hover:bg-[var(--cartcategory-hover)]"
            >
              انتخاب عکس از گالری
            </label>

            <button
              type="button"
              onClick={() => finishRegister(profilePic)}
              className="px-[30px] py-[10px] font-semibold text-[105%] w-full bg-[var(--btn)] text-white rounded-lg transition-transform duration-200 hover:scale-[1.02] active:scale-95"
            >
              ثبت و ورود
            </button>
            <button
              type="button"
              onClick={() => finishRegister(porof1)}
              className="text-[85%] text-[var(--text-gary)] underline mt-1"
            >
              رد کردن، بعداً انتخاب می‌کنم
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
