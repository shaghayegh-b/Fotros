import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext/AuthContext";
import imgdaman from "../../assets/img/daman.png";
import shirtimg from "../../assets/img/shirt.png";
import topimg from "../../assets/img/top.png";

import { useNavigate } from "react-router-dom";
function InfoLogin() {
  const { user, updateUser } = useAuth();
  const [fname, setFname] = useState(user?.fname || "");
  const [lname, setLname] = useState(user?.lname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setFname(user?.fname || "");
    setLname(user?.lname || "");
    setEmail(user?.email || "");
  }, [user]);

  const handleSave = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!fname) newErrors.fname = "نام الزامی است";
    if (!lname) newErrors.lname = "نام خانوادگی الزامی است";
    if (!email) newErrors.email = "ایمیل الزامی است";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      updateUser({ fname, lname, email });
      alert("اطلاعات ذخیره شد ✅");
      navigate("/Fotros/profile-login");
      setErrors({});
      // ریست کردن فرم
      setLname("");
      setFname("");
      setEmail("");
    }
  };

  return (
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

        <div className="w-[85%] md:w-[65%] flex flex-col items-center justify-center gap-[10px] z-3 bg-[white] rounded-md p-[20px] lg:p-[40px] lg:pt-[20px]">
        <h2 className="text-center w-full mb-[20px] font-semibold text-[130%] ">
          اطلاعات کاربری
        </h2>
        <form className="w-[95%]" onSubmit={handleSave}>
          <label htmlFor="fname" className="block mb-1 font-semibold px-[5px]">
            نام
          </label>
          <input
            id="fname"
            type="text"
            value={fname}
            placeholder="مثال : شقایق"
            onChange={(e) => setFname(e.target.value)}
            className={`w-full rounded p-2 mb-2 bg-[#f5f5f5] border border-transparent focus:outline-none focus:border-[#288fea] `}
          />
          {errors.fname && (
            <p className="text-red-500 text-sm mb-2">{errors.fname}</p>
          )}
          <label htmlFor="lname" className="block mb-1 font-semibold px-[5px]">
            نام خانوادگی
          </label>
          <input
            id="lname"
            type="text"
            value={lname}
            placeholder="مثال : محمدی"
            onChange={(e) => setLname(e.target.value)}
            className={`w-full rounded p-2 mb-2 bg-[#f5f5f5] border border-transparent focus:outline-none focus:border-[#288fea] `}
          />
          {errors.lname && (
            <p className="text-red-500 text-sm mb-2">{errors.lname}</p>
          )}
          <label className="block mb-1 font-semibold px-[5px]">ایمیل</label>
          <input
            type="email"
            value={email}
            placeholder="مثال : bazrafkannjad.sh@email.com"
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full rounded p-2 mb-2 bg-[#f5f5f5] border border-transparent focus:outline-none focus:border-[#288fea] `}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email}</p>
          )}
          <button
            type="submit"
            className="px-[30px] py-[8px] mt-[10px] md:py-[7px] font-semibold text-[105%] md:text-[120%]  w-full bg-[#1e88e5] text-white rounded-lg"
          >
            ذخیره اطلاعات
          </button>
        </form>
      </div>
    </div>
  );
}

export default InfoLogin;
