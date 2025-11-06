import { memo, useEffect, useRef, useState } from "react";
import axios from "axios";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import { Navigation, Scrollbar, Autoplay } from "swiper/modules";
import { useAxios } from "../../context/AxiosContaext/AxiosContaext";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

function SlideProduct({ title, title2, url, allurl }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(4); // 👈 مقدار پیش‌فرض
  const { funcAxios, setSortFilter, setOnlyAvailable, applyFilter } =
    useAxios();
  const swiperRef = useRef(null);

  // 📏 تابع محاسبه تعداد اسلایدها بر اساس عرض واقعی صفحه
  const updateSlidesPerView = () => {
    const width = window.innerWidth;
    let slides = 2;
    if (width < 480) slides = 2;
    else if (width < 768) slides = 3;
    else if (width < 1024) slides = 5;
    else if (width < 1440) slides = 7;
    else slides = Math.floor(width / 200); // 👈 داینامیک بر اساس عرض کارت‌ها
    setSlidesPerView(slides);
  };

  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(url);
        setProducts(res.data);
        const newData = res.data;
        const oldData = JSON.parse(localStorage.getItem("productid")) || [];
        if (JSON.stringify(newData) !== JSON.stringify(oldData)) {
          localStorage.setItem("productid", JSON.stringify(newData));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [url]);

  if (!products) {
    return <div className="text-center text-red-500">محصولی یافت نشد</div>;
  }

  return (
    <div>
      {/* هدر بخش */}
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-[140%] px-[14px]">{title}</h3>
        <Link
          to="/Fotros/Products"
          onClick={() => {
            localStorage.removeItem("products");
            localStorage.removeItem("productsFetchTime");
            funcAxios(allurl);
            setSortFilter("");
            setOnlyAvailable(false);
            applyFilter("", false, title);
          }}
          className="hidden md:inline-block m-[20px] mb-[10px] bg-[#1e88e5] text-white text-center text-[120%] p-[10px] w-[60%] md:w-[250px] rounded-xl shadow-md hover:bg-[#1565c0] transition-all"
        >
          مشاهده {title2}
        </Link>
      </div>

      {/* اسلایدر */}
      {loading ? (
        <div className="flex flex-col justify-center items-center">
          <Loading />
          <p className="text-[70%]">درحال دریافت {title2}</p>
        </div>
      ) : (
        <div className="p-[5px] pt-0 NewProducts relative">
          {/* دکمه‌ها */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="swiper-button-next-custom hidden md:flex items-center justify-center absolute top-1/2 left-4 z-2
                   bg-white text-[#1e88e5] shadow-md hover:shadow-lg hover:bg-[#1e88e5] hover:text-white
                   p-3 rounded-full text-2xl transition-all"
          >
            <MdArrowBack />
          </button>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="swiper-button-prev-custom hidden md:flex items-center justify-center absolute top-1/2 right-4 z-2
                   bg-white text-[#1e88e5] shadow-md hover:shadow-lg hover:bg-[#1e88e5] hover:text-white
                   p-3 rounded-full text-2xl transition-all"
          >
            <MdArrowForward />
          </button>

          {/* Swiper اصلی */}
          {products.length > 0 && (
            <Swiper
              dir="rtl"
              slidesPerView={slidesPerView - 1}
              spaceBetween={18}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={800}
              scrollbar={{ hide: true }}
              loop
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              modules={[Scrollbar, Autoplay, Navigation]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {products.slice(0, 12).map((product) => (
                <SwiperSlide key={product.id} className="flex justify-center">
                  <Link
                    to={`/Fotros/Products/${product.idsortby}`}
                    className="flex flex-col gap-[15px] items-start bg-white
               p-4 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)]
               hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]
               hover:scale-[1.04] transition-all duration-300
               border border-gray-100 w-full max-w-[250px] mx-auto
               aspect-[3/4] sm:aspect-[4/5] md:aspect-[5/6] lg:aspect-[6/7]"
                  >
                    {/* تصویر محصول */}
                    <div className="w-full h-[70%] flex justify-center items-center overflow-hidden rounded-xl">
                      <img
                        src={product.img}
                        alt={product.title}
                        className="w-[95%] h-[95%] object-contain transition-transform duration-500 hover:scale-110"
                      />
                    </div>

                    {/* عنوان */}
                    <p className="pt-2 w-full text-center font-medium text-gray-900 truncate text-[95%]">
                      {product.title}
                    </p>

                    {/* قیمت */}
                    <p className="pt-1 w-full text-center text-gray-800 text-[90%]">
                      {product.price} تـومـان
                    </p>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      )}

      {/* دکمه موبایل */}
      <div className="flex items-center justify-center md:hidden">
        <Link
          to="/Fotros/Products"
          onClick={() => {
            localStorage.removeItem("products");
            localStorage.removeItem("productsFetchTime");
            funcAxios(allurl);
            setSortFilter("");
            setOnlyAvailable(false);
            applyFilter("", false, title);
          }}
          className="m-[20px] text-center bg-[#1e88e5] text-white text-[120%] p-[10px] w-[60%] rounded-xl shadow-md hover:bg-[#1565c0] transition-all"
        >
          مشاهده {title2}
        </Link>
      </div>
    </div>
  );
}

export default memo(SlideProduct);
