import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
// import questions from "../../assets/img/questions.png";
import { SlArrowDown } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Questions() {
  const [part1, setPart1] = useState(false);
  const [part2, setPart2] = useState(false);
  const [part3, setPart3] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      {/* navbar */}
      <Navbar />
      <div className="h-5 lg:h-16  "></div>
      {/* main */}
      <div className="Questions flex-grow py-[10px] px-[14px] md:px-[50px] ">
        <h6 className="text-gray-500 text-[85%] flex gap-[4px]">
          <Link to="/Fotros/">صفحه اصلی &gt; </Link>
          <span>سوالات متداول</span>
        </h6>
        <h1 className="text-[175%] font-bold  pt-[0px] pb-[16px] md:py-[25px]">
          سوالات متداول
        </h1>
        <div className="flex flex-col gap-[10px] ">
          {/* 1اقساط */}
          <div className="bg-[#f5f5f5] rounded-[5px] px-[18px] py-[4px]">
            <button
              onClick={() => setPart1(!part1)}
              className="flex justify-between items-center w-full"
            >
              <span> چگونه میتوانم بصورت اعتباری (اقساط) خرید کنم؟</span>
              <span
                className={`${
                  part1 ? "rotate-[180deg] " : ""
                } duration-400 ease-in-out`}
              >
                <SlArrowDown />
              </span>
            </button>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                part1 ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <p>شرایط اقساط1</p>
            </div>
          </div>
          {/* 2اقساط */}
          <div className="bg-[#f5f5f5] rounded-[5px] px-[18px] py-[4px]">
            <button
              onClick={() => setPart2(!part2)}
              className="flex justify-between items-center w-full"
            >
              <span> چگونه میتوانم بصورت اعتباری (اقساط) خرید کنم؟</span>
              <span
                className={`${
                  part2 ? "rotate-[180deg] " : ""
                } duration-400 ease-in-out`}
              >
                <SlArrowDown />
              </span>
            </button>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                part2 ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <p>شرایط اقساط2</p>
            </div>
          </div>
          {/*3اقساط */}
          <div className="bg-[#f5f5f5] rounded-[5px] px-[18px] py-[4px]">
            <button
              onClick={() => setPart3(!part3)}
              className="flex justify-between items-center w-full "
            >
              <span> چگونه میتوانم بصورت اعتباری (اقساط) خرید کنم؟</span>
              <span
                className={`${
                  part3 ? "rotate-[180deg] " : ""
                } duration-400 ease-in-out`}
              >
                <SlArrowDown />
              </span>
            </button>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                part3 ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <p>شرایط اقساط3</p>
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="h-[1.3rem] md:h-[3rem]"></div> <Footer />
    </div>
  );
}
export default Questions;
