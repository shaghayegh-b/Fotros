import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import contactus from "../../assets/img/contactus.png";

import { Link } from "react-router-dom";
import { useEffect } from "react";

function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      {/* navbar */}
      <Navbar />
      <div className="h-6 lg:h-16  "></div>
      {/* main */}
      <div className="ContactUs flex-grow py-[10px] px-[14px] md:px-[50px]">
        <h6 className="text-gray-500 pt-[20px] pb-[10px] lg:pt-0 lg:pb-[0px] text-[85%] flex gap-[4px]">
          <Link to="/Fotros/">صفحه اصلی &gt; </Link>
          <span>تماس با ما</span>
        </h6>
        <h1 className="text-[175%] font-bold pt-[0px] pb-[16px] md:py-[25px]">
          تماس با ما
        </h1>
        <div className=" flex flex-col md:flex-row justify-between gap-[45px] md:gap-[20px] ">
          <div className="flex flex-col gap-[5px]">
            <p>
              شما می‌توانید از طریق راه‌های ارتباطی زیر با ما در ارتباط باشید
            </p>
            <p className="flex gap-[25px]">
              <span>شماره تماس :</span> <span>09399619640</span>
            </p>
            <p className="flex gap-[25px]">
              <span>ایمیل :</span>
              <span> @bazrafkannjad.sh</span>
            </p>
          </div>
          <div className="flex justify-center items-center w-full md:w-[45%]">
            <img src={contactus} alt="about" className="w-[70%]" />
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="h-[1.3rem] md:h-[3rem]"></div>
       <Footer />
    </div>
  );
}
export default ContactUs;
