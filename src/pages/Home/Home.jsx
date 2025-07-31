import Navbar from "../../components/Navbar/Navbar";

import { useAxios } from "../../context/AxiosContaext/AxiosContaext";
import { GiLipstick, GiPoloShirt, GiSkirt } from "react-icons/gi";
import { PiDressBold } from "react-icons/pi";
import { PiHandbagSimpleBold } from "react-icons/pi";
import { TbHomeHeart, TbCategory } from "react-icons/tb";
import { FaSnowflake, FaGlasses } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./Home.css";

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
import offImage6 from "../../assets/img/offImage6.png";
import ersal from "../../assets/img/ersal.jpg";
import back from "../../assets/img/back.png";
import sopurt from "../../assets/img/sopurt.png";
import off from "../../assets/img/off2.png";

import varzeshset from "../../assets/img/set.png";
import tabeston from "../../assets/img/tabeston.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

// import required modules
import { Autoplay, Scrollbar } from "swiper/modules";
import Footer from "../../components/Footer/Footer";

function Home() {
  const { funcAxios, setSelectedCategory, setActiveFilter } = useAxios();

  return (
    <>
      <Navbar />
      <div className="h-16  "></div>
      <div className="main  ">
        {/* بنر ها */}
        <div className="p-[5px] pt-0">
          <Swiper
            slidesPerView={1}
            spaceBetween={5}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Autoplay]}
          >
            <SwiperSlide>
              <img src={ersal} alt="" className="w-full rounded-xl" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={sopurt} alt="" className="w-full rounded-xl bg-blue-900" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={back} alt="" className="w-full rounded-xl bg-blue-800" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={off} alt="" className="w-full rounded-xl bg-blue-900" />
            </SwiperSlide>
          </Swiper>
        </div>
        {/* بخش 1 */}
        <div className="section1 px-[3px] flex justify-between gap-2 mt-[10px]  font-bold text-[155%]">
          <div className="right flex-1 flex flex-col justify-between gap-[20px]">
            {/* رضایت */}
            <div className="SatisfiedCustomer flex flex-col rounded-2xl w-[100%] h-[8rem] relative bg-blue-200">
              <span className=" my-[2px] mx-[15px] ">+900</span>
              <div className="SatisfiedCustomerText flex justify-between">
                <span className="mr-[6px] self-center">
                  مشتری&zwnj;&zwnj;راضی
                </span>
              </div>
              <img
                src={imgCaucasian}
                alt=""
                className="SatisfiedCustomerImg w-[58%] z-1 absolute bottom-[-15px] left-0"
              />
            </div>

            {/* محصول1 */}
            <div className="SatisfiedCustomer bg-[#f5f5f5] rounded-2xl p-[15px] ">
              <img src={imgkot} alt="" className="" />
            </div>
          </div>

          <div className="left flex-1 flex flex-col gap-2 justify-between ">
            {/* محصول 2 */}
            <img
              src={imgtap}
              alt=""
              className=" bg-[#f5f5f5] rounded-2xl p-[9px] h-[56%] "
            />
            {/* تنوع محصول */}
            <div className="rounded-sm rounded-tr-[8rem] h-[38%]  p-[14px] bg-blue-200 flex flex-col justify-center">
              <span className="px-[13px] self-end">+500</span>
              <span className="self-center">محصول متنوع</span>
            </div>
          </div>
        </div>
        {/* فاصله */}
        <div className="h-[6rem] relative">
          <img
            src={shirtimg}
            alt=""
            className="h-[5rem] absolute left-[1rem] bottom-0"
          />
        </div>
        {/* بخش2 */}
        <div className="section2 relative mx-[9px] flex flex-col justify-center items-center">
          <h1 className="font-bold text-[180%]">
            ب&#x0640;&#x0640;ا&zwnj;&zwnj; &zwnj;&zwnj;&zwnj;&zwnj;
            <span className="text-blue-500">
              ف&#x0640;&#x0640;ط&#x0640;&#x0640;روس <br />
            </span>
            م&#x0640;&#x0640;ت&#x0640;&#x0640;ف&#x0640;&#x0640;اوت
            ظ&#x0640;&#x0640;اه&#x0640;&#x0640;ر ش&#x0640;و
          </h1>
          <button className="m-[20px] mb-[17px] w-[60%] bg-[#1e88e5] text-white text-[120%] p-[10px] rounded-xl box-shadow ">
            محصولات جدید
          </button>
          <button
            type="button"
            onClick={() => {
              funcAxios(
                "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products"
              );
            }}
            className="m-[10px] mt-[0px] w-[60%] border-[#1e88e5] border-[1px] text-[120%] p-[10px] rounded-xl box-shadow "
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
        {/* فاصله */}
        <div className="h-[2rem] relative">
          <img
            src={imgdaman}
            alt=""
            className="h-[5.4rem] absolute right-[3.6rem] z-2 bottom-0"
          />
        </div>
        {/* دسته بندی  */}
        <div className="categorys p-[10px]">
          <h3 className="font-bold text-[140%] px-[5px]  ">
            دس&#x0640;&#x0640;ته بن&#x0640;&#x0640;دی
            م&#x0640;&#x0640;حص&#x0640;&#x0640;ولات
          </h3>
          <Swiper
            slidesPerView={4}
            spaceBetween={15}
            scrollbar={{
              hide: true,
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
        <div className="h-[1.3rem]"></div>
        {/* تخفیفات */}
        <div className="m-[15px] p-[10px] bg-blue-200 h-[150px] rounded-2xl flex">
          <img className="h-[100%]" src={offset} alt="" />
          <div className="w-full flex flex-col justify-between">
            <div className="flex justify-around  my-[7px] w-[100%]">
              <div>
                <p className="text-[137%] font-[600]">
                  ف&#x0640;روش وی&#x0640;&#x0640;ژه
                </p>

                <p>
                  ت&#x0640;خف&#x0640;یف وی&#x0640;ژه روزانه
                  <br />
                  بر روی تمامی محصولات
                </p>
              </div>
              <p className="w-20% self-center bg-[#f5f5f5] rotate-[343deg] p-[4px] px-[6px] rounded-sm text-red-700 h-[fit-content] flex ">
                <span>70</span>
                <img className="w-[20px] h-[20px]" src={priceimg} alt="" />
              </p>
            </div>
            <button className="w-full flex justify-end-safe items-center">
              مشاهده محصولات
              <span className="w-[15px] ">
                <IoMdArrowRoundBack />
              </span>
            </button>
          </div>
        </div>
        <div className="h-[2.7rem]"></div>
      </div>
      {/* محصولات جدید */}
      <div>
        <h3 className="font-bold text-[140%] px-[14px]  ">
          م&#x0640;حص&#x0640;ولات ج&#x0640;دی&#x0640;د
        </h3>
        <div className="p-[5px] pt-0">
          <Swiper
            slidesPerView={4}
            spaceBetween={14}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            scrollbar={{
              hide: true,
            }}
            loop={true}
            modules={[Scrollbar, Autoplay]}
          >
            <SwiperSlide>
              <div className="flex flex-col   p-[7px] w-[100px] rounded-xl box-shadow">
                <img src={offImage1} alt="" className="self-center" />
                <p className="self-start">شلوار مازراتی</p>
                <p className="self-end">500,000</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col   p-[7px] w-[100px] rounded-xl box-shadow">
                <img src={offImage2} alt="" className="self-center" />
                <p className="self-start">پیراهن سارا</p>
                <p className="self-end">800,000</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col   p-[7px] w-[100px] rounded-xl box-shadow">
                <img src={offImage3} alt="" className="self-center" />
                <p className="self-start">پیراهن اسمان</p>
                <p className="self-end">750,000</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col   p-[7px] w-[100px] rounded-xl box-shadow">
                <img src={offImage4} alt="" className="self-center" />
                <p className="self-start">دامن کلوش</p>
                <p className="self-end">600,000</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col   p-[7px] w-[100px] rounded-xl box-shadow">
                <img src={offImage6} alt="" className="self-center" />
                <p className="self-start">پیراهن لنا</p>
                <p className="self-end">890,000</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col   p-[7px] w-[100px] rounded-xl box-shadow">
                <img src={offImage1} alt="" className="self-center" />
                <p className="self-start">شلوار مازراتی</p>
                <p className="self-end">500,000</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col   p-[7px] w-[100px] rounded-xl box-shadow">
                <img src={offImage2} alt="" className="self-center" />
                <p className="self-start">پیراهن سارا</p>
                <p className="self-end">800,000</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col   p-[7px] w-[100px] rounded-xl box-shadow">
                <img src={offImage3} alt="" className="self-center" />
                <p className="self-start">پیراهن اسمان</p>
                <p className="self-end">750,000</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col   p-[7px] w-[100px] rounded-xl box-shadow">
                <img src={offImage4} alt="" className="self-center" />
                <p className="self-start">دامن کلوش</p>
                <p className="self-end">600,000</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col   p-[7px] w-[100px] rounded-xl box-shadow">
                <img src={offImage6} alt="" className="self-center" />
                <p className="self-start">پیراهن لنا</p>
                <p className="self-end">890,000</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="  flex items-center justify-center">
          <button className=" m-[20px] mb-[10px] bg-[#1e88e5] text-white text-[120%] p-[10px] w-[60%] rounded-xl box-shadow ">
            مشاهده همه محصولات
          </button>
        </div>
      </div>
      {/* فاصله */}
      <div className="h-[3.5rem]  "></div>
      {/* ست ها */}
      <div className="  px-[3px]">
        <div className="h-[.9rem]"></div>

        <h2 className="font-bold text-[140%] px-[14px]  ">
          س&#x0640;&#x0640;ت ه&#x0640;&#x0640;ا
        </h2>

        <div className=" flex flex-col  gap-[7px]">
          <div className="mx-[8px] p-[10px] bg-blue-200 h-[150px] rounded-2xl flex">
            <img className="h-[100%]" src={varzeshset} alt="" />
            <div className="w-full flex flex-col justify-between">
              <div>
                <p className="text-[137%] font-[600]">ست های ورزشی</p>

                <p className="py-[10px] text-[110%] font-[500]">
                  برای ساختن بدنی سالم و سرحال
                </p>
              </div>

              <button className="w-full flex justify-end-safe items-center">
                مشاهده محصولات
                <span className="w-[15px] ">
                  <IoMdArrowRoundBack />
                </span>
              </button>
            </div>
          </div>

          <div className="mx-[8px] p-[10px] bg-blue-200 h-[150px] rounded-2xl flex">
            <img className="h-[100%]" src={tabeston} alt="" />
            <div className="w-full flex flex-col justify-between">
              <div>
                <p className="text-[137%] font-[600]">ست های تابستونه</p>

                <p className="py-[10px]  text-[110%] font-[500]">
                  برای روزهای گرم سال
                </p>
              </div>

              <button className="w-full flex justify-end-safe items-center">
                مشاهده محصولات
                <span className="w-[15px] ">
                  <IoMdArrowRoundBack />
                </span>
              </button>
            </div>
          </div>

          <div className="mx-[8px] p-[10px] bg-blue-200 h-[150px] rounded-2xl flex">
            <img className="h-[100%]" src={offset} alt="" />
            <div className="w-full flex flex-col justify-between">
              <div>
                <p className="text-[137%] font-[600]">ست های کامل</p>

                <p className="py-[10px]  text-[110%] font-[500]">
                  برای زدن یه استایل خانمی
                </p>
              </div>

              <button className="w-full flex justify-end-safe items-center">
                مشاهده محصولات
                <span className="w-[15px] ">
                  <IoMdArrowRoundBack />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1.3rem]"></div>
      {/* footer */}
      <Footer />
    </>
  );
}
export default Home;
