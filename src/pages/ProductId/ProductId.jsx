import { memo, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import ModalAlert from "../../components/ModalAlert/ModalAlert";

import { useCart } from "../../context/CartContext/CartContext";
import { useFav } from "../../context/FavProvider/FavProvider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiPlus, FiMinus } from "react-icons/fi";

import axios from "axios";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";

import "./ProductId.css";
import SlideProduct from "../../components/SlideProduct/SlideProduct";
import { useAuth } from "../../context/AuthContext/AuthContext";
const CACHE_DURATION = 5 * 60 * 1000; // مدت زمان کش: 5 دقیقه

function ProductId() {
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState([]);

  // حالت نمایش توضیحات محصول (باز یا بسته)
  const [desc, setDesc] = useState(true);
  const [comment, setComment] = useState(false);
  // comments
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [commentText, setCommentText] = useState([]);
  const [recommend, setRecommend] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToFav, removeFromFav, favoriteItems } = useFav();
  const { addToCart, increase, decrease, cartItems } = useCart();
  const { isLoggedIn } = useAuth();

  const { idsortby } = useParams();
  // alert
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalButtons, setModalButtons] = useState([]);

  const navigate = useNavigate();

  // وقتی کامپوننت لود شد، داده‌ها رو از API بگیر
  useEffect(() => {
    const cachedData = localStorage.getItem(`product_${idsortby}`);
    const lastFetch =
      parseInt(localStorage.getItem(`product_${idsortby}_time`)) || 0;
    const now = Date.now();

    if (cachedData && now - lastFetch < CACHE_DURATION) {
      // استفاده از کش
      setProduct(JSON.parse(cachedData));
    } else {
      // کش منقضی شده → پاکش کن
      localStorage.removeItem(`product_${idsortby}`);
      localStorage.removeItem(`product_${idsortby}_time`);

      // بعدش از API بگیر
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const res = await axios.get(
            `https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products/${idsortby}`
          );
          setProduct(res.data);

          // ذخیره در کش
          localStorage.setItem(`product_${idsortby}`, JSON.stringify(res.data));
          localStorage.setItem(
            `product_${idsortby}_time`,
            Date.now().toString()
          );
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [idsortby]);

  useEffect(() => {
    if (product && product.colors?.length > 0) {
      setSelectedColorIndex(0); // رنگ اول رو ست کن
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(0); // اسلایدر رو هم ببر روی عکس اول
      }
    }
  }, [product]);

  const sliderRef = useRef(null);

  // رنگ‌ها و تصاویر مربوطه (مثلا اینجا باید از محصول بگیری)
  // فرض کردم هر رنگ یه عکس مربوط داره
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const colors = product.colors || [
    { name: "تک رنگ", code: "#ccc", img: product.img },
  ];
  const colorToSend =
    colors && colors.length > 0 ? colors[selectedColorIndex] : null;

  const handleColorChange = (index) => {
    setSelectedColorIndex(index);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  const selectedColor = product.colors?.[selectedColorIndex];
  // پیدا کردن آیتم در سبد خرید با در نظر گرفتن رنگ و سایز
  const itemInCart = cartItems.find(
    (item) =>
      item.idsortby === product.idsortby &&
      item.selectedColor?.code === selectedColor?.code &&
      item.selectedSize === selectedSize // این خط اضافه شد
  );

  const quantity = itemInCart ? itemInCart.quantity : 0;

  const isOutOfStock = product.remaining === "اتمام موجودی";

  // تنظیمات اسلایدر
  const settings = {
    infinite: true,
    slidesToShow: Math.min(colors.length, 3),
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: false,
    autoplay: false,
    rtl: true,
    focusOnSelect: true,
  };
  // comment
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/comments",
        { params: { productId: product.idsortby } } // فیلتر بر اساس محصول
      );
      setComments(res.data);
      setCommentsCount(res.data.length); // تعداد کامنت‌ها
    } catch (error) {
      console.error("خطا در گرفتن کامنت‌ها:", error);
    }
  };

  useEffect(() => {
    if (product.idsortby) {
      fetchComments();
    }
  }, [product.idsortby]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setModalMessage("برای ثبت نظر باید وارد حساب کاربری خود شوید!");
      setModalButtons([
        {
          label: "ورود به حساب کاربری",
          type: "yes",
          onClick: () => {
            setIsModalOpen(false);
            navigate("/Fotros/login");
          },
        },
        {
          label: "بیخیال",
          type: "no",
          onClick: () => {
            setIsModalOpen(false);
          },
        },
      ]);
      setIsModalOpen(true);
    }

    if (recommend === null) {
      setModalMessage(
        "لطفا انتخاب کنید که این محصول را پیشنهاد می‌کنید یا نه!"
      );
      setModalButtons([
        {
          label: "باشه",
          type: "confirm",
          onClick: () => {
            setIsModalOpen(false);
          },
        },
      ]);
      setIsModalOpen(true);
    }

    if (!commentText.trim()) {
      setModalMessage("لطفا متن نظر خود را وارد کنید.");
      setModalButtons([
        {
          label: "باشه",
          type: "confirm",
          onClick: () => {
            setIsModalOpen(false);
          },
        },
      ]);
      setIsModalOpen(true);
    }

    try {
      await axios.post(
        "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/comments",
        {
          productId: product.idsortby,
          username: "کاربر مهمان",
          text: commentText,
          recommend,
          createdAt: new Date().toISOString(),
        }
      );
      setCommentText("");
      setRecommend(null);
      fetchComments();
    } catch (error) {
      console.error("خطا در ارسال کامنت:", error);
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(selectedColorIndex);
    }
  }, [selectedColorIndex]);

  //   اسکرول به نقطه صفر هنگام لود اولیه
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [idsortby]);

  if (!product) {
    return (
      <div className="text-center text-red-500">
        محصولی با این شناسه یافت نشد
      </div>
    );
  }
  // fav
  const isFav = favoriteItems.some(
    (item) => item.idsortby === product.idsortby
  );
  return (
    <>
      <Navbar></Navbar>
      <div className="h-10 lg:h-16"></div>
      <div className="">
        {loading ? (
          <Loading />
        ) : !product || !product.idsortby ? (
          <p className="text-center py-10 ">محصولی یافت نشد</p>
        ) : (
          <div className="ProductId p-2 flex flex-col gap-[30px]">
            <div className="md:w-[88%]  w-full flex md:flex-row flex-col justify-center items-start md:gap-[70px] gap-[20px] md:px-[40px] px-[15px]  ">
              {/* md> */}
              <h1 className="font-bold text-[140%] md:hidden block ">
                {product.title}
              </h1>

              {/* right images */}
              <div className="flex flex-col gap-[20px] justify-between self-center mb-[20px] items-center md:w-1/4 w-full">
                <img
                  src={colors[selectedColorIndex]?.img}
                  alt={`${product.title} - رنگ ${
                    colors[selectedColorIndex]?.name || "نامشخص"
                  }`}
                  className="max-h-[40rem] w-full object-contain rounded-lg"
                />

                {colors.length > 1 && (
                  <Slider
                    ref={sliderRef}
                    {...settings}
                    className="md:w-[90%] w-[130px]"
                  >
                    {colors.map((color, idx) => (
                      <div
                        className={` px-[4px]
                             ${idx === selectedColorIndex ? " scale-130" : ""}`}
                      >
                        <img
                          key={idx}
                          src={color.img}
                          alt={`${product.title} - رنگ ${
                            color.name || "تک رنگ"
                          }`}
                          onClick={() => handleColorChange(idx)}
                          className={`max-h-[40rem] w-full object-contain`}
                        />
                      </div>
                    ))}
                  </Slider>
                )}
              </div>

              {/* left desc */}
              <div className="md:w-2/3 w-full flex flex-col gap-[27px]">
                <h1 className="font-bold text-[140%] md:block hidden">
                  {product.title}
                </h1>
                {/* price */}
                <div className="flex md:flex-row flex-row-reverse md:justify-[unset] justify-between items-end gap-[40px] order-3 md:order-1 my-[17px] w-full md:w-[fit-content]">
                  <div className=" self-end flex md:flex-row flex-col  items-baseline md:gap-[10px] gap-[6px]">
                    {product.off > 0 && (
                      <span className=" text-[#1e2939e0] md:text-[95%] text-[85%] line-through">
                        {product.price.toLocaleString()}
                      </span>
                    )}

                    <p className="flex gap-[3px] text-red-800 font-bold text-[110%]">
                      {(
                        product.price -
                        (product.price * product.off) / 100
                      ).toLocaleString()}
                      <span>تومان</span>
                    </p>
                  </div>
                  {product.off > 0 && (
                    <span className="bg-red-700 font-[400] text-white text-[102%] md:px-[20px] px-[10px] flex gap-[6px] w-[fit-content] h-[fit-content] py-[3px]">
                      {product.off} درصد تخفیف
                    </span>
                  )}
                </div>
                {/* colors */}
                <div className="flex gap-[10px] items-center order-1 md:order-2">
                  <p>رنگ :</p>
                  {colors.length > 1 ? (
                    <form className="flex gap-2">
                      {colors.map((color, idx) => (
                        <label key={idx} className="cursor-pointer">
                          <input
                            type="radio"
                            name="color"
                            checked={selectedColorIndex === idx}
                            onChange={() => handleColorChange(idx)}
                            className="hidden"
                          />
                          <span
                            className={`rounded-full w-[25px] h-[25px] inline-block border-[3px]  transition-all duration-300  ${
                              selectedColorIndex === idx
                                ? "border-black shadow-md scale-110"
                                : "border-transparent"
                            }`}
                            style={{ backgroundColor: color.code }}
                          />
                        </label>
                      ))}
                    </form>
                  ) : (
                    <p>تک رنگ</p>
                  )}
                  {/* رنگ انتخابی */}
                  {/* <p className="flex gap-[14px] font-[500] px-1 py-3">
                      رنگ انتخابی:
                      <span className="font-500">
                        {colors[selectedColorIndex].name}
                      </span>
                    </p> */}
                </div>
                {/* size */}
                <div className="flex gap-[10px] items-center order-2 md:order-3">
                  <p className=" w-[fit-content] md:w-[12%]">سایز : </p>
                  {product.size && product.size.length > 0 ? (
                    <form className="flex gap-2 flex-wrap">
                      {product.size.map((s, idx) => (
                        <label key={idx} className="cursor-pointer">
                          <input
                            type="radio"
                            name="size"
                            value={s}
                            checked={selectedSize === s}
                            onChange={() => setSelectedSize(s)}
                            className="hidden"
                          />
                          <span
                            className={`px-3 py-1 border rounded-md text-sm transition-all duration-300 ${
                              selectedSize === s
                                ? "bg-black text-white border-black"
                                : "bg-white border-gray-400 hover:border-black"
                            }`}
                          >
                            {s}
                          </span>
                        </label>
                      ))}
                    </form>
                  ) : (
                    <p>فری سایز</p>
                  )}
                </div>

                {/* count and added to bag*/}
                <div
                  className={`flex md:flex-row flex-col md:gap-[30px] gap-[10px] items-center transition-all duration-300 ease-in-out  order-4 md:order-4
                    relative ${
                      isOutOfStock ? "opacity-50 cursor-not-allowed" : ""
                    } `}
                >
                  {quantity > 0 ? (
                    <div className="w-[100%] flex gap-[25px] items-center ">
                      <div className="flex justify-center items-center gap-[5px] h-[38px]">
                        <button
                          className="text-center  bg-[#92999d2b]  px-[7px] py-[2px] border border-black rounded-sm h-full"
                          disabled={isOutOfStock}
                          onClick={() =>
                            increase(
                              product.idsortby,
                              colors[selectedColorIndex]?.code,
                              selectedSize
                            )
                          }
                        >
                          <FiPlus size="15" />
                        </button>
                        <p className="text-center px-[7px] py-[5px] border border-black rounded-sm  h-full">
                          {isOutOfStock ? 0 : quantity}
                        </p>
                        <button
                          className="text-center  bg-[#92999d2b]  px-[7px] py-[2px] border border-black rounded-sm h-full"
                          disabled={isOutOfStock || quantity === 0}
                          onClick={() => {
                            if (quantity === 1) {
                              if (
                                window.confirm(
                                  "میخوای کالارو از سبد خریدت حذف کنی؟"
                                )
                              ) {
                                decrease(
                                  product.idsortby,
                                  colors[selectedColorIndex]?.code,
                                  selectedSize
                                );
                              }
                            } else {
                              decrease(
                                product.idsortby,
                                colors[selectedColorIndex]?.code,
                                selectedSize
                              );
                            }
                          }}
                        >
                          <FiMinus size="15" />
                        </button>
                      </div>
                      <button
                        className={`h-[38px] md:w-[250px] w-[95%] rounded-sm
                  ${
                    isOutOfStock
                      ? " bg-[#00000026]  cursor-not-allowed"
                      : " bg-[#309cfb] md:bg-[#2192f4] text-white"
                  }`}
                        onClick={() => {
                          // اگر محصول چند رنگ بود ولی رنگ انتخاب نشده
                          if (colors.length > 1 && !colorToSend) {
                            setModalMessage("لطفا رنگ محصول را انتخاب کنید.");
                            setModalButtons([
                              {
                                label: "باشه",
                                type: "confirm",
                                onClick: () => {
                                  setIsModalOpen(false);
                                },
                              },
                            ]);
                            setIsModalOpen(true);
                          }

                          // اگر محصول چند سایز داشت ولی سایزی انتخاب نشده
                          if (
                            product.size &&
                            product.size.length > 0 &&
                            !selectedSize
                          ) {
                            setModalMessage("لطفا سایز محصول را انتخاب کنید.");
                            setModalButtons([
                              {
                                label: "باشه",
                                type: "confirm",
                                onClick: () => {
                                  setIsModalOpen(false);
                                },
                              },
                            ]);
                            setIsModalOpen(true);
                          }
                          console.log(colorToSend, selectedSize);
                          if ((colorToSend, selectedSize))
                            addToCart({
                              ...product,
                              quantity: 1,
                              selectedColor: colorToSend,
                              selectedSize: selectedSize,
                            });
                        }}
                        disabled={isOutOfStock}
                      >
                        افزودن به سبد خرید
                      </button>
                    </div>
                  ) : (
                    <button
                      className="h-[38px] md:w-[250px] w-full rounded-sm bg-[#309cfb] md:bg-[#2192f4] text-white "
                      onClick={() => {
                        // اگر محصول چند رنگ بود ولی رنگ انتخاب نشده
                        if (colors.length > 1 && !colorToSend) {
                          setModalMessage("لطفا رنگ محصول را انتخاب کنید.");
                          setModalButtons([
                            {
                              label: "باشه",
                              type: "confirm",
                              onClick: () => {
                                setIsModalOpen(false);
                              },
                            },
                          ]);
                          setIsModalOpen(true);
                        }

                        // اگر محصول چند سایز داشت ولی سایزی انتخاب نشده
                        if (
                          product.size &&
                          product.size.length > 0 &&
                          !selectedSize
                        ) {
                          setModalMessage("لطفا سایز محصول را انتخاب کنید.");
                          setModalButtons([
                            {
                              label: "باشه",
                              type: "confirm",
                              onClick: () => {
                                setIsModalOpen(false);
                              },
                            },
                          ]);
                          setIsModalOpen(true);
                        }
                        console.log(colorToSend, selectedSize);
                        if ((colorToSend, selectedSize))
                          addToCart({
                            ...product,
                            quantity: 1,
                            selectedColor: colorToSend,
                            selectedSize: selectedSize,
                          });
                      }}
                      disabled={isOutOfStock}
                    >
                      افزودن به سبد خرید
                    </button>
                  )}
                  {/* add fav */}
                  <div
                    className={`self-center flex items-center px-[5px] gap-[5px] md:absolute bottom-[-32px] text-[95%] font-[500]
                  ${quantity > 0 ? "right-[120px] " : "right-[0] "}`}
                  >
                    <div
                      className={`self-center flex items-center px-[5px]  md:absolute bottom-[-17px] ${
                        quantity > 0 ? "right-[120px] " : "right-[0] "
                      }`}
                    >
                      {isFav ? (
                        <div
                          className="flex items-center gap-[5px] text-[95%] font-[500]"
                          onClick={() => {
                            removeFromFav(product.id);
                          }}
                        >
                          <FaHeart
                            color="#bc0000"
                            className="p-[2px] cursor-pointer"
                            size={20}
                          />
                          <p className="text-center whitespace-nowrap">
                            حذف از علاقه‌مندی‌ها
                          </p>
                        </div>
                      ) : (
                        <div
                          className="flex items-center gap-[5px] text-[95%] font-[500]"
                          onClick={() => {
                            if (!isLoggedIn) {
                              setModalMessage(
                                "برای اضافه کردن محصول به علاقه‌مندی‌ها باید وارد حساب کاربری خود شوید!"
                              );
                              setModalButtons([
                                {
                                  label: "ورود به حساب کاربری",
                                  type: "yes",
                                  onClick: () => {
                                    setIsModalOpen(false);
                                    navigate("/Fotros/login");
                                  },
                                },
                                {
                                  label: "بیخیال",
                                  type: "no",
                                  onClick: () => {
                                    setIsModalOpen(false);
                                  },
                                },
                              ]);
                              setIsModalOpen(true);
                            }
                            addToFav(product);
                          }}
                        >
                          <FaRegHeart
                            className="p-[2px] cursor-pointer"
                            size={20}
                          />
                          <p className="text-center whitespace-nowrap">
                            افزودن به علاقه‌مندی‌ها
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* مشخصات محصول و کامنت ها */}
            <div className=" md:mx-[40px] mx-[10px] my-[30px]">
              {/* دکمه ها */}
              <div className="w-full flex md:justify-start justify-around items-center gap-[5px] md:gap-[14px] border-b-[1px] border-gray-300">
                <button
                  className={` px-[10px] ${
                    desc
                      ? " border-b-[2px] border-red-700 z-1 text-[102%]"
                      : "text-gray-700"
                  }`}
                  onClick={() => {
                    setDesc(true);
                    setComment(false);
                  }}
                >
                  مشخصات محصول
                </button>
                <button
                  className={` px-[10px] flex items-center gap-[5px]
                    ${
                      comment
                        ? "border-b-[2px] border-red-700 z-1 text-[102%]"
                        : "text-gray-700"
                    }`}
                  onClick={() => {
                    setDesc(false);
                    setComment(true);
                  }}
                >
                  نظرات کاربران
                  <span className="text-[75%]">({commentsCount})</span>
                </button>
              </div>
              {/* توضیحات محصول */}
              {desc && (
                <div className={` desc flex gap-[10px] py-[16px] `}>
                  <div className="md:w-3/10 w-2/5  flex flex-col gap-[14px]">
                    <ul className="flex flex-col gap-[14px]">
                      <li className="bg-[#f5f5f5] px-[12px] py-[4px]">نام</li>
                      <li className="bg-[#f5f5f5] px-[12px] py-[4px]">کد</li>
                      <li className="bg-[#f5f5f5] px-[12px] py-[4px]">
                        جنس پارچه
                      </li>
                      <li className="bg-[#f5f5f5] px-[12px] py-[4px]">سایز</li>
                      {product.dokme && (
                        <li className="bg-[#f5f5f5] px-[12px] py-[4px]">
                          نحوه بسته شدن
                        </li>
                      )}
                    </ul>
                    {(product.shoulder ||
                      product.chest ||
                      product.arm ||
                      product.wrist ||
                      product.stans ||
                      product.dressLength) && (
                      <ul className="flex flex-col gap-[14px]">
                        {product.shoulder && (
                          <li className="bg-[#f5f5f5] px-[12px] py-[4px]">
                            عرض شانه
                          </li>
                        )}
                        {product.chest && (
                          <li className="bg-[#f5f5f5] px-[12px] py-[4px]">
                            دور سینه
                          </li>
                        )}
                        {product.arm && (
                          <li className="bg-[#f5f5f5] px-[12px] py-[4px]">
                            دور بازو
                          </li>
                        )}
                        {product.wrist && (
                          <li className="bg-[#f5f5f5] px-[12px] py-[4px]">
                            دور مچ
                          </li>
                        )}
                        {product.stans && (
                          <li className="bg-[#f5f5f5] px-[12px] py-[4px]">
                            قد آستین
                          </li>
                        )}
                        {product.dressLength && (
                          <li className="bg-[#f5f5f5] px-[12px] py-[4px]">
                            قد کار
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                  <div className="md:w-7/10 w-2/3 flex flex-col gap-[14px]">
                    <ul className="flex flex-col gap-[14px]">
                      <li className="bg-[#f5f5f5] px-[12px] py-[4px]">
                        {product.title}
                      </li>
                      <li className="bg-[#f5f5f5] px-[12px] py-[4px]">
                        {product.code}
                      </li>
                      <li className="bg-[#f5f5f5] px-[12px] py-[4px]">
                        {product.jens}
                      </li>
                      <li className="bg-[#f5f5f5] px-[12px] py-[4px] flex">
                        {product.size.map((s) => (
                          <span className="">
                            {s}
                            {s > 2 && <span>,</span>}
                          </span>
                        ))}
                      </li>
                      {product.dokme && (
                        <li className="bg-[#f5f5f5] px-[12px] py-[4px]">
                          {product.dokme}
                        </li>
                      )}
                    </ul>
                    {(product.shoulder ||
                      product.chest ||
                      product.arm ||
                      product.wrist ||
                      product.stans ||
                      product.dressLength) && (
                      <ul className="flex flex-col gap-[14px]">
                        {product.shoulder && (
                          <li className="bg-[#f5f5f5] px-[12px] py-[4px]">
                            {product.shoulder}
                          </li>
                        )}
                        {product.chest && (
                          <li className="bg-[#f5f5f5] px-[12px] py-[4px]">
                            {product.chest}
                          </li>
                        )}
                        {product.arm && (
                          <li className="bg-[#f5f5f5] px-[12px] py-[4px]">
                            {product.arm}
                          </li>
                        )}
                        {product.wrist && (
                          <li className="bg-[#f5f5f5] px-[12px] py-[4px]">
                            {product.wrist}
                          </li>
                        )}
                        {product.stans && (
                          <li className="bg-[#f5f5f5] px-[12px] py-[4px]">
                            {product.stans}
                          </li>
                        )}
                        {product.dressLength && (
                          <li className="bg-[#f5f5f5] px-[12px] py-[4px]">
                            {product.dressLength}
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              )}
              {comment && (
                <div className={` desc py-[16px] px-[8px]`}>
                  <div className="mt-[10px] mb-[30px]">
                    {comments.length === 0 ? (
                      <p className="px-[30px] py-[10px] bg-[#f5f5f5] w-full text-center">
                        هنوز نظری ثبت نشده است
                      </p>
                    ) : (
                      <ul>
                        {comments.map((comment) => (
                          <li
                            key={comment.id}
                            className="pb-[20px] pt-[16px] bg-[#f5f5f5] px-[15px] rounded-sm mb-[10px]"
                          >
                            <div className="flex items-center pb-[7px] gap-[10px]">
                              {comment.recommend === true && (
                                <AiOutlineLike color="green" />
                              )}
                              {comment.recommend === false && (
                                <AiOutlineDislike color="red" />
                              )}
                              <p className="font-bold">{comment.username}</p>
                            </div>
                            <div className="flex md:flex-row flex-col  items-center md:px-[8px]">
                              <p className="self-start">{comment.text}</p>
                              <p className="text-[60%] text-gray-500 self-end">
                                {new Date(comment.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <h4>ثبت نظر</h4>
                  <div
                    className={` flex flex-col gap-[10px] py-[16px] px-[8px] `}
                  >
                    <div className="flex md:flex-row flex-col md:gap-[26px] gap-[10px]">
                      <p
                        className="flex gap-[5px] items-center "
                        onClick={() => setRecommend(true)}
                      >
                        {recommend ? (
                          <AiFillLike color="green"></AiFillLike>
                        ) : (
                          <AiOutlineLike color="green"></AiOutlineLike>
                        )}
                        این محصول را پیشنهاد میکنم
                      </p>
                      <p
                        className="flex gap-[5px] items-center "
                        onClick={() => setRecommend(false)}
                      >
                        {recommend ? (
                          <AiOutlineDislike color="red"></AiOutlineDislike>
                        ) : (
                          <AiFillDislike color="red"></AiFillDislike>
                        )}
                        این محصول را پیشنهاد نمیکنم
                      </p>
                    </div>
                    <form
                      onSubmit={handleSubmitComment}
                      className="flex flex-col gap-[10px]"
                    >
                      <textarea
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="bg-[#f5f5f5] py-[10px] md:px-[20px] px-[9px] rounded-sm "
                        placeholder="لطفا نظر خود را اینجا بنویسد."
                      />
                      {!isLoggedIn && (
                        <Link
                          to="/Fotros/login"
                          className="w-full flex md:flex-row flex-col items-center md:justify-[unset] justify-center gap-[3px] text-[95%] md:text-[100%] md:w-[max-content] my-[5px]"
                        >
                          <span>
                            قبل از ثبت نظر بايد وارد حساب کاربری خود شويد.
                          </span>
                          <span className="text-[95%] text-[#2192f4]">
                            ورود به حساب کاربری
                          </span>
                        </Link>
                      )}
                      <button
                        type="subnit"
                        onClick={() => {
                          if (!isLoggedIn) {
                            setModalMessage(
                              "برای ثبت نظر باید وارد حساب کاربری خود شوید!"
                            );
                            setModalButtons([
                              {
                                label: "ورود به حساب کاربری",
                                type: "yes",
                                onClick: () => {
                                  setIsModalOpen(false);
                                  navigate("/Fotros/login");
                                },
                              },
                              {
                                label: "بیخیال",
                                type: "no",
                                onClick: () => {
                                  setIsModalOpen(false);
                                },
                              },
                            ]);
                            setIsModalOpen(true);
                          }
                        }}
                        className="md:bg-[#2192f4] text-[102%] md:text-[100%] md:border-unset border-[3px] border-[#75beff] md:border-[unset] w-[70%]  md:w-[unset] self-center md:self-end text-[#1e88e5] md:text-white px-[30px] py-[10px] md:py-[5px] my-[6px] box-shadow rounded-xl "
                      >
                        ثبت نظر
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
            {/* پیام پردازش */}
            <div className=" w-full">
              <p className="py-1 px-2 m-auto bg-[#a8d2ff17] md:w-[50%] border-t-4 border-solid border-[#0ba5ffed] text-[85%] text-center">
                پردازش محصولات<span className="font-[600]"> 7 الی 10 </span>
                روزکاری زمان می‌برد!
              </p>
            </div>
            {/* محصولات مشابه  */}
            <SlideProduct
              title="م&#x0640;حص&#x0640;ولات مشابه"
              title2="محصولات مشابه"
              allurl={`https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?category=${product.category}`}
              url={`https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?category=${product.category}`}
            ></SlideProduct>
          </div>
        )}
      </div>
      <Footer />
      <ModalAlert
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        message={modalMessage}
        timer={4000} // مدت زمان نوار progress
        buttons={modalButtons}
      />
    </>
  );
}

export default memo(ProductId);
