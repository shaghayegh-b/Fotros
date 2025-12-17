import { memo, useEffect, useRef, useState } from "react";
import axios from "axios";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import { Navigation, Scrollbar, Autoplay } from "swiper/modules";
import { useAxios } from "../../context/AxiosContaext/AxiosContaext";
import { Link, useLocation } from "react-router-dom";
import Loading from "../Loading/Loading";
import SkeletonCardSlide from "../SkeletonCard/SkeletonCardSlide";
function SlideProduct({ title, title2, url, allurl }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { funcAxios, setSortFilter, setOnlyAvailable, applyFilter } =
    useAxios();
  const swiperRef = useRef(null);

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
          className="hidden md:inline-block m-[20px] mb-[10px] bg-[var(--btn)] text-white text-center text-[120%] p-[10px] w-[60%] md:w-[250px] rounded-xl shadow-md hover:bg-[#1565c0] transition-all"
        >
          مشاهده {title2}
        </Link>
      </div>

      {/* اسلایدر */}
      {loading ? (
        <div className="p-[5px] pt-0">
          <Swiper
            dir="rtl"
            spaceBetween={18}
            breakpoints={{
              0: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <SwiperSlide key={i} className="flex justify-center">
                <SkeletonCardSlide />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="p-[5px] pt-0 NewProducts relative">
          {/* دکمه‌ها */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="swiper-button-next-custom hidden md:flex items-center justify-center absolute top-1/2 left-4 z-2
                   bg-white text-[var(--btn)] shadow-md hover:shadow-lg hover:bg-[var(--btn)] hover:text-white
                   p-3 rounded-full text-2xl transition-all"
          >
            <MdArrowBack />
          </button>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="swiper-button-prev-custom hidden md:flex items-center justify-center absolute top-1/2 right-4 z-2
                   bg-white text-[var(--btn)] shadow-md hover:shadow-lg hover:bg-[var(--btn)] hover:text-white
                   p-3 rounded-full text-2xl transition-all"
          >
            <MdArrowForward />
          </button>

          {/* Swiper اصلی */}
          {products.length > 0 && (
            <Swiper
              dir="rtl"
              spaceBetween={18}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={800}
              loop
              scrollbar={{ hide: true }}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              breakpoints={{
                0: {
                  slidesPerView: 2, // موبایل
                },
                640: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 5,
                },
                1280: {
                  slidesPerView: 6,
                },
                1536: {
                  slidesPerView: 7,
                },
              }}
              modules={[Scrollbar, Autoplay, Navigation]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {products.slice(0, 12).map((product) => (
                <SwiperSlide key={product.id} className="flex justify-center">
                  <Link
                    to={`/Fotros/Products/${product.idsortby}`}
                    className="flex flex-col gap-[15px] items-start bg-[var(--product)]
               p-4 rounded-2xl shadow-[var(--card-shadow)]
             hover:shadow-[var(--card-hover-shadow)]
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
                    <p className="pt-2 w-full text-center font-medium text-[var(--text)] truncate text-[95%]">
                      {product.title}
                    </p>

                    {/* قیمت */}
                    <p className="pt-1 w-full text-center text-[var(--text)] text-[90%]">
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
      {location.pathname !== "/Fotros/" && (
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
            className="mx-[5px] my-[10px] sm:m-[20px] text-center bg-[var(--btn)] text-white text-[120%] p-[10px] w-[60%] rounded-xl shadow-md hover:bg-[#1565c0] transition-all"
          >
            مشاهده {title2}
          </Link>
        </div>
      )}
    </div>
  );
}

export default memo(SlideProduct);
