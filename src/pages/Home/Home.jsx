import Navbar from "../../components/Navbar/Navbar";

import { useAxios } from "../../context/AxiosContaext/AxiosContaext";
import { GiLipstick, GiPoloShirt, GiSkirt } from "react-icons/gi";
import { PiDressBold } from "react-icons/pi";
import { PiHandbagSimpleBold } from "react-icons/pi";
import { TbHomeHeart, TbCategory } from "react-icons/tb";
import { FaSnowflake, FaGlasses } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./Home.css";

import { MdArrowBack, MdArrowForward } from "react-icons/md";

import imgCaucasian from "../../assets/img/Caucasian.png";
import imgkot from "../../assets/img/kot.png";
import imgtap from "../../assets/img/tap.png";
import shirtimg from "../../assets/img/shirt.png";
import imgdaman from "../../assets/img/daman.png";
import offset from "../../assets/img/off.png";
import priceimg from "../../assets/img/percentsymbol.png";
import offImage1 from "../../assets/img/offImage1.png";
import offImage2 from "../../assets/img/offImage2.png";
import offImage3 from "../../assets/img/offImage3.png";
import offImage4 from "../../assets/img/offImage4.png";
import varzeshset from "../../assets/img/set.png";
import tabeston from "../../assets/img/tabeston.png";
import offImage6 from "../../assets/img/offImage6.png";
import ersal from "../../assets/img/send.jpg";
import back from "../../assets/img/back.png";
import sopurt from "../../assets/img/support.png";
import off from "../../assets/img/off2.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// import required modules
import { Navigation, Scrollbar, Autoplay } from "swiper/modules";

import Footer from "../../components/Footer/Footer";
import { useEffect, useRef } from "react";

