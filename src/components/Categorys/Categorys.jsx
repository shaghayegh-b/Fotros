import { useLocation } from "react-router-dom";
import { memo, useState, useEffect, useRef } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// import required modules
import { Navigation, Scrollbar } from "swiper/modules";
import { PRODUCT_CATEGORIES } from "../../constants/categories";
import { useAxios } from "../../context/AxiosContaext/AxiosContaext";
import "./Categorys.css";

import { MdArrowBack, MdArrowForward } from "react-icons/md";

function Categorys() {
  const { funcAxios, applyFilter, setSortFilter, setOnlyAvailable } =
    useAxios();
  const location = useLocation();
  const [hideIcons, setHideIcons] = useState(false);
  const swiperRef = useRef(null);
  useEffect(() => {
    const checkHideIcons = () => {
      const isMobile = window.innerWidth < 768;
      const isProductsPage = location.pathname === "/Fotros/Products";
      setHideIcons(isMobile && isProductsPage);
    };

    checkHideIcons();
    window.addEventListener("resize", checkHideIcons);
    return () => window.removeEventListener("resize", checkHideIcons);
  }, [location.pathname]);
  const handleCategoryClick = (url, filterName) => {
    funcAxios(url);
    setSortFilter("");
    setOnlyAvailable(false);
    applyFilter("", false, filterName);
  };

  return (
    <>
      <div className="categorys m-[7px] relative">
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="swiper-button-next-custom shadow-md hover:shadow-lg hidden md:flex items-center justify-center
        absolute top-[40%] left-4 z-2
        hover:bg-gray-300 hover:text-gray-600 border-[1px] border-gray-600
           text-[#f5f5f5] bg-gray-600
            p-[5px] rounded-full text-[130%]
            transition-all duration-300 ease-out
      hover:scale-105 "
        >
          <MdArrowBack />
        </button>
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="swiper-button-next-custom shadow-md hover:shadow-lg hidden md:flex items-center justify-center
          absolute top-[40%] right-4 z-2
    hover:bg-gray-300 hover:text-gray-600 border-[1px] border-gray-600
           text-[#f5f5f5] bg-gray-600
            p-[5px] rounded-full text-[130%]
            transition-all duration-300 ease-out
       hover:scale-105 "
        >
          <MdArrowForward />
        </button>
        <Swiper
          dir="rtl"
          slidesPerView={4}
          spaceBetween={15}
          breakpoints={{
            768: { slidesPerView: 5 },
            1000: { slidesPerView: 7 },
            1200: { slidesPerView: 8 },
            1600: { slidesPerView: 10 },
            1800: { slidesPerView: 11 },
            2500: { slidesPerView: 20 },
          }}
          modules={[Scrollbar]}
          scrollbar={{
            hide: true,
          }}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          modules={[Scrollbar, Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {PRODUCT_CATEGORIES.map(
            ({ id, name, icon: Icon, url, filterName }) => (
              <SwiperSlide key={id}>
                <button
                  type="button"
                  onClick={() => handleCategoryClick(url, filterName)}
                  className={`Category flex flex-col items-center justify-center py-[3px] px-[6px]
                    w-[85px] h-[84px] md:w-[128px] md:h-[128px] lg:w-[140px] lg:h-[120px] bg-[#d8dce4] rounded-[1rem]
                     transition-all duration-300 ease-out
      hover:bg-gray-200 hover:scale-105 hover:shadow-lg
      overflow-hidden text-ellipsis text-center
                        ${hideIcons ? "w-[90px] h-[fit-content]" : ""}`}
                >
                  {!hideIcons && Icon &&  (
                      <Icon className="flex justify-center items-center text-gray-800 group-hover:text-gray-600 transition-all duration-300"/>
                  )}
                    <p className=" font-semibold text-gray-800 break-words leading-tight text-center">
                    {name}
                  </p>
                </button>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </>
  );
}
export default memo(Categorys);
