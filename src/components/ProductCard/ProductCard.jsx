import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { MdCheck } from "react-icons/md";
import { useFav } from "../../context/FavProvider/FavProvider";
import { useCart } from "../../context/CartContext/CartContext";
import { useAuth } from "../../context/AuthContext/AuthContext";

/**
 * باکس محصول مشترک — هم توی اسلایدر صفحه اصلی استفاده میشه هم توی گرید
 * صفحه‌ی /Fotros/Products، تا هر دو دقیقاً یک شکل باشن.
 *
 * نکته‌های مهم طراحی:
 * - ارتفاع کارت با aspect-ratio قفل نشده (باعث می‌شد کارت‌های تخفیف‌دار
 *   که قیمتشون دو خطی میشه، بهم بریزن/بلندتر به نظر برسن). به جاش فقط
 *   تصویر مربعه و بقیه‌ی کارت auto-height هست.
 * - بخش قیمت min-height ثابت داره تا کارت تخفیف‌دار و بی‌تخفیف هم‌قد بمونن.
 */
function ProductCard({ product, onNeedLogin }) {
  const { addToFav, removeFromFav, favoriteItems } = useFav();
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [justAdded, setJustAdded] = useState(false);

  const isFav = favoriteItems?.some((item) => item.id === product.id);
  const hasOff = product.off > 0;
  const finalPrice =
    product.price - (product.price * (product.off || 0)) / 100;

  const handleToggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFav) {
      removeFromFav(product.id);
      return;
    }
    if (!isLoggedIn && onNeedLogin) {
      onNeedLogin();
    }
    addToFav(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      ...product,
      quantity: 1,
      selectedColor: product.colors?.[0] || null,
      selectedSize: product.size?.[0] || null,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div
      className="product-card relative flex flex-col items-center gap-[8px] md:gap-[10px]
      bg-[var(--product)] p-2.5 md:p-3.5 rounded-2xl shadow-[var(--card-shadow)]
      hover:shadow-[var(--card-hover-shadow)] transition-all duration-300
      border border-gray-100 w-full h-full"
    >
      {/* آیکون علاقه‌مندی */}
      <button
        type="button"
        onClick={handleToggleFav}
        aria-label="افزودن به علاقه‌مندی‌ها"
        className="absolute top-2 left-2 z-10 p-1 rounded-full bg-white/20 backdrop-blur-sm
        transition-transform duration-200 hover:scale-125 active:scale-90"
      >
        {isFav ? (
          <FaHeart color="#bc0000" size={16} />
        ) : (
          <FaRegHeart className="text-[var(--text)]" size={16} />
        )}
      </button>
{hasOff && (
            <span className="absolute top-2 right-2 z-1 rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
              ٪{product.off}
            </span>
          )}
      <Link
        to={`/Fotros/Products/${product.idsortby}`}
        className="flex flex-col items-center w-full gap-[8px] md:gap-[10px]"
      >
        {/* تصویر */}
        <div className="relative w-full aspect-square flex justify-center items-center overflow-hidden rounded-xl">

          <img
            src={product.img}
            alt={product.title}
            loading="lazy"
            className="w-[92%] h-[92%] object-contain transition-transform duration-500"
          />
        </div>

        {/* عنوان */}
        <p className="w-full text-center font-medium text-[var(--text)] truncate text-[90%] md:text-[95%]">
          {product.title}
        </p>

        {/* قیمت — ریسپانسیو و هم‌قد برای همه‌ی کارت‌ها، چه تخفیف داشته باشن چه نه */}
        <div className="w-full flex flex-col items-start justify-center gap-0.5 min-h-[38px] md:min-h-[42px]">
          {hasOff && (
            <span className="text-[var(--text-gary)] line-through text-[70%] sm:text-[75%] leading-none">
              {Number(product.price).toLocaleString()} تومان
            </span>
          )}
          <span
            className={`text-[80%] sm:text-[85%] md:text-[90%] leading-none ${
              hasOff ? "font-bold text-red-600" : "text-[var(--text)]"
            }`}
          >
            {finalPrice.toLocaleString()} تومان
          </span>
        </div>
      </Link>

      {/* دکمه افزودن به سبد خرید */}
      <button
        type="button"
        onClick={handleAddToCart}
        aria-label="افزودن به سبد خرید"
        className="add-to-cart-btn absolute bottom-2.5 left-2.5 z-10 flex items-center justify-center
        w-[30px] h-[30px] md:w-[34px] md:h-[34px] rounded-full text-white shadow-md"
        style={{ backgroundColor: justAdded ? "#2e7d32" : "var(--btn)" }}
      >
        {justAdded ? (
          <MdCheck size={16} className="animate-pop" />
        ) : (
          <RiShoppingCartLine size={15} />
        )}
      </button>
    </div>
  );
}

export default ProductCard;
