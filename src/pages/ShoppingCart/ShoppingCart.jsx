import { memo, useEffect, useState } from "react";

import Footer from "../../components/Footer/Footer";
import { useCart } from "../../context/CartContext/CartContext";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { IoTrashOutline } from "react-icons/io5";
import SlideProduct from "../../components/SlideProduct/SlideProduct";

function ShoppingCart() {
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

  const [deletedMessage, setDeletedMessage] = useState(false);
  //   وقتی وارد صفحه محصول می‌شی، اگر صفحه پایین باشه، اسلایدر دیده نمی‌شه
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar />
      <div className="h-16  "></div>

      <div className="ShoppingCart flex-1 relative  min-h-screen flex flex-col pb-[90px]">
        {/* پیغام حذف یا اضافه و... */}
        <div
          className={`fixed bg-[white] top-14 left-1/2 -translate-x-1/2 z-10 w-[85%] p-3    border-t-2 border-solid border-[#0ba5ffed] text-sm rounded-sm shadow-md transition-all duration-300 ${
            deletedMessage ? "" : "hidden"
          }`}
        >
          <i className="fa fa-check text-[#0ba5ffed] p-2"></i>
          {deletedMessage}
        </div>

        {cartItems.length === 0 ? (
          // موجود نبودن محصول
          <div
            className={` py-1 px-2 m-auto bg-[#a8d2ff17] md:w-[50%] border-t-4 border-solid border-[#0ba5ffed]  text-center flex flex-col justify-center items-center mt-1 mb-3 `}
          >
            <p className="p-[10px]">
              <i className=" fa fa-times text-[#00c7eced] font-[600] p-2"></i>
              سبد خرید شما در حال حاضر خالی است.
            </p>
          </div>
        ) : (
          // نمایش سبد خرید
          <div className="p-[10px] md:px-[40px] md:py-[15px]">
            <h2 className="p-[10px] text-[140%] font-[600] ">سبد خرید</h2>

            <div className="flex flex-col-reverse md:flex-row gap-[20px]">
              {/* محصولات */}
              <div className=" w-full md:w-[75%] ">
                {/* هر محصول */}
                {cartItems.map((item) => (
                  <div
                    key={item.idsortby}
                    className={` oneprodukt md:h-[300px] flex flex-col md:flex-row gap-[15px] md:gap-[45px] relative bg-[#f5f5f5] p-[10px] md:p-[20px] rounded-md m-[10px] md:m-1 `}
                  >
                    {/* تصویر */}
                    <div className="flex justify-center items-center h-[fit-content] md:w-[20%] rounded-md md:px-[5px] px-[28px]">
                      <img
                        src={item.img}
                        alt={item.title}
                        className=" md:h-full w-full md:w-[unset] rounded-md "
                        loading="lazy"
                      />
                    </div>
                    {/* اطلاعات محصول */}
                    <div className="flex flex-col justify-between gap-[20px] md:gap-[10px] md:w-[64%]">
                      <div className="flex items-center justify-between">
                        <p className="font-[600]">{item.title}</p>
                        <IoTrashOutline
                          onClick={() => {
                            let confirmm = confirm(
                              "میخوای کالا رو از سبد خریدت حذف کنی؟"
                            );
                            if (confirmm) {
                              removeFromCart(
                                item.idsortby,
                                item.selectedColor?.code,
                                item.selectedSize
                              );
                              setDeletedMessage(
                                `"${item.title}" با رنگ "${item.selectedColor?.name}" از سبد خرید حذف شد`
                              );
                              setTimeout(() => {
                                setDeletedMessage(false);
                              }, 3000);
                            }
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
                        to={`/bazrafkan-store/Oneitem/${item.idsortby}`}
                        className="text-[80%]"
                      >
                        برای دیدن مشخصات محصول کلیک کن!
                      </Link>
                      {/* تعداد و جمع جزء */}
                      <div className=" flex justify-between py-3  ">
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
                                let confirmq = confirm(
                                  "میخوای کالا رو از سبد خریدت حذف کنی؟"
                                );
                                if (confirmq) {
                                  removeFromCart(
                                    item.idsortby,
                                    item.selectedColor?.code,
                                    item.selectedSize
                                  );
                                  setDeletedMessage(
                                    `"${item.title}" از سبد خرید حذف شد`
                                  );
                                  setTimeout(() => {
                                    setDeletedMessage(false);
                                  }, 3000);
                                }
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
                className={`flex flex-col gap-[13px] md:gap-[8px] bg-[#f5f5f5] p-[10px] pb-[25px] md:p-[20px] rounded-md m-1 h-[fit-content] `}
              >
                <h4 className="text-[108%] md:text-[133%] font-[600] p-[10px]">
                  فاکتور خرید شما
                </h4>

                <p className="md:font-[600] flex gap-[10px] self-center">
                  <span> جمع کل سبد خرید ({totalQuantity})</span>:{" "}
                  <span>{total.toLocaleString()}تومان</span>
                </p>

                <button
                  className="self-center bg-[#1e88e5] text-white text-center py-[6px] px-[12px] rounded-xl box-shadow my-[4px]"
                >
                  ادامه جهت تسویه حساب
                </button>

                <button
                onClick={() => {
                    let confirmp = confirm("میخوای سبد خرید رو حذف کنی؟");
                    if (confirmp) {
                      clearCart();
                      setDeletedMessage(`سبد خرید خالی شد`);
                      setTimeout(() => {
                        setDeletedMessage(false);
                      }, 3000);
                    }
                  }}
                  type="button"
                  className="self-center bg-[#f5f5f5] border-[#1e88e5] border-[1px] text-center py-[1px] px-[10px] rounded-xl box-shadow text-[85%]"
                >
                  پاک کردن سبد خرید
                </button>
              </div>
            </div>
            {/* پیشنهاد محصول */}
            <div className="my-[20px] mt-[80px] p-[10px] bg-[#f5f5f5]">
            <SlideProduct
              title="خریداران این محصولات.محصولات زیر را هم خریده اند"
              allurl={`https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products`}
              url={`https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products`}
            ></SlideProduct>
            </div>
                      </div>
        )}
      </div>

      <Footer />
    </>
  );
}
export default memo(ShoppingCart);