function Home() {
  const { funcAxios, setSelectedCategory, setActiveFilter } = useAxios();
  const swiperRef = useRef(null);
   useEffect(() => {
    window.scrollTo(0, 0);
    console.log('kk')
  }, []);
  return (
    <>
      <Navbar />
      <div className="h-16  "></div>
      <div className="main1">
        {/* بنر ها */}
        <div className="p-[5px] pt-0">
          <Swiper
            slidesPerView={1}
            spaceBetween={5}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              766: { slidesPerView: 2 },
            }}
            loop={true}
            modules={[Autoplay]}
          >
            <SwiperSlide>
              <img src={ersal} alt="" className="w-full rounded-xl" />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={sopurt}
                alt=""
                className="w-full rounded-xl bg-blue-900"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={back}
                alt=""
                className="w-full rounded-xl bg-blue-800"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img src={off} alt="" className="w-full rounded-xl bg-blue-900" />
            </SwiperSlide>
          </Swiper>
        </div>
        {/* header */}
        <div className="flex mt-[10px] flex-col px-[33px] md:flex-row-reverse">
          {/* بخش 1 */}
          <div className="section1 px-[3px] md:flex-2 flex justify-between  gap-2 mt-[10px]  font-bold text-[125%]">
            <div className="right flex-1 flex flex-col justify-between gap-[20px]">
              {/* رضایت */}

              <div className="flex flex-col rounded-2xl h-[fit-content] bg-blue-200">
                <span className=" my-[2px] mx-[15px] pt-[7px] ">+900</span>
                <div className=" flex justify-between">
                  <span className="mr-[6px] w-[40%] text-[70%] pr-[14px]">
                    مشتری&zwnj;&zwnj;راضی
                  </span>
                  <div className="relative  w-[60%]">
                    <img src={imgCaucasian} alt="" className=" opacity-0 " />
                    <img
                      src={imgCaucasian}
                      alt=""
                      className="absolute bottom-[-14px] left-[-4px] md:bottom-[-21px] "
                    />
                  </div>
                </div>
              </div>

              {/* محصول1 */}
              <div className="SatisfiedCustomer bg-[#f5f5f5] h-[80%] rounded-2xl p-[15px] ">
                <img src={imgkot} alt="" className="" />
              </div>
            </div>

            <div className="left flex-1 flex flex-col gap-2">
              {/* محصول 2 */}
              <div className=" bg-[#f5f5f5] rounded-2xl p-[9px] h-[80%] flex items-center">
                <img src={imgtap} alt="" className="" />
              </div>
              {/* تنوع محصول */}
              <div className="rounded-sm rounded-tr-[8rem] h-[130px]  p-[14px] bg-blue-200 flex flex-col justify-center">
                <span className="px-[13px] self-end">+500</span>
                <span className="self-center">محصول متنوع</span>
              </div>
            </div>
          </div>
          {/* فاصله */}
          <div className="h-[6rem] relative md:hidden">
            <img
              src={shirtimg}
              alt=""
              className="h-[5rem] absolute left-[1rem] bottom-0"
            />
          </div>
          {/* بخش2 */}
          <div className="section2 md:flex-2 relative mx-[9px] flex flex-col justify-center items-center">
            <h1 className="font-bold text-[180%]">
              ب&#x0640;&#x0640;ا&zwnj;&zwnj; &zwnj;&zwnj;&zwnj;&zwnj;
              <span className="text-blue-500">
                ف&#x0640;&#x0640;ط&#x0640;&#x0640;روس <br />
              </span>
              م&#x0640;&#x0640;ت&#x0640;&#x0640;ف&#x0640;&#x0640;اوت
              ظ&#x0640;&#x0640;اه&#x0640;&#x0640;ر ش&#x0640;و
            </h1>
            <button className="m-[20px] mb-[17px] w-[90%] md:w-[60%] bg-[#1e88e5] text-white text-[120%] p-[10px] rounded-xl box-shadow ">
              محصولات جدید
            </button>
            <button
              type="button"
              onClick={() => {
                funcAxios(
                  "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products"
                );
              }}
              className="m-[10px] mt-[0px] w-[90%] md:w-[60%] border-[#1e88e5] border-[1px] text-[120%] p-[10px] rounded-xl box-shadow "
            >
              همه محصولات
            </button>
            <div className="h-[2rem] relative">
              <img
                src={imgdaman}
                alt=""
                className="h-[4rem] absolute left-[1rem] bottom-0"
              />
            </div>
          </div>
        </div>
        {/* فاصله */}
        <div className="h-[2rem] md:h-[5rem] relative">
          <img
            src={imgdaman}
            alt=""
            className="h-[5.4rem] absolute right-[3.6rem] z-2 bottom-0"
          />
        </div>
        {/* دسته بندی  */}
        <div className="categorys ">
          <h3 className="font-bold text-[140%] px-[15px]  ">
            دس&#x0640;&#x0640;ته بن&#x0640;&#x0640;دی
            م&#x0640;&#x0640;حص&#x0640;&#x0640;ولات
          </h3>
          <Swiper
            slidesPerView={4}
            spaceBetween={15}
            scrollbar={{
              hide: true,
            }}
            breakpoints={{
              768: { slidesPerView: 6 },
              1000: { slidesPerView: 7 },
            }}
            modules={[Scrollbar]}
          >
            <SwiperSlide>
              <button
                type="button"
                onClick={() => {
                  funcAxios(
                    "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?category=مانتو"
                  );
                  setSelectedCategory("مانتو");
                  setActiveFilter("");
                }}
                className={`Category`}
              >
                <GiPoloShirt /> <p>مانتو</p>
              </button>
            </SwiperSlide>
            <SwiperSlide>
              <button
                type="button"
                onClick={() => {
                  funcAxios(
                    "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?category=شلوار"
                  );
                  setSelectedCategory("دامن");
                  setActiveFilter("");
                }}
                className={`Category`}
              >
                <GiSkirt />
                <p>
                  شلوار{"\u2009"}و{"\u2009"}دامن
                </p>
              </button>
            </SwiperSlide>
            <SwiperSlide>
              <button
                type="button"
                onClick={() => {
                  funcAxios(
                    "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?category=ست"
                  );
                  setSelectedCategory("ست");
                  setActiveFilter("");
                }}
                className={`Category`}
              >
                <PiDressBold />
                <p>ست</p>
              </button>
            </SwiperSlide>
            <SwiperSlide>
              <button
                type="button"
                onClick={() => {
                  funcAxios(
                    "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?category=خونگی"
                  );
                  setSelectedCategory("خونه ای");
                  setActiveFilter("");
                }}
                className={`Category`}
              >
                <TbHomeHeart />
                <p>
                  تو{"\u2009"}خونه{"\u200A"}ای
                </p>
              </button>
            </SwiperSlide>
            <SwiperSlide>
              <button
                type="button"
                onClick={() => {
                  funcAxios(
                    "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?category=ارایشی"
                  );
                  setSelectedCategory("ارایشی");
                  setActiveFilter("");
                }}
                className={`Category`}
              >
                <GiLipstick />

                <p>ارایشی&zwnj;&zwnj;بهداشتی</p>
              </button>
            </SwiperSlide>
            <SwiperSlide>
              <button
                type="button"
                onClick={() => {
                  funcAxios(
                    "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?category=زمستونه"
                  );
                  setSelectedCategory("زمستونه");
                  setActiveFilter("");
                }}
                className={`Category`}
              >
                <FaSnowflake />
                <p>لباس{"\u200A"}گرم</p>
              </button>
            </SwiperSlide>
            <SwiperSlide>
              <button
                type="button"
                onClick={() => {
                  funcAxios(
                    "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?category=کیف"
                  );
                  setSelectedCategory("کفش");
                  setActiveFilter("");
                }}
                className={`Category`}
              >
                <PiHandbagSimpleBold />{" "}
                <p>
                  کیف{"\u2009"}و{"\u2009"}کفش
                </p>
              </button>
            </SwiperSlide>
            <SwiperSlide>
              <button
                type="button"
                onClick={() => {
                  funcAxios(
                    "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?category=اکسسوری"
                  );
                  setSelectedCategory("اکسسوری");
                  setActiveFilter("");
                }}
                className={`Category`}
              >
                <FaGlasses />
                <p>اکسسوری</p>
              </button>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="h-[1.3rem] md:h-[3rem]"></div>
        {/* تخفیفات */}
        <div className="m-[15px] p-[10px] mx-[30px] md:mx-[50px] bg-blue-200 h-[180px] md:h-[200px] rounded-2xl flex md:items-center">
          <img className="h-[100%] md:h-[155%]" src={offset} alt="" />
          <div className="w-full flex flex-col justify-center">
            <div className="flex justify-center md:justify-start relative  my-[7px] w-[100%]">
              <div>
                <p className="text-[140%] font-[600]">
                  ف&#x0640;روش وی&#x0640;&#x0640;ژه
                </p>
                <br />
                <p className="md:text-[135%]">
                  ت&#x0640;خف&#x0640;یف وی&#x0640;ژه روزانه
                  <br />
                  بر روی تمامی محصولات
                </p>
              </div>
              <p className=" absolute left-[32px] top-[30px] w-20% self-center bg-[#f5f5f5] rotate-[343deg] p-[4px] px-[6px] rounded-sm text-red-700 h-[fit-content] flex ">
                <span>70</span>
                <img className="w-[20px] h-[20px]" src={priceimg} alt="" />
              </p>
            </div>
            <button className="w-full flex justify-end-safe md:text-[130%] md:px-[10px] items-center">
              مشاهده محصولات
              <span className="w-[15px] ">
                <IoMdArrowRoundBack />
              </span>
            </button>
          </div>
        </div>
        <div className="h-[1.5rem] md:h-[3rem]"></div>

        {/* محصولات جدید */}
        <div>
          <div className=" flex justify-between items-center">
            <h3 className="font-bold text-[140%] px-[14px]  ">
              م&#x0640;حص&#x0640;ولات ج&#x0640;دی&#x0640;د
            </h3>
            <button className="hidden md:inline-block m-[20px] mb-[10px] bg-[#1e88e5] text-white text-[120%] p-[10px] w-[60%] md:w-[250px] rounded-xl box-shadow ">
              مشاهده همه محصولات
            </button>
          </div>
          <div className="p-[5px] pt-0 NewProducts relative">
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="swiper-button-next-custom hidden md:flex items-center justify-center absolute top-1/2 left-4 z-2
                   bg-white text-[#1e88e5] shadow-md hover:shadow-lg hover:bg-[#1e88e5] hover:text-white
                   p-3 rounded-full text-2xl"
            >
              {" "}
              <MdArrowBack />
            </button>
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="swiper-button-prev-custom hidden md:flex items-center justify-center absolute top-1/2 right-4 z-2
                   bg-white text-[#1e88e5] shadow-md hover:shadow-lg hover:bg-[#1e88e5] hover:text-white
                   p-3 rounded-full text-2xl"
            >
              <MdArrowForward />
            </button>
            <Swiper
              dir="rtl"
              slidesPerView={2}
              spaceBetween={9}
              breakpoints={{
                768: { slidesPerView: 4 },
                1000: { slidesPerView: 5 },
              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              scrollbar={{
                hide: true,
              }}
              loop={true}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              modules={[Scrollbar, Autoplay, Navigation]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              <SwiperSlide>
                <div className=" flex flex-col   p-[10px] md:w-[170px] lg:w-[200px] rounded-xl box-shadow">
                  <div className="w-[151px] h-[151px]">
                    <img src={offImage1} alt="" className="self-center" />
                  </div>
                  <p className="self-start pt-[15px]">شلوار مازراتی</p>
                  <p className="self-end pt-[25px]">500,000</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className=" flex flex-col   p-[7px]  md:w-[170px] lg:w-[200px] rounded-xl box-shadow">
                  <div className="w-[151px] h-[151px]">
                    <img src={offImage2} alt="" className="self-center" />
                  </div>
                  <p className="self-start pt-[15px]">پیراهن سارا</p>
                  <p className="self-end pt-[25px]">800,000</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className=" flex flex-col   p-[7px]  md:w-[170px] lg:w-[200px] rounded-xl box-shadow">
                  <div className="w-[151px] h-[151px]">
                    <img src={offImage3} alt="" className="self-center" />
                  </div>
                  <p className="self-start pt-[15px]">پیراهن اسمان</p>
                  <p className="self-end pt-[25px]">750,000</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className=" flex flex-col   p-[7px]  md:w-[170px] lg:w-[200px] rounded-xl box-shadow">
                  <div className="w-[151px] h-[151px]">
                    <img src={offImage4} alt="" className="self-center" />
                  </div>
                  <p className="self-start pt-[15px]">دامن کلوش</p>
                  <p className="self-end pt-[25px]">600,000</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className=" flex flex-col   p-[7px]  md:w-[170px] lg:w-[200px] rounded-xl box-shadow">
                  <div className="w-[151px] h-[151px]">
                    <img src={offImage6} alt="" className="self-center" />
                  </div>
                  <p className="self-start pt-[15px]">پیراهن لنا</p>
                  <p className="self-end pt-[25px]">890,000</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className=" flex flex-col   p-[7px]  md:w-[170px] lg:w-[200px] rounded-xl box-shadow">
                  <div className="w-[151px] h-[151px]">
                    <img src={offImage1} alt="" className="self-center" />
                  </div>
                  <p className="self-start pt-[15px]">شلوار مازراتی</p>
                  <p className="self-end pt-[25px]">500,000</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className=" flex flex-col   p-[7px]  md:w-[170px] lg:w-[200px] rounded-xl box-shadow">
                  <div className="w-[151px] h-[151px]">
                    <img src={offImage2} alt="" className="self-center" />
                  </div>
                  <p className="self-start pt-[15px]">پیراهن سارا</p>
                  <p className="self-end pt-[25px]">800,000</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className=" flex flex-col   p-[7px]  md:w-[170px] lg:w-[200px] rounded-xl box-shadow">
                  <div className="w-[151px] h-[151px]">
                    <img src={offImage3} alt="" className="self-center" />
                  </div>
                  <p className="self-start pt-[15px]">پیراهن اسمان</p>
                  <p className="self-end pt-[25px]">750,000</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className=" flex flex-col   p-[7px]  md:w-[170px] lg:w-[200px] rounded-xl box-shadow">
                  <div className="w-[151px] h-[151px]">
                    <img src={offImage4} alt="" className="self-center" />
                  </div>
                  <p className="self-start pt-[15px]">دامن کلوش</p>
                  <p className="self-end pt-[25px]">600,000</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className=" flex flex-col   p-[7px]  md:w-[170px] lg:w-[200px] rounded-xl box-shadow">
                  <div className="w-[151px] h-[151px]">
                    <img src={offImage6} alt="" className="self-center" />
                  </div>
                  <p className="self-start pt-[15px]">پیراهن لنا</p>
                  <p className="self-end pt-[25px]">890,000</p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="  flex items-center justify-center md:hidden">
            <button className=" m-[20px] mb-[10px] bg-[#1e88e5] text-white text-[120%] p-[10px] w-[60%] rounded-xl box-shadow ">
              مشاهده همه محصولات
            </button>
          </div>
        </div>
        {/* فاصله */}
        <div className="h-[4.5rem]  "></div>
        {/* ست ها */}
        <div className="  px-[3px]">
          <h2 className="font-bold text-[140%] px-[14px]  ">
            س&#x0640;&#x0640;ت ه&#x0640;&#x0640;ا
          </h2>

          <div className=" grid px-[8px]  grid-rows-4 grid-cols-1 md:grid-rows-2 md:grid-cols-2 md:px-[5px]  gap-[7px] md:gap-[10px]">
            <div className="mx-[8px] p-[10px] md:m-[unset] bg-blue-200 h-[150px] lg:h-[200px] rounded-2xl flex">
              <div className="h-[100%]  w-[50%] flex justify-center items-center">
                <img className="h-[100%]" src={varzeshset} alt="" />
              </div>
              <div className="w-full flex flex-col justify-between">
                <div>
                  <p className="text-[137%] font-[600] mb-[10px]">
                    ست های ورزشی
                  </p>

                  <p>برای ساختن بدنی سالم و سرحال</p>
                  <p>برای ساختن بدنی سالم و سرحال</p>
                  <p>برای ساختن بدنی سالم و سرحال</p>
                </div>

                <button className="w-full flex justify-end-safe items-center md:px-[10px]">
                  مشاهده محصولات
                  <span className="w-[15px] ">
                    <IoMdArrowRoundBack />
                  </span>
                </button>
              </div>
            </div>

            <div className="mx-[8px] p-[10px] md:m-[unset] bg-blue-200 h-[150px] lg:h-[200px] rounded-2xl flex">
              <div className="h-[100%]  w-[50%] flex justify-center items-center">
                <img className="h-[100%]" src={tabeston} alt="" />
              </div>
              <div className="w-full flex flex-col justify-between">
                <div>
                  <p className="text-[137%] font-[600] mb-[10px]">
                    ست های تابستونه
                  </p>

                  <p>برای روزهای گرم سال</p>
                  <p>برای روزهای گرم سال</p>
                  <p>برای روزهای گرم سال</p>
                </div>

                <button className="w-full flex justify-end-safe items-center md:px-[10px]">
                  مشاهده محصولات
                  <span className="w-[15px] ">
                    <IoMdArrowRoundBack />
                  </span>
                </button>
              </div>
            </div>

            <div className="mx-[8px] p-[10px] md:m-[unset] bg-blue-200 h-[150px] lg:h-[200px] rounded-2xl flex">
              <div className="h-[100%]  w-[50%] flex justify-center items-center">
                <img className="h-[100%]" src={offset} alt="" />
              </div>
              <div className="w-full flex flex-col justify-between">
                <div>
                  <p className="text-[137%] font-[600] mb-[10px]">
                    ست های کامل
                  </p>

                  <p>برای زدن یه استایل خانمانه</p>
                  <p>برای زدن یه استایل خانمی</p>
                </div>

                <button className="w-full flex justify-end-safe items-center md:px-[10px]">
                  مشاهده محصولات
                  <span className="w-[15px] ">
                    <IoMdArrowRoundBack />
                  </span>
                </button>
              </div>
            </div>

            <div className="mx-[8px] p-[10px] md:m-[unset] bg-blue-200 h-[150px] lg:h-[200px] rounded-2xl flex">
              <div className="h-[100%]  w-[50%] flex justify-center items-center">
                <img className="h-[100%]" src={varzeshset} alt="" />
              </div>
              <div className="w-full flex flex-col justify-between">
                <div>
                  <p className="text-[137%] font-[600] mb-[10px]">
                    ست های ورزشی
                  </p>

                  <p>برای ساختن بدنی سالم و سرحال</p>
                  <p>برای ساختن بدنی سالم و سرحال</p>
                </div>

                <button className="w-full flex justify-end-safe items-center md:px-[10px]">
                  مشاهده محصولات
                  <span className="w-[15px] ">
                    <IoMdArrowRoundBack />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[1.3rem] md:h-[3rem]"></div>
        {/* footer */}
        <Footer />
      </div>
    </>
  );
}
export default Home;
