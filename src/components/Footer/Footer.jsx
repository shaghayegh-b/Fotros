import { memo } from "react";
import img from "../../assets/img/wingfotros.png";
import logo1 from "../../assets/img/mojavez-footer.png";
import footer from "../../assets/img/footer.png";

import { FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { MdOutlinePhone } from "react-icons/md";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer bg-[#f5f5f5]">
      <div className="h-[3rem]"></div>
      <div className=" flex justify-around h-[340px]">
        <div className="flex flex-col w-[45%] justify-between px-[18px] h-[88%] gap-[20px]">
          <h2 className=" flex items-baseline gap-[4px] w-[157px] px-[3px] text-[175%] font-bold text-left">
            <img src={img} className="w-[36px]" />
            ف&#x0640;&#x0640;ط&#x0640;&#x0640;&#x0640;روس
          </h2>
          <ul>
            <li>
              <Link to="/Fotros/aboutme">درباره ما</Link>
            </li>
            <li>
              <Link to="/Fotros/contactus">تماس با ما</Link>
            </li>
            <li>
              <Link to="/Fotros/questions">سوالات متداول</Link>
            </li>
            <li>
              <Link to="/Fotros/rules">قوانین و مقررات</Link>
            </li>
            <li>
              <Link to="/Fotros/repol">شرایط بازگشت کالا</Link>
            </li>
          </ul>
          <div className="flex gap-[13px] ">
            <button className="p-[5px] border-solid border-red border-[2px] rounded-full">
              <FaInstagram />
            </button>
            <button className="p-[5px] border-solid border-red border-[2px] rounded-full">
              <FaTelegramPlane />
            </button>
            <button className="p-[5px] border-solid border-red border-[2px] rounded-full">
              <MdOutlinePhone />
            </button>
          </div>
          <img src={logo1} alt="" className="h-[2.5rem] self-start md:hidden" />
          <div className="h-[2rem]"></div>{" "}
        </div>
        <img
          src={footer}
          alt=""
          className="h-[94%] md:h-[100%] w-[50%] md:w-[unset] self-end"
        />
      </div>
      <div className="h-[4rem] hidden md:flex items-center justify-center w-full my-[20px]">
      <img
        src={logo1}
        alt=""
        className="h-[100%]"
      />
      </div>
    </div>
  );
}
export default memo(Footer);
