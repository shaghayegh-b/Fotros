import { memo, useEffect, useRef, useState } from "react";
import axios from "axios";

import { MdArrowBack, MdArrowForward } from "react-icons/md";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// import required modules
import { Navigation, Scrollbar, Autoplay } from "swiper/modules";
import { useAxios } from "../../context/AxiosContaext/AxiosContaext";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

function SlideProduct({title,url,allurl}) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { funcAxios,setSortFilter,setOnlyAvailable, applyFilter } = useAxios();

  useEffect(() => {
    // دریافت محصولات از API
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(url);
        setProducts(res.data); // فرض می‌کنیم API یک آرایه از محصولات برمی‌گردونه
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
  }, []);
  const swiperRef = useRef(null);

  if (!products) {
    return (
      <div className="text-center text-red-500">
        محصولی با این شناسه یافت نشد
      </div>
    );
  }
  return (
    <>
      <div>
        <div className=" flex justify-between items-center">
          <h3 className="font-bold text-[140%] px-[14px]  ">
           {title}
          </h3>
          <Link
            to="/Fotros/Products"
            onClick={() => {
              funcAxios(allurl);
               setSortFilter("");
      setOnlyAvailable(false);
      applyFilter("", false, title);
            }}
            className="hidden md:inline-block m-[20px] mb-[10px] bg-[#1e88e5] text-white text-center text-[120%] p-[10px] w-[60%] md:w-[250px] rounded-xl box-shadow "
          >
            مشاهده همه محصولات
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center">
            <p className="text-[70%]">درحال دریافت {title}</p>
            <Loading />
          </div>
        ) : (
          <div className="p-[5px] pt-0 NewProducts relative">
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="swiper-button-next-custom hidden md:flex items-center justify-center absolute top-1/2 left-4 z-2
                   bg-white text-[#1e88e5] shadow-md hover:shadow-lg hover:bg-[#1e88e5] hover:text-white
                   p-3 rounded-full text-2xl"
            >
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
            {products.length > 0 && (
            <Swiper
              dir="rtl"
              slidesPerView={2}
              spaceBetween={9}
              breakpoints={{
                400: { slidesPerView: 2 },
                500: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                950: { slidesPerView: 5 },
                1250: { slidesPerView: 6 },
                1600: { slidesPerView: 9 },
                1800: { slidesPerView: 10 },
                2500: { slidesPerView: 18 },
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
              {products.slice(0, 10).map((product) => (
                <SwiperSlide key={product.id}>
                  <Link
                    to={`/Fotros/Products/${product.idsortby}`}
                    className=" flex flex-col justify-between   p-[7px] h-[260px]  md:w-[170px] lg:w-[200px] rounded-xl box-shadow"
                  >
                    <div className="w-full h-[151px] self-center flex justify-center items-center">
                      <img
                        src={product.img}
                        alt={product.title}
                        className="h-full self-center"
                      />
                    </div>
                    <p className="self-start pt-[15px]">{product.title}</p>
                    <p className="self-end pt-[25px]">{product.price}</p>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>)}
          </div>
        )}
        <div className="  flex items-center justify-center md:hidden">
          <button className=" m-[20px] mb-[10px] bg-[#1e88e5] text-white text-[120%] p-[10px] w-[60%] rounded-xl box-shadow ">
            مشاهده همه محصولات
          </button>
        </div>
      </div>
    </>
  );
}
export default memo(SlideProduct);
