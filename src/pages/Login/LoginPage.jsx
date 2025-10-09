import { useEffect, useState,useRef } from "react";

import wingfotros from "../../assets/img/wingfotros.png";
import imgdaman from "../../assets/img/daman.png";
import shirtimg from "../../assets/img/shirt.png";
import topimg from "../../assets/img/top.png";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const inputRef = useRef(null);
  const [hasFocused, setHasFocused] = useState(false); // برای بررسی اینکه کاربر فوکوس کرده یا نه

  useEffect(() => {
    // تابعی که وقتی کاربر فوکوس کرد، وضعیت رو تغییر میده
    const handleFocus = () => setHasFocused(true);

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("focus", handleFocus);
    }

    // بعد از ۵ ثانیه بررسی کن
    const timer = setTimeout(() => {
      if (!hasFocused && inputRef.current) {
        inputRef.current.focus();
      }
    }, 5000);

    // پاکسازی
    return () => {
      clearTimeout(timer);
      if (inputElement) {
        inputElement.removeEventListener("focus", handleFocus);
      }
    };
  }, [hasFocused]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [errors, setErrors] = useState({});
  const [phone, setPhone] = useState("");
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isLoggedIn) {
      navigate("/Fotros/info-login"); // اگه کاربر لاگین بود، مستقیم بفرستش Home
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!/^09\d{9}$/.test(phone))
      newErrors.phone = "شماره موبایل معتبر وارد کنید";
    if (!phone || phone.length < 11)
      newErrors.phone = "شماره موبایل وارد شده صحیح نیست";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // فرض کنیم کاربر با شماره موبایل لاگین میشه
      const success = await login(phone, "");
      if (success) {
        navigate("/Fotros/info-login"); // بعد از لاگین موفق برو به صفحه اصلی
      }
    }
  };
  return (
    <>
      {/* main */}
      <div className="flex justify-center items-center w-full h-[100vh] bg-[#d5d5d5]">
        {/* تزئینی‌ها */}
        <div className="">
          <img
            src={imgdaman}
            alt=""
            className="h-[5.4rem] absolute right-[15px] md:right-[35rem] z-2 bottom-[1rem]"
          />
          <img
            src={shirtimg}
            alt=""
            className="h-[6rem] absolute left-[2px] md:left-[15rem] z-2 top-[6rem]"
          />
          <img
            src={topimg}
            alt=""
            className="h-[9rem] absolute left-[0px] md:left-[25rem] z-2  bottom-[170px] md:bottom-[unset] md:top-[2rem]"
          />
          <img
            src={topimg}
            alt=""
            className="h-[7rem] absolute right-[19px] md:right-[3rem] z-2 top-[2rem]"
          />
          <img
            src={topimg}
            alt=""
            className="h-[4rem] hidden md:inline-block absolute right-[50px] md:right-[26rem] z-2 top-[8rem]"
          />
          <img
            src={topimg}
            alt=""
            className="h-[8rem] hidden md:inline-block absolute right-[4px] md:right-[3rem] z-2 bottom-[4rem]"
          />
        </div>

        {/* فرم ورود */}
        <div className="mt-[-40%] md:mt-[unset] w-[85%] md:w-[65%] flex flex-col items-center justify-center gap-[10px] z-3 bg-[white] rounded-md p-[20px] lg:p-[40px] lg:pt-[20px]">
          <div className=" w-full mb-[43px] flex items-center justify-center gap-[7px]">
            <div className="relative w-[55px] h-[55px]">
              <img src={wingfotros} alt="Logoimg" className=" h-full " />
            </div>
            <h2 className="font-semibold text-[130%] mr-[-7px] mb-[-42px] ml-[19px] ">
              فطروس
            </h2>
          </div>

          <p className="self-start">
            برای ورود یا ثیت نام شماره موبایل خود را وارد کنید.
          </p>
          <form onSubmit={handleSubmit} className="w-[95%]">
            <label
              htmlFor="phonenumber"
              className="block mb-1 font-semibold px-[5px]"
            >
              شماره موبایل
            </label>
            <input
              ref={inputRef}
              type="text"
              id="phonenumber"
              value={phone}
              pattern="\d*"
              maxLength={11}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setPhone(val.slice(0, 11));
              }}
              placeholder="مثال : 09399619640"
              className={`w-full rounded p-2 mb-2 bg-[#f5f5f5] border border-transparent focus:outline-none focus:border-[#288fea]
                 ${
                   phone.length > 0 && phone.length !== 11
                     ? "text-red-500 border-red-400"
                     : "text-black "
                 } `}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mb-2">{errors.phone}</p>
            )}
            <button
              type="submit"
              className="px-[30px] py-[8px] mt-[10px] md:py-[7px] font-semibold text-[105%] md:text-[120%]  w-full bg-[#1e88e5] text-white rounded-lg"
            >
              ورود
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default LoginPage;
