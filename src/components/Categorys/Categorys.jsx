import { useLocation } from "react-router-dom";
import { memo, useState, useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// import required modules
import { Scrollbar } from "swiper/modules";

import { PRODUCT_CATEGORIES } from "../../constants/categories";
import { useAxios } from "../../context/AxiosContaext/AxiosContaext";

function Categorys() {
  const { funcAxios, applyFilter, setSortFilter, setOnlyAvailable } =
    useAxios();
  const location = useLocation();
  const [hideIcons, setHideIcons] = useState(false);

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
      <div className="categorys ">
        <Swiper
          slidesPerView={4}
          spaceBetween={15}
          scrollbar={{
            hide: true,
          }}
          breakpoints={{
            768: { slidesPerView: 5 },
            1000: { slidesPerView: 7 },
            1200: { slidesPerView: 8 },
            1600: { slidesPerView: 10 },
            1800: { slidesPerView: 11 },
            2500: { slidesPerView: 20 },
          }}
          modules={[Scrollbar]}
        >
          {PRODUCT_CATEGORIES.map(
            ({ id, name, icon: Icon, url, filterName }) => (
              <SwiperSlide key={id}>
                <button
                  type="button"
                  onClick={() => handleCategoryClick(url, filterName)}
                  className={`Category flex flex-col items-center justify-center py-[3px] px-[6px] w-[85px] h-[84px] md:w-[128px] md:h-[128px] lg:w-[140px] lg:h-[120px] bg-[#d8dce4] rounded-[1rem]
                        ${hideIcons ? "w-[90px] h-[fit-content]" : ""}`}
                >
                  {!hideIcons && Icon && <Icon />}
                  <p className="whitespace-nowrap">{name}</p>
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
