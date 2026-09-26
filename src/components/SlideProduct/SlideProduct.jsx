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
import ProductCard from "../ProductCard/ProductCard";

const SLIDE_CACHE_DURATION = 5 * 60 * 1000; // ۵ دقیقه، هم‌راستا با کش اصلی محصولات

function SlideProduct({ title, title2, url, allurl }) {
  const location = useLocation();
  const cacheKey = `slideProducts:${url}`;
  const cached = (() => {
    try {
      return JSON.parse(sessionStorage.getItem(cacheKey)) || null;
    } catch {
      return null;
    }
  })();
  const isCacheFresh =
    cached && Date.now() - cached.time < SLIDE_CACHE_DURATION;

  const [loading, setLoading] = useState(!isCacheFresh);
  const [products, setProducts] = useState(isCacheFresh ? cached.data : []);
  const { funcAxios, setSortFilter, setOnlyAvailable, applyFilter } =
    useAxios();
  const swiperRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    // اگه همین url اخیراً گرفته شده، دوباره فچ نمی‌کنیم که هر بار برگشتن به
    // این بخش (مثلاً برگشتن به صفحه اصلی) اسکلتون/لودینگ نشون نده
    const freshCache = (() => {
      try {
        const c = JSON.parse(sessionStorage.getItem(cacheKey));
        return c && Date.now() - c.time < SLIDE_CACHE_DURATION ? c : null;
      } catch {
        return null;
      }
    })();

    if (freshCache) {
      setProducts(freshCache.data);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(url);
        if (cancelled) return;
        setProducts(res.data);
        sessionStorage.setItem(
          cacheKey,
          JSON.stringify({ data: res.data, time: Date.now() })
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [url]);

  if (!products) {
    return <div className="text-center text-red-500">محصولی یافت نشد</div>;
  }

  // با تعداد محصول کم، loop باعث می‌شد سر هر هاور/اتوپلی کل اسلایدر بپره؛
  // فقط وقتی محصولات به اندازه کافی زیاد باشن (بیشتر از بیشترین
  // slidesPerView که ۷ تاست) حالت loop/autoplay رو فعال می‌کنیم.
  const visibleCount = Math.min(products.length, 12);
  const enableLoop = visibleCount > 7;

  return (
    <div>
      {/* هدر بخش */}
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-[140%] px-[14px]">{title}</h3>
        <Link
          to="/Fotros/Products"
          onClick={() => {
            funcAxios(allurl);
            setSortFilter("");
            setOnlyAvailable(false);
            applyFilter("", false, title);
          }}
          className="hidden md:inline-block mb-[10px] bg-[var(--btn)] text-white text-center text-[120%] p-[10px] w-[60%] md:w-[250px] rounded-xl shadow-md hover:bg-[#1565c0] transition-all"
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
            {Array.from({ length: 7 }).map((_, i) => (
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
              autoplay={
                enableLoop
                  ? {
                      delay: 3500,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : false
              }
              speed={800}
              loop={enableLoop}
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
                <SwiperSlide
                  key={product.id}
                  className="flex justify-center h-auto"
                >
                  <div className="w-full max-w-[250px] mx-auto">
                    <ProductCard product={product} />
                  </div>
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
