import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext/CartContext";


function CartPreview({ onGoToCheckout, onClose }) {
  const { cartItems } = useCart();
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="glass-panel animate-fade-slide overflow-hidden rounded-2xl border border-[var(--sup-b)] bg-[var(--sup-sm)]/95 shadow-2xl">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center gap-2 p-6 text-center text-sm text-[var(--text-gary)]">
          <p>سبد خرید شما خالیه</p>
          <Link
            to="/Fotros/Products"
            onClick={onClose}
            className="mt-1 rounded-xl bg-[var(--btn)] px-4 py-1.5 text-xs text-white transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            مشاهده محصولات
          </Link>
        </div>
      ) : (
        <>
          <div className="thin-scroll flex max-h-[280px] flex-col gap-3 overflow-y-auto p-3">
            {cartItems.slice(0, 4).map((item) => (
              <div
                key={`${item.idsortby}-${item.selectedColor?.code}-${item.selectedSize}`}
                className="flex items-center gap-3 rounded-xl transition-colors duration-200 hover:bg-[var(--cartcategory-hover)] p-1"
              >
                <div className="media-box h-[52px] w-[52px] shrink-0 rounded-lg bg-[var(--sup)]">
                  <img src={item.img} alt={item.title} />
                </div>
                <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
                  <p className="truncate text-xs font-medium">{item.title}</p>
                  <p className="text-[11px] text-[var(--text-gary)]">
                    {item.quantity} عدد ×{item.price.toLocaleString()} تومان
                  </p>
                </div>
              </div>
            ))}
            {cartItems.length > 4 && (
              <p className="text-center text-[11px] text-[var(--text-gary)]">
                و {cartItems.length - 4} کالای دیگر
              </p>
            )}
          </div>
          <div className="border-t border-[var(--sup-b)] p-3">
            <div className="mb-2 flex items-center justify-between text-sm font-semibold">
              <span>جمع کل</span>
              <span>{total.toLocaleString()} تومان</span>
            </div>
            <button
              onClick={onGoToCheckout}
              className="block w-full rounded-xl bg-[var(--btn)] py-2 text-center text-sm font-medium text-white transition-all duration-200 hover:bg-[#1565c0] hover:shadow-[var(--card-hover-shadow)] hover:-translate-y-0.5 active:translate-y-0"
            >
              مشاهده سبد خرید
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPreview;
