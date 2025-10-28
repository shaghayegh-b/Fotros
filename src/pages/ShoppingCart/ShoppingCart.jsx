import { memo, useEffect, useRef, useState } from "react";

import Footer from "../../components/Footer/Footer";
import { useCart } from "../../context/CartContext/CartContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { IoTrashOutline } from "react-icons/io5";
import SlideProduct from "../../components/SlideProduct/SlideProduct";
import ModalAlert from "../../components/ModalAlert/ModalAlert";
import { useAuth } from "../../context/AuthContext/AuthContext";

function ShoppingCart() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalButtons, setModalButtons] = useState([]);

  const {
    cartItems,
    removeFromCart,
    clearCart,
    decrease,
    increase,
    addToCart,
  } = useCart();
  const totalQuantity = cartItems?.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const [colorPickerVisible, setColorPickerVisible] = useState({});
  const toggleColorPicker = (idsortby) => {
    setColorPickerVisible((prev) => ({
      ...prev,
      [idsortby]: !prev[idsortby],
    }));
  };

  const handleColorSelect = (produkt, colorToSend) => {
    // حذف فقط آیتم بی‌رنگ
    const itemWithoutColor = cartItems.find(
      (item) => item.idsortby === produkt.idsortby && !item.selectedColor
    );

    if (itemWithoutColor) {
      removeFromCart(produkt.idsortby); // این الان فقط آیتم‌های بی‌رنگ رو حذف می‌کنه
    }

    // آیا آیتم با رنگ موردنظر قبلاً هست؟
    const itemExists = cartItems.some(
      (item) =>
        item.idsortby === produkt.idsortby &&
        item.selectedColor?.code === colorToSend?.code
    );

    if (itemExists) {
      increase(produkt.idsortby, colorToSend?.code);
    } else {
      addToCart({
        ...produkt,
        quantity: 1,
        selectedColor: colorToSend,
      });
    }

    setColorPickerVisible((prev) => ({
      ...prev,
      [produkt.idsortby]: false,
    }));
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  //   deletedMessage
  const [deletedMessage, setDeletedMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [progressWidth, setProgressWidth] = useState("100%");
  const timerRef = useRef(null);

  // وقتی deletedMessage مقدار بگیره، پیام به سبک ModalAlert نمایش داده میشه
  useEffect(() => {
    if (!deletedMessage) return;

    setVisible(true);
    setProgressWidth("100%");

    // شروع انیمیشن progress bar
    const progressTimeout = setTimeout(() => setProgressWidth("0%"), 50);

    timerRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setDeletedMessage("");
        setProgressWidth("100%");
      }, 300);
    }, 4000);

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(progressTimeout);
    };
  }, [deletedMessage]);

  //   وقتی وارد صفحه محصول می‌شی، اگر صفحه پایین باشه، اسلایدر دیده نمی‌شه
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar />
      <div className="h-6 lg:h-16"></div>

      <div className="ShoppingCart pt-[3px] px-[14px] pb-[30px] lg:px-[30px]  flex-1 relative  min-h-[55vh] flex flex-col">
        <h6 className="text-gray-500 px-[8px] md:px-[20px] pt-[28px] lg:pt-[10px] pb-[10px] md:pb-[20px] text-[85%] flex gap-[4px]">
          <Link to="/Fotros/">صفحه اصلی &gt; </Link>
          <span>سبد خرید</span>
        </h6>
        {/* پیغام حذف یا اضافه و... */}
        {deletedMessage && (
          <div
            id="deletedMessageBackdrop"
            className={`fixed inset-0 bg-[#00000053] bg-opacity-30 flex justify-center items-start pt-10 z-50 transition-opacity duration-300 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            onClick={(e) => {
              if (e.target.id === "deletedMessageBackdrop") {
                setVisible(false);
                setTimeout(() => setDeletedMessage(""), 300);
              }
            }}
          >
            <div
              className={`relative bg-white rounded-xl shadow-lg w-full max-w-[90%] md:max-w-[47%]  p-[25px] overflow-hidden transform transition-all duration-300 ${
                visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              {" "}
              {/* نوار Progress */}
              <div className="absolute w-[100%]  left-0 bottom-[0px]  shadow-[0_0_8px_rgba(30,136,229,0.6)] rounded-b-xl">
                <div className="h-[4px] bg-gray-300">
                  <div
                    className=" h-[4px] bg-[#0b9ae7dd] "
                    style={{
                      width: progressWidth,
                      transition: `width 4000ms linear`,
                    }}
                  ></div>
                </div>
              </div>
              <p className=" text-center text-[102%] font-[500] relative z-10">
                {deletedMessage}
              </p>
            </div>
          </div>
        )}

        {cartItems.length === 0 ? (
          // موجود نبودن محصول
          <div
            className={`font-vazir py-1 px-2 m-auto bg-[#a8d2ff17] md:w-[50%] border-t-4 border-solid border-[#0ba5ffed]  text-center flex flex-col justify-center items-center mt-1 mb-3 `}
          >
            <p className="p-[10px]">
              <i className=" fa fa-times text-[#00c7eced] font-[600] p-2"></i>
              سبد خرید شما در حال حاضر خالی است.
            </p>
          </div>
        ) : (
          // نمایش سبد خرید
          <div className="px-[unset] md:px-[40px] md:py-[15px]">
            <h2 className="py-[10px] text-[140%] font-bold">سبد خرید</h2>
            <div className="flex flex-col-reverse md:flex-row gap-[5px]">
              {/* محصولات */}
              <div className=" w-full md:w-[75%] flex flex-col gap-[10px] ">
                {/* هر محصول */}
                {cartItems.map((item) => (
                  <div
                    key={item.idsortby}
                    className={` oneprodukt flex flex-col md:flex-row gap-[15px] md:gap-[30px] relative bg-[#f5f5f5] p-[10px] md:p-[20px] rounded-md `}
                  >
                    {/* تصویر */}
                    <div className="self-center flex justify-center items-center h-[200px] md:h-[fit-content] md:w-[25%] rounded-md md:px-[5px] px-[28px]">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="h-full md:h-full md:w-[unset] rounded-md "
                        loading="lazy"
                      />
                    </div>
                    {/* اطلاعات محصول */}
                    <div className="flex flex-col gap-[15px] w-full">
                      {/* نام محصول و حذف  */}
                      <div className="flex items-center justify-between">
                        <p className="font-[600]">{item.title}</p>
                        <IoTrashOutline
                          onClick={() => {
                            setModalMessage(
                              "میخوای کالا رو از سبد خریدت حذف کنی؟"
                            );
                            setModalButtons([
                              {
                                label: "بله",
                                type: "yes",
                                onClick: () => {
                                  removeFromCart(
                                    item.idsortby,
                                    item.selectedColor?.code,
                                    item.selectedSize
                                  );
                                  setDeletedMessage(
                                    `"${item.title}" با رنگ "${item.selectedColor?.name}" از سبد خرید حذف شد`
                                  );

                                  setIsModalOpen(false);
                                },
                              },
                              {
                                label: "خیر",
                                type: "no",
                                onClick: () => {
                                  setIsModalOpen(false);
                                },
                              },
                            ]);
                            setIsModalOpen(true);
                          }}
                          className="fa fa-times hover:text-red-700 cursor-pointer"
                        />
                      </div>
                      {/*  قیمت */}
                      <div className="flex items-baseline md:gap-[10px] gap-[6px]">
                        {item.off > 0 && (
                          <span className=" text-[#1e2939e0] md:text-[95%] text-[85%] line-through">
                            {item.price.toLocaleString()}
                          </span>
                        )}

                        <p className="flex gap-[3px] text-red-800 font-bold text-[110%]">
                          {(
                            item.price -
                            (item.price * item.off) / 100
                          ).toLocaleString()}
                          <span>تومان</span>
                        </p>
                      </div>
                      {/* رنگ انتخابی */}
                      <div className="flex gap-[10px]">
                        {/* رنگ انتخابی */}{" "}
                        <p className="flex bg-white py-[3px] px-[10px] rounded-xl w-[fit-content] ">
                          <span className="font-[600]">رنگ انتخابی : </span>
                          &nbsp;
                          {item.selectedColor?.name ? (
                            item.selectedColor.name
                          ) : (
                            <>
                              {!colorPickerVisible[item.idsortby] && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    toggleColorPicker(item.idsortby)
                                  }
                                  className="bg-[#76bcf8c4] rounded-sm px-1 mx-1"
                                >
                                  رنگ را انتخاب کنید
                                </button>
                              )}
                              {colorPickerVisible[item.idsortby] && (
                                <div className="flex items-center gap-1">
                                  {item.colors.map((color) => (
                                    <button
                                      key={color.code}
                                      className={` w-4 h-4 rounded-full border-solid border-1 border-black`}
                                      style={{
                                        backgroundColor: color.code,
                                      }}
                                      title={color.name}
                                      onClick={() =>
                                        handleColorSelect(item, color)
                                      }
                                    />
                                  ))}
                                </div>
                              )}
                            </>
                          )}
                        </p>
                        {/* سایز انتخابی  */}
                        <p className="flex bg-white py-[3px] px-[10px] rounded-xl w-[fit-content] ">
                          <span className="font-[600]">سایز انتخابی : </span>
                          &nbsp;
                          {item.selectedSize || "Free Size"}
                        </p>
                      </div>
                      {/* دیدن محصول */}
                      <Link
                        to={`/Fotros/Products/${item.idsortby}`}
                        className="text-[80%]"
                      >
                        برای دیدن مشخصات محصول کلیک کن!
                      </Link>
                      {/* تعداد و جمع جزء */}
                      <div className="flex items-center gap-[100px] pt-[15px] pb-[7px]">
                        {/* جمع جزء */}
                        <p>
                          <span className="font-[600]">جمع جزء :</span>&nbsp;
                          {(item.price * item.quantity).toLocaleString()}
                        </p>
                        {/* تعداد */}
                        <div className=" flex justify-center items-center border-[1px] border-solid border-black rounded-sm">
                          <button
                            onClick={() =>
                              increase(
                                item.idsortby,
                                item.selectedColor?.code,
                                item.selectedSize
                              )
                            }
                            className="  bg-[#92999d2b]    px-4 rounded-br-sm rounded-tr-sm"
                          >
                            <i className="fa fa-plus text-[80%]"></i>
                          </button>
                          <p className=" px-4">{item.quantity}</p>
                          <button
                            onClick={() => {
                              if (item.quantity === 1) {
                                setModalMessage(
                                  "میخوای کالا رو از سبد خریدت حذف کنی؟"
                                );
                                setModalButtons([
                                  {
                                    label: "بله",
                                    type: "yes",
                                    onClick: () => {
                                      removeFromCart(
                                        item.idsortby,
                                        item.selectedColor?.code,
                                        item.selectedSize
                                      );
                                      setDeletedMessage(
                                        `"${item.title}" با رنگ "${item.selectedColor?.name}" از سبد خرید حذف شد`
                                      );

                                      setIsModalOpen(false);
                                    },
                                  },
                                  {
                                    label: "خیر",
                                    type: "no",
                                    onClick: () => {
                                      setIsModalOpen(false);
                                    },
                                  },
                                ]);
                                setIsModalOpen(true);
                              } else {
                                decrease(
                                  item.idsortby,
                                  item.selectedColor?.code,
                                  item.selectedSize
                                );
                              }
                            }}
                            className=" bg-[#92999d2b]     px-4 rounded-bl-sm rounded-tl-sm"
                          >
                            <i className="fa fa-minus text-[80%]"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* فاکتور خرید */}
              <div
                className={`flex flex-col gap-[9px] md:gap-[8px] bg-[#f5f5f5] px-[10px] pb-[25px] pt-[6px] md:p-[20px] rounded-md m-1 h-[fit-content] `}
              >
                <h4 className="text-[110%] md:text-[133%] font-bold py-[10px] px-[4px]">
                  فاکتور خرید شما
                </h4>

                <p className="md:font-[600] flex gap-[10px] self-center whitespace-nowrap">
                  <span> جمع کل سبد خرید ({totalQuantity})</span>:{" "}
                  <span>{total.toLocaleString()} تومان</span>
                </p>

                <button
                  onClick={() => {
                    if (!isLoggedIn) {
                      setModalMessage(
                        "برای تسویه حساب باید وارد حساب کاربری خود شوید!"
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
                  className="self-center bg-[#1e88e5] text-white text-center py-[6px] px-[12px] rounded-xl box-shadow my-[4px]"
                >
                  ادامه جهت تسویه حساب
                </button>

                <button
                  onClick={() => {
                    setModalMessage("میخوای سبد خرید رو حذف کنی؟");
                    setModalButtons([
                      {
                        label: "بله",
                        type: "yes",
                        onClick: () => {
                          clearCart();
                          setDeletedMessage(`سبد خرید خالی شد`);

                          setIsModalOpen(false);
                        },
                      },
                      {
                        label: "خیر",
                        type: "no",
                        onClick: () => {
                          setIsModalOpen(false);
                        },
                      },
                    ]);
                    setIsModalOpen(true);
                  }}
                  type="button"
                  className="self-center bg-[#f5f5f5] border-[#1e88e5] border-[1px] text-center pb-[2px] pt-[4px] px-[10px] rounded-xl box-shadow text-[85%]"
                >
                  پاک کردن سبد خرید
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* پیشنهاد محصول */}
      {cartItems.length > 0 && (
        <div className="w-full my-[20px] mt-[45px] py-[10px] bg-[#f5f5f5] px-[-5px]">
          <SlideProduct
            title="خریداران این محصولات.محصولات زیر را هم خریده اند"
            title2="محصولات"
            allurl={`https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products`}
            url={`https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products`}
          ></SlideProduct>
        </div>
      )}

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
export default memo(ShoppingCart);
