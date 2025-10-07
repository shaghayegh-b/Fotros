import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext/AuthContext";
import imgdaman from "../../assets/img/daman.png";
import shirtimg from "../../assets/img/shirt.png";
import topimg from "../../assets/img/top.png";
import porof1 from "../../assets/img/porof1.png";
import porof2 from "../../assets/img/porof2.png";
import porof3 from "../../assets/img/porof3.png";
import porof4 from "../../assets/img/porof4.png";
import porof5 from "../../assets/img/porof5.png";
import porof6 from "../../assets/img/porof6.png";
import { useNavigate } from "react-router-dom";
function ProfileLogin() {
  const { user, updateUser } = useAuth();

  const [profilePic, setProfilePic] = useState(user?.profilePic || "");
  const [selectedPic, setSelectedPic] = useState(profilePic || porof1);
  const [isCustomPic, setIsCustomPic] = useState(false);
  const defaultPics = [porof1, porof2, porof3, porof4, porof5, porof6];

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setProfilePic(user?.profilePic || "");
  }, [user]);
  // انتخاب فایل و تبدیل به Base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        setIsCustomPic(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhoto = () => {
    updateUser({ profilePic });
    alert("عکس پروفایل ذخیره شد ✅");
    navigate("/Fotros");
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
      <div className="max-h-[95vh] overflow-y-scroll w-[85%] md:w-[65%] z-3 bg-[white] rounded-md  my-[15px] flex items-center justify-center ">
        <div className=" flex flex-col items-center justify-center gap-[10px] p-[30px]">
          <h2 className="text-center w-full font-semibold text-[130%] ">
            انتخاب عکس پروفایل
          </h2>
          {/* profile */}
          <div className=" rounded-sm flex flex-col w-[80%]">
            <div className="flex justify-center">
              <span className="flex justify-center items-center m-[10px] w-[123px] h-[123px] shadow-lg rounded-full overflow-hidden">
                <img
                  src={profilePic || porof1}
                  alt="Profile"
                  className="w-full h-full object-cover object-center"
                />
              </span>
            </div>
            <div className=" self-center grid grid-cols-3 grid-rows-2 gap-[15px] p-[20px]">
              {defaultPics.map((pic, idx) => (
                <img
                  key={idx}
                  src={pic}
                  alt={`porof${idx + 1}`}
                  className={`rounded-full w-full cursor-pointer border-[2px] ${
                    !isCustomPic && selectedPic === pic
                      ? "border-[#0b9ae7dd] border-[3px]"
                      : "border-[#56a3ff61]"
                  }`}
                  onClick={() => {
                    setProfilePic(pic);
                    setSelectedPic(pic);
                    setIsCustomPic(false);
                  }}
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
        </div>
      </div>
    </div>
  );
}

export default ProfileLogin;
