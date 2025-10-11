import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

import imgCaucasian from "../../assets/img/Caucasian.png";
import imgkot from "../../assets/img/kot.png";
import imgtap from "../../assets/img/tap.png";
import shirtimg from "../../assets/img/shirt.png";
import imgdaman from "../../assets/img/daman.png";
import offset from "../../assets/img/off.png";
import priceimg from "../../assets/img/percentsymbol.png";
import varzeshset from "../../assets/img/set.png";
import tabeston from "../../assets/img/tabeston.png";
import ersal from "../../assets/img/send.jpg";
import back from "../../assets/img/back.png";
import sopurt from "../../assets/img/support.png";
import off from "../../assets/img/off2.png";

import Categorys from "../../components/Categorys/Categorys";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { useAxios } from "../../context/AxiosContaext/AxiosContaext";
import "./Home.css";
import SlideProduct from "../../components/SlideProduct/SlideProduct";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// import required modules
import { Autoplay } from "swiper/modules";

function Home() {
  const { funcAxios, applyFilter, setSortFilter, setOnlyAvailable } =
    useAxios();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-10 lg:h-16"></div>
      <div className="main1">
        {/* بنر ها */}
        <div className="pb-[5px] pt-0 px-[10px] ">
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
        <div className="flex mt-[10px] flex-col px-[16px] md:flex-row-reverse">
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
              <Link to="/Fotros/Products/12" className="SatisfiedCustomer bg-[#f5f5f5] h-[80%] rounded-2xl p-[15px] ">
                <img src={imgkot} alt="محصول1" className="" />
              </Link>
            </div>

            <div className="left flex-1 flex flex-col gap-2">
              {/* محصول 2 */}
              <Link to="/Fotros/Products/27" className=" bg-[#f5f5f5] rounded-2xl p-[9px] h-[80%] flex items-center">
                <img src={imgtap} alt="محصول2" className="" />
              </Link>
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
              className="h-[5rem] absolute left-[1rem] bottom-0 z-1"
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
            <Link
              to="/Fotros/Products"
              onClick={() => {
                localStorage.removeItem("products");
                localStorage.removeItem("productsFetchTime");
                funcAxios(
                  "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?sortBy=idsortby&order=desc"
                );
                setSortFilter("");
                setOnlyAvailable(false);
                applyFilter("", false, "محصولات جدید");
              }}
              className="m-[20px] mb-[17px] w-[90%] md:w-[60%] bg-[#1e88e5] text-white text-[120%] text-center p-[10px] rounded-xl box-shadow "
            >
              محصولات جدید
            </Link>
            <Link
              type="button"
              to="/Fotros/Products"
              onClick={() => {
                funcAxios(
                  "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products"
                );
                setSortFilter("");
                setOnlyAvailable(false);
                applyFilter("", false, "همه محصولات");
              }}
              className="m-[10px] mt-[0px] w-[90%] md:w-[60%] border-[#1e88e5] border-[1px] text-[120%] text-center p-[10px] rounded-xl box-shadow "
            >
              همه محصولات
            </Link>
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
            className="h-[5.4rem] absolute right-[3.6rem] z-1 bottom-0"
          />
        </div>
        {/* دسته بندی  */}
        <div className="categorys ">
          <h3 className="font-bold text-[140%] px-[15px]  ">
            دس&#x0640;&#x0640;ته بن&#x0640;&#x0640;دی
            م&#x0640;&#x0640;حص&#x0640;&#x0640;ولات
          </h3>
          <Link to="/Fotros/Products">
            <Categorys />
          </Link>
        </div>
        <div className="h-[1.3rem] md:h-[3rem]"></div>
        {/* تخفیفات */}
        <Link
              to="/Fotros/Products"
              onClick={() => {
                funcAxios(
                  "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?sortBy=off&order=desc"
                );
                setSortFilter("");
                setOnlyAvailable(false);
                applyFilter("", false, "فروش ویژه");
              }} className="m-[15px] p-[10px] mx-[20px] md:mx-[50px] bg-blue-200 h-[180px] md:h-[200px] rounded-2xl flex md:items-center">
          <img className="h-[100%] md:h-[155%]" src={offset} alt="" />
          <div className="w-full flex flex-col justify-center">
            <div className="flex justify-center md:justify-start relative  my-[7px] w-[100%]">
              <div>
                <p className="text-[140%] font-[600]">
                  ف&#x0640;روش وی&#x0640;&#x0640;ژه
                </p>
                <div className="h-[21px] md:h-[28px]"></div>
                <p className="md:text-[135%]">
                  ت&#x0640;خف&#x0640;یف وی&#x0640;ژه روزانه
                  <br className="md:hidden "/>
                   بر روی تمامی محصولات&nbsp;
                </p>
              </div>
              <p className=" absolute left-[14px] md:left-[unset] md:right-[120px] top-[25px] md:top-[-22px] w-20% self-center bg-[#f5f5f5] rotate-[343deg] p-[4px] px-[6px] rounded-sm text-red-700 h-[fit-content] flex ">
                <span className="text-[120%] md:text-[250%] font-semibold">70</span>
                <img className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]" src={priceimg} alt="" />
              </p>
            </div>
            <Link
              to="/Fotros/Products"
              onClick={() => {
                funcAxios(
                  "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?sortBy=off&order=desc"
                );
                setSortFilter("");
                setOnlyAvailable(false);
                applyFilter("", false, "فروش ویژه");
              }}
              className="pt-[8px] md:pt-[unset] w-full flex justify-end-safe md:text-[130%] md:px-[10px] items-center"
            >
              مشاهده محصولات
              <span className="w-[15px] ">
                <IoMdArrowRoundBack />
              </span>
            </Link>
          </div>
        </Link>
        <div className="h-[1.5rem] md:h-[3rem]"></div>

        {/* محصولات جدید */}
        <SlideProduct
          title=" م&#x0640;حص&#x0640;ولات ج&#x0640;دی&#x0640;د"
          title2="محصولات جدید"
          url="https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?sortBy=idsortby&order=desc"
          allurl="https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?sortBy=idsortby&order=desc"
        ></SlideProduct>
        {/* فاصله */}
        <div className="h-[4.5rem]  "></div>
        {/* ست ها */}
        <div className="  px-[3px]">
          <h2 className="font-bold text-[140%] px-[14px]  ">
            س&#x0640;&#x0640;ت ه&#x0640;&#x0640;ا
          </h2>

          <div className="px-[8px]  grid  grid-rows-3 grid-cols-1 md:grid-rows-2 md:grid-cols-2 md:px-[5px]  gap-[7px] md:gap-[10px]">
            <Link
              to="/Fotros/Products"
              onClick={() => {
                localStorage.removeItem("products");
                localStorage.removeItem("productsFetchTime");
                funcAxios(
                  "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?category=ست"
                );
                setSortFilter("");
                setOnlyAvailable(false);
                applyFilter("", false, "ست های ورزشی");
              }}
              className="mx-[8px] p-[10px] md:m-[unset] bg-blue-200 h-[150px] lg:h-[200px] rounded-2xl flex"
            >
              <div className="h-[100%]  w-[50%] flex justify-center items-center">
                <img className="h-[100%]" src={varzeshset} alt="" />
              </div>
              <div className="w-full flex flex-col justify-between">
                <div>
                  <p className="text-[137%] font-[600] mb-[10px]">
                    ست های ورزشی
                  </p>

                  <p>برای ساختن بدنی سالم و سرحال</p>
                </div>

                <button className="w-full flex justify-end-safe items-center md:px-[10px]">
                  مشاهده محصولات
                  <span className="w-[15px] ">
                    <IoMdArrowRoundBack />
                  </span>
                </button>
              </div>
            </Link>

            <Link
              to="/Fotros/Products"
              onClick={() => {
                localStorage.removeItem("products");
                localStorage.removeItem("productsFetchTime");
                funcAxios(
                  "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?category=ست"
                );
                setSortFilter("");
                setOnlyAvailable(false);
                applyFilter("", false, "ست های ورزشی");
              }}
              className="mx-[8px] p-[10px] md:m-[unset] bg-blue-200 h-[150px] lg:h-[200px] rounded-2xl flex"
            >
              <div className="h-[100%]  w-[50%] flex justify-center items-center">
                <img className="h-[100%]" src={tabeston} alt="" />
              </div>
              <div className="w-full flex flex-col justify-between">
                <div>
                  <p className="text-[137%] font-[600] mb-[10px]">
                    ست های تابستونه
                  </p>

                  <p>برای روزهای گرم سال</p>
                </div>

                <button className="w-full flex justify-end-safe items-center md:px-[10px]">
                  مشاهده محصولات
                  <span className="w-[15px] ">
                    <IoMdArrowRoundBack />
                  </span>
                </button>
              </div>
            </Link>

            <Link
              to="/Fotros/Products"
              onClick={() => {
                localStorage.removeItem("products");
                localStorage.removeItem("productsFetchTime");
                funcAxios(
                  "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?category=ست"
                );
                setSortFilter("");
                setOnlyAvailable(false);
                applyFilter("", false, "ست های کامل");
              }}
              className="mx-[8px] p-[10px] md:m-[unset] bg-blue-200 h-[150px] lg:h-[200px] rounded-2xl flex"
            >
              <div className="h-[100%]  w-[50%] flex justify-center items-center">
                <img className="h-[100%]" src={offset} alt="" />
              </div>
              <div className="w-full flex flex-col justify-between">
                <div>
                  <p className="text-[137%] font-[600] mb-[10px]">
                    ست های کامل
                  </p>

                  <p>برای زدن یه استایل خانمانه</p>
                </div>

                <button className="w-full flex justify-end-safe items-center md:px-[10px]">
                  مشاهده محصولات
                  <span className="w-[15px] ">
                    <IoMdArrowRoundBack />
                  </span>
                </button>
              </div>
            </Link>
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
