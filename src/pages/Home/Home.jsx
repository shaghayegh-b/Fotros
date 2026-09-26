import { Link } from "react-router-dom";

import imgCaucasian from "../../assets/img/Caucasian.png";
import imgkot from "../../assets/img/kot.png";
import imgtap from "../../assets/img/tap.png";
import shirtimg from "../../assets/img/shirt.png";
import imgdaman from "../../assets/img/daman.png";
import offset from "../../assets/img/off.png";
import varzeshset from "../../assets/img/set.png";
import tabeston from "../../assets/img/tabeston.png";
import ersal from "../../assets/img/support.webp";
import back from "../../assets/img/back.webp";
import offImage3 from "../../assets/img/offImage3.png";

import Categorys from "../../components/Categorys/Categorys";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { useAxios } from "../../context/AxiosContaext/AxiosContaext";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import "./Home.css";
import SlideProduct from "../../components/SlideProduct/SlideProduct";
import CategoryPromoCard from "../../components/CategoryPromoCard/CategoryPromoCard";
import DiscountBanner from "../../components/DiscountBanner/DiscountBanner";
import TrustBadges from "../../components/TrustBadges/TrustBadges";
import PromoBanner from "../../components/PromoBanner/PromoBanner";

import { useState, useEffect } from "react";
import HomeSkeleton from "../../components/SkeletonCard/HomeSkeleton";

