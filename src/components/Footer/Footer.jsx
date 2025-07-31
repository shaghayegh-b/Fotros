import { memo } from "react";
import img from "../../assets/img/bal.png";
import logo1 from "../../assets/img/mojavez-footer.png";
import footer from "../../assets/img/footer.png";

import { FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { MdOutlinePhone } from "react-icons/md";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div classname="footer">
      <div className="h-[3rem]"></div>
      <div className=" flex justify-between h-[340px]">
        <div>
          <div className="flex flex-col justify-between px-[18px] h-[88%] gap-[20px]">
            <h2 className="relative w-[157px] px-[3px] text-[175%] font-bold text-left">
              <img src={img} className="w-[46px] bottom-[13px] absolute" />
              ف&#x0640;&#x0640;ط&#x0640;&#x0640;&#x0640;روس
            </h2>
            <ul>
              <li>
                <Link>درباره ما</Link>
              </li>
              <li>
                <Link>تماس با ما</Link>
              </li>
              <li>
                <Link>سوالات متداول</Link>
              </li>
              <li>
                <Link>قوانین و مقررات</Link>
              </li>
              <li>
                <Link>شرایط بازگشت کالا</Link>
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
            <img src={logo1} alt="" className="h-[2.5rem] self-start" />
            <div className="h-[2rem]"></div>{" "}
          </div>
        </div>
        <img src={footer} alt="" className="h-[94%] self-end" />
      </div>
    </div>
  );
}
export default memo(Footer);
