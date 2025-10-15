import { memo, useEffect, useRef, useState } from "react";

import porof1 from "../../../assets/img/porof1.png";
import porof2 from "../../../assets/img/porof2.png";
import porof3 from "../../../assets/img/porof3.png";
import porof4 from "../../../assets/img/porof4.png";
import porof5 from "../../../assets/img/porof5.png";
import porof6 from "../../../assets/img/porof6.png";
import porofDefault from "../../../assets/img/porof1.png";

import { useAuth } from "../../../context/AuthContext/AuthContext";
import ModalAlert from "../../ModalAlert/ModalAlert";
function UserInfo() {
  const { user, updateUser } = useAuth();
  const [selectedPic, setSelectedPic] = useState(
    user?.profilePic || porofDefault
  );

  const defaultPics = [porof1, porof2, porof3, porof4, porof5, porof6];
  const fileInputRef = useRef(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // تغییر تصویر با انتخاب فایل از گالری
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedPic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // ذخیره تصویر (مثلاً در localStorage یا API سرور)
  const handleSavePhoto = () => {
    updateUser({ profilePic: selectedPic });
    setModalMessage("تصویر پروفایل ذخیره شد.");
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (user) {
      setFname(user.fname || "");
      setLname(user.lname || "");
      setPhone(user.username || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSaveForm = (e) => {
    e.preventDefault(); // جلوگیری از رفرش صفحه

    let newErrors = {};
    if (!fname) newErrors.fname = "نام الزامی است";
    if (!lname) newErrors.lname = "نام خانوادگی الزامی است";
    if (!phone) newErrors.phone = "شماره تماس الزامی است";

    if (!/^09\d{9}$/.test(phone))
      newErrors.phone =
        "شماره موبایل معتبر وارد کنید(ماره موبایل باید با 09.. شروع شود)";
    if (!phone || phone.length < 11)
      newErrors.phone = "شماره موبایل وارد شده صحیح نیست";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    updateUser({
      fname,
      lname,
      username: phone,
      email,
      profilePic: selectedPic,
    });
    setModalMessage("اطلاعات با موفقیت ذخیره شد.");
    setIsModalOpen(true);
    setErrors({});
  };
  return (
    <div className="flex flex-col ">
      <h2 className="py-[10px] font-semibold text-[130%]">اطلاعات کاربری</h2>
      <div className="flex  lg:flex-row flex-col gap-[10px] lg:gap-[19px] w-full">
        {/* profile */}
        {/* lg> */}
        <div className="bg-[#f5f5f5] p-[10px] rounded-sm inline-block md:hidden lg:inline-block    lg:w-[30%]">
          <h3 className="py-[8px] font-bold text-[102%]">تصویر پروفایل</h3>
          <div className="flex justify-center">
            <span className="flex justify-center items-center m-[10px] w-[110px] h-[110px] shadow-lg rounded-full overflow-hidden">
              <img
                src={selectedPic}
                alt="Profile"
                className="border-[1px] border-[#56a2ff32] w-full h-full object-cover object-center"
              />
            </span>
          </div>
          <div className=" grid grid-cols-3 grid-rows-2 gap-[15px] p-[20px]">
            {defaultPics.map((pic, idx) => (
              <img
                key={idx}
                src={pic}
                alt={`porof${idx + 1}`}
                className={`rounded-full w-full cursor-pointer border-[1.2px] ${
                  selectedPic === pic
                    ? "border-[#0b9ae7dd]"
                    : "border-[#56a3ff61]"
                }`}
                onClick={() => setSelectedPic(pic)}
              />
            ))}
          </div>

          <div className="flex flex-col gap-[8px] p-[10px]">
            {/* Input file مخفی */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />

            {/* دکمه انتخاب عکس */}
            <button
              className="text-[#1e88e5] border-[#1e88e5] border-[1px] text-center p-[10px] rounded-lg box-shadow w-full"
              onClick={() => fileInputRef.current.click()}
            >
              انتخاب عکس از گالری
            </button>

            {/* دکمه ذخیره تصویر */}
            <button
              onClick={handleSavePhoto}
              className="bg-[#1e88e5] text-white text-center p-[10px] rounded-lg box-shadow w-full"
            >
              ذخیره تصویر
            </button>
          </div>
        </div>

        {/* lg< */}
        <div className="bg-[#f5f5f5] p-[10px] hidden  md:inline-block  lg:hidden rounded-sm w-full">
          <h3 className="py-[8px] font-[600] text-[102%]">تصویر پروفایل</h3>
          <div className="flex gap-[10px] items-center">
            <div className=" w-[40%] ">
              <div className="flex justify-center">
                <span className="flex justify-center items-center m-[10px] w-[130px] h-[130px] shadow-lg rounded-full overflow-hidden">
                  <img
                    src={selectedPic}
                    alt="Profile"
                    className="w-full h-full object-cover object-center"
                  />
                </span>
              </div>
              <div className="flex flex-col gap-[8px] p-[10px]">
                {/* Input file مخفی */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />

                {/* دکمه انتخاب عکس */}
                <button
                  className="text-[#1e88e5] border-[#1e88e5] border-[1px] text-center p-[10px] rounded-lg box-shadow w-full"
                  onClick={() => fileInputRef.current.click()}
                >
                  انتخاب عکس از گالری
                </button>

                {/* دکمه ذخیره تصویر */}
                <button
                  onClick={handleSavePhoto}
                  className="border-[1px] border-[#56a2ff32] bg-[#1e88e5] text-white text-center p-[10px] rounded-lg box-shadow w-full"
                >
                  ذخیره تصویر
                </button>
              </div>
            </div>
            <div className=" grid grid-cols-3 grid-rows-2 gap-[15px] p-[20px]">
              {defaultPics.map((pic, idx) => (
                <img
                  key={idx}
                  src={pic}
                  alt={`porof${idx + 1}`}
                  className={`rounded-full w-full cursor-pointer border-[1.2px] ${
                    selectedPic === pic
                      ? "border-[#0b9ae7dd]"
                      : "border-[#56a3ff61]"
                  }`}
                  onClick={() => setSelectedPic(pic)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#f5f5f5] p-[10px] rounded-sm w-full lg:w-[70%]">
          <h3 className="pb-[4px] lg:pb-[8px] pt-[8px] font-[600] text-[102%]">
            ویرایش اطلاعات
          </h3>
          <form
            action="#"
            onSubmit={handleSaveForm}
            className="flex flex-col gap-[11px] py-[3px] lg:py-[10px] px-[13px] lg:px-[20px]"
          >
            <label className="font-[600]  mt-[10px]" htmlFor="name">
              نام<span className="text-[#c20101]">*</span>
            </label>
            <input
              id="name"
              name="name"
              value={fname}
              type="text"
              onChange={(e) => setFname(e.target.value)}
              placeholder="مثال: شقایق"
              className=" bg-white  placeholder:text-gray-500 py-[7px] px-[14px]  border border-transparent focus:outline-none focus:border-[#bababa] "
            />
            {errors.fname && (
              <p className="text-red-500 text-sm mb-2">{errors.fname}</p>
            )}
            <label className="font-[600]  mt-[10px]" htmlFor="lname">
              نام خانوادگی<span className="text-[#c20101]">*</span>
            </label>
            <input
              id="lname"
              name="lname"
              value={lname}
              type="text"
              onChange={(e) => setLname(e.target.value)}
              placeholder="مثال: محمدی"
              className=" bg-white  placeholder:text-gray-500 py-[7px] px-[14px]  border border-transparent focus:outline-none focus:border-[#bababa] "
            />
            {errors.lname && (
              <p className="text-red-500 text-sm mb-2">{errors.lname}</p>
            )}
            <label className="font-[600]  mt-[10px]" htmlFor="phone">
              شماره تماس<span className="text-[#c20101]">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={phone}
              pattern="\d*"
              maxLength={11}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setPhone(val.slice(0, 11));
              }}
              placeholder="مثال: 09399619640"
              className={` bg-white  placeholder:text-gray-500 py-[7px] px-[14px]  border border-transparent focus:outline-none focus:border-[#bababa]
                ${
                  phone.length > 0 && phone.length !== 11
                    ? "text-red-500 border-red-400"
                    : "text-black "
                }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mb-2">{errors.phone}</p>
            )}
            <label className="font-[600]  mt-[10px]" htmlFor="email">
              ایمیل
              <span className="text-gray-400 text-[85%] px-[4px]">
                (اختیاری)
              </span>
            </label>
            <input
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="مثال: mmdi9882@gmail.com"
              className="bg-white placeholder:text-gray-500 py-[7px] px-[14px] border border-transparent focus:outline-none focus:border-[#bababa]"
            />

            <button className=" bg-[#1e88e5] text-white text-center p-[10px] px-[30px] self-end my-[15px] rounded-lg w-full md:w-[fit-content] lg:w-[fit-content] ">
              ذخیره اطلاعات
            </button>
          </form>
        </div>
      </div>
      <ModalAlert
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        message={modalMessage}
        timer={4000} // مدت زمان نوار progress
      />
    </div>
  );
}
export default memo(UserInfo);