function Home() {
  const { funcAxios, applyFilter, setSortFilter, setOnlyAvailable } =
    useAxios();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const images = [
      ersal,
      back,
      imgCaucasian,
      imgkot,
      imgtap,
      shirtimg,
      imgdaman,
      offset,
      varzeshset,
      tabeston,
    ];

    let loadedCount = 0;
    images.forEach((imgSrc) => {
      const img = new Image();
      img.src = imgSrc;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) setLoading(false);
      };
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-10 lg:h-16"></div>
      {loading ? (
        <HomeSkeleton />
      ) : (
        <div className="main1">
          {/* hero */}
          <div className="page-section relative flex flex-col-reverse overflow-hidden px-[16px] lg:px-[75px] md:flex-row-reverse lg:min-h-[560px] lg:max-h-[650px]">
            <div className="deco-blob h-[260px] w-[260px] bg-[var(--btn)]/30 -left-16 top-10" />
            <div className="deco-blob h-[200px] w-[200px] bg-[var(--textsm)]/20 right-10 -bottom-16" />
            {/* بخش 1 */}
            <div className="section1 relative z-1 px-[3px] md:flex-2 flex justify-between  gap-3  my-[18px] lg:my-[14px]  font-bold text-[125%]">
              <div className="right flex-1 flex flex-col  gap-[24px]">
                <div className="hidden lg:inline-block lg:h-[3%]"></div>
                {/* رضایت */}
                <div className="flex flex-col rounded-2xl h-[fit-content] bg-[var(--cartsm)]">
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
                        className="absolute bottom-[-14px] left-[-4px] md:bottom-[-21px] w-[89%] "
                      />
                    </div>
                  </div>
                </div>

                {/* محصول1 */}
                <Link
                  to="/Fotros/Products/12"
                  className="SatisfiedCustomer bg-[var(--cart)]  h-[80%] lg:h-[50%] rounded-2xl p-[15px] flex justify-center items-center"
                >
                  <img src={imgkot} alt="محصول1" className="h-full" />
                </Link>
              </div>

              <div className="left flex-1 flex flex-col gap-2">
                {/* محصول 2 */}
                <Link
                  to="/Fotros/Products/27"
                  className="  bg-[var(--cart)] rounded-2xl p-[9px] h-[80%] lg:h-[50%] flex items-center"
                >
                  <img src={imgtap} alt="محصول2" className="" />
                </Link>
                {/* تنوع محصول */}
                <div className="rounded-sm rounded-tr-[8rem] h-[130px]  p-[14px]  bg-[var(--cartsm)] text-[var(--text)] flex flex-col justify-center">
                  <span className="px-[13px] self-end ">+500</span>
                  <span className="self-center ">محصول متنوع</span>
                </div>
              </div>
            </div>
            {/* فاصله */}
            <div className="h-[0.4rem] md:h-[6rem] relative md:hidden">
              <img
                src={imgdaman}
                alt=""
                className="h-[5rem] absolute right-[1rem] bottom-[-45px] z-1"
              />
            </div>
            {/* بخش2 */}
            <div className="section2 relative z-1 md:flex-2 mx-[9px] flex flex-col justify-center items-center gap-4 py-[10px] md:py-[20px]">
              {/* فاصله */}
              <div className="h-[1rem] md:h-[2rem] relative">
                <img
                  src={imgdaman}
                  alt=""
                  className="h-[4rem] absolute left-[1rem] bottom-0"
                />
              </div>
              <h1 className="font-bold text-[190%] md:text-[210%] leading-[1.5] text-center">
                ب&#x0640;&#x0640;ا&zwnj;&zwnj; &zwnj;&zwnj;&zwnj;&zwnj;
                <span className="bg-gradient-to-l from-[var(--btn)] to-[var(--textsm)] bg-clip-text text-transparent font-extrabold">
                  ف&#x0640;&#x0640;&#x0640;&#x0640;&#x0640;ط&#x0640;&#x0640;&#x0640;&#x0640;روس
                  <br />
                </span>
                م&#x0640;&#x0640;ت&#x0640;&#x0640;ف&#x0640;&#x0640;اوت
                ظ&#x0640;&#x0640;اه&#x0640;&#x0640;ر ش&#x0640;و
              </h1>
              <div className="flex w-full flex-col items-center gap-3 md:w-[75%]">
                <Link
                  to="/Fotros/Products"
                  onClick={() => {
                    funcAxios(
                      "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?sortBy=idsortby&order=desc",
                    );
                    setSortFilter("");
                    setOnlyAvailable(false);
                    applyFilter("", false, "محصولات جدید");
                  }}
                  className="w-full bg-[var(--btn)] text-white text-[120%] text-center p-[12px] rounded-2xl shadow-[var(--card-shadow)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--card-hover-shadow)]"
                >
                  محصولات جدید
                </Link>
                <Link
                  type="button"
                  to="/Fotros/Products"
                  onClick={() => {
                    funcAxios(
                      "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products",
                    );
                    setSortFilter("");
                    setOnlyAvailable(false);
                    applyFilter("", false, "همه محصولات");
                  }}
                  className="hidden md:block w-full border-[var(--btn)] border-[1.5px] text-[120%] text-center p-[12px] rounded-2xl transition-all duration-300 hover:bg-[var(--btn)] hover:text-white"
                >
                  همه محصولات
                </Link>
              </div>
            </div>
            {/* فاصله */}
            <div className="h-[0] lg:h-[5rem] relative z-1">
              <img
                src={shirtimg}
                alt=""
                className="h-[4.4rem] absolute left-[0.4rem] z-1 bottom-[-70px] md:bottom-0"
              />
            </div>
          </div>
          {/* ارسال سریع / ضمانت اصالت / پشتیبانی */}
          <div className="page-section container-page">
            <TrustBadges />
          </div>
          {/* دسته بندی  */}
          <div className="page-section container-page">
            <h3 className="font-bold text-2xl px-[1px] mb-3">
              دسته بندی محصولات
            </h3>
            <Link to="/Fotros/Products">
              <Categorys />
            </Link>
          </div>
          {/* محصولات جدید */}
          <div className="page-section container-page">
            <SlideProduct
              title="محصولات جدید"
              title2="محصولات جدید"
              url={API_ENDPOINTS.NEW_PRODUCTS}
              allurl={API_ENDPOINTS.NEW_PRODUCTS}
            />
          </div>
          {/* بنر تخفیف */}
          <div className=" mt-[75px] mb-[57px] container-page">
            <DiscountBanner img={offset} percent={70} />
          </div>
          {/* پیشنهادات ویژه - محصولات دارای تخفیف به همراه درصد */}
          <div className="page-section container-page">
            <SlideProduct
              title="پیشنهادات ویژه"
              title2="پیشنهادات ویژه"
              url={API_ENDPOINTS.SORT_BY_OFF}
              allurl={API_ENDPOINTS.SORT_BY_OFF}
            />
          </div>
          {/* بنر جدید */}
          <div className="page-section container-page">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <PromoBanner
                img={ersal}
                title="ارسال رایگان"
                description="برای خریدهای بالای یک میلیون تومان، هزینه ارسال رایگانه"
                ctaText="شروع خرید"
                url={API_ENDPOINTS.NEW_PRODUCTS}
                filterName="محصولات جدید"
                variant="soft"
              />
              <PromoBanner
                img={back}
                title="باشگاه مشتریان فطروس"
                description="عضو شو و از تخفیف‌های اختصاصی زودتر از بقیه باخبر شو"
                ctaText="مشاهده محصولات"
                url={API_ENDPOINTS.ALL_PRODUCTS}
                filterName="همه محصولات"
                variant="dark"
              />
            </div>
          </div>
          {/* پرفروش‌ترین‌ها
             نکته: بک‌اند فعلی فیلد «تعداد فروش» نداره، پس فعلاً جدیدترین‌ها رو
             به‌عنوان جایگزین موقت نشون می‌دیم. وقتی فیلد sales/salesCount به
             mockAPI اضافه شد، کافیه url رو به endpoint واقعی best-seller تغییر بدی. */}
          <div className="page-section container-page">
            <SlideProduct
              title="پرفروش‌ترین‌ها"
              title2="پرفروش‌ترین‌ها"
              url={API_ENDPOINTS.BEST_SELLERS}
              allurl={API_ENDPOINTS.BEST_SELLERS}
            />
          </div>
          {/* ست ها */}
          <div className="page-section container-page">
            <h2 className="font-bold text-2xl px-[1px] mb-3">ست‌ها</h2>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <CategoryPromoCard
                img={varzeshset}
                title="ست های ورزشی"
                description="برای ساختن بدنی سالم و سرحال"
                url={API_ENDPOINTS.SPORT_SETS}
                filterName="ست های ورزشی"
              />
              <CategoryPromoCard
                img={tabeston}
                title="ست های تابستونه"
                description="برای روزهای گرم سال"
                url={API_ENDPOINTS.SPORT_SETS}
                filterName="ست های تابستونه"
              />
              <CategoryPromoCard
                img={offset}
                title="ست های کامل"
                description="برای زدن یه استایل خانمانه"
                url={API_ENDPOINTS.SPORT_SETS}
                filterName="ست های کامل"
              />
              <CategoryPromoCard
                img={offImage3}
                title="پیراهن های دخترانه"
                description="پیراهن های دخترانه زیبا"
                url={API_ENDPOINTS.CATEGORY("پیراهن")}
                filterName="پیراهن های دخترانه"
              />
            </div>
          </div>
          {/* footer */}
          <Footer />
        </div>
      )}
    </>
  );
}
export default Home;
