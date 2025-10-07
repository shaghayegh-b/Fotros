// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// import required modules
import { Scrollbar } from "swiper/modules";

import { GiLargeDress, GiLipstick, GiPoloShirt, GiSkirt } from "react-icons/gi";
import { PiDressFill } from "react-icons/pi";
import { PiHandbagSimpleBold } from "react-icons/pi";
import { TbHomeHeart ,TbHeartDiscount} from "react-icons/tb";
import { FaSnowflake, FaGlasses, FaPersonHalfDress } from "react-icons/fa6";
import { AiOutlineProduct } from "react-icons/ai";
import { useAxios } from "../../context/AxiosContaext/AxiosContaext";
import { memo } from "react";

function Categorys() {
const { funcAxios, applyFilter, setSortFilter, setOnlyAvailable } = useAxios();

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
            1600:{ slidesPerView: 10},
            1800:{ slidesPerView: 11},
            2500:{ slidesPerView: 20},

          }}
          modules={[Scrollbar]}
        >
          <SwiperSlide>
            <button
              type="button"
              onClick={() => {
                funcAxios(
                  "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?sortBy=idsortby&order=desc"
                );
                setSortFilter("");
    setOnlyAvailable(false);
    applyFilter("", false, "همه محصولات");
              }}
              className={`Category`}
            >
              <AiOutlineProduct /> <p>همه محصولات</p>
            </button>
          </SwiperSlide>
          <SwiperSlide>
            <button
              type="button"
              onClick={() => {
                funcAxios(
                  "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?category=مانتو"
                );
                setSortFilter("");
      setOnlyAvailable(false);
      applyFilter("", false, "مانتو");
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
               setSortFilter("");
      setOnlyAvailable(false);
      applyFilter("", false, "شلوار و دامن");
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
                setSortFilter("");
      setOnlyAvailable(false);
      applyFilter("", false, "ست");
              }}
              className={`Category`}
            >
              <PiDressFill />
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
                setSortFilter("");
      setOnlyAvailable(false);
      applyFilter("", false, "تو خونه ای");
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
               setSortFilter("");
      setOnlyAvailable(false);
      applyFilter("", false, "تو خونه ای");
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
               setSortFilter("");
      setOnlyAvailable(false);
      applyFilter("", false, "لباس گرم");
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
                setSortFilter("");
      setOnlyAvailable(false);
      applyFilter("", false, "لباس گرم");
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
               setSortFilter("");
      setOnlyAvailable(false);
      applyFilter("", false, "اکسسوری");
              }}
              className={`Category`}
            >
              <FaGlasses />
              <p>اکسسوری</p>
            </button>
          </SwiperSlide>
          <SwiperSlide>
            <button
              type="button"
              onClick={() => {
                funcAxios(
                  "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?category=مجلسی"
                );
                setSortFilter("");
      setOnlyAvailable(false);
      applyFilter("", false, "مجلسی");
              }}
              className={`Category`}
            >
              <GiLargeDress /> <p>لباس م&#x0640;ج&#x0640;لس&#x0640;ی</p>
            </button>
          </SwiperSlide>
          <SwiperSlide>
            <button
              type="button"
              onClick={() => {
                funcAxios(
                  "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?sortBy=off&order=desc"
                );
                setSortFilter("");
      setOnlyAvailable(false);
      applyFilter("", false, "فروش ویژه");
              }}
              className={`Category`}
            >
              <TbHeartDiscount /> <p> ف&#x0640;روش وی&#x0640;&#x0640;ژه</p>
            </button>
          </SwiperSlide>
          <SwiperSlide>
            <button
              type="button"
              onClick={() => {
                funcAxios(
                  "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?category=اسپورت"
                );
                setSortFilter("");
      setOnlyAvailable(false);
      applyFilter("", false, "اسپورت");
              }}
              className={`Category`}
            >
              <FaPersonHalfDress /> <p>اسپورت</p>
            </button>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
export default memo(Categorys);
