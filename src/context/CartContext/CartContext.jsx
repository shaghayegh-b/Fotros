import React, { createContext, useContext, useState, useEffect } from "react";

// 1. ساخت Context
const CartContext = createContext();

// 2. ساخت Provider
export function CartProvider({ children }) {
  // اینجا state سبد خرید رو نگه می‌داریم
  const [cartItems, setCartItems] = useState(() => {
    // اگر میخوایم سبد رو تو localStorage نگه داریم
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  // ذخیره سبد خرید در localStorage هر بار که تغییر کرد
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // اضافه کردن کالا به سبد
  const addToCart = (product) => {
    setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => {
            if (item.id !== product.id) return false;

            // هر دو selectedColor دارند، کد رنگ را مقایسه کن
            if (item.selectedColor && product.selectedColor) {
              return item.selectedColor.code === product.selectedColor.code;
            }

            // هر دو selectedColor ندارند (هر دو null یا undefined هستند)
            if (!item.selectedColor && !product.selectedColor) {
              return true;
            }

            return false;
          });


      if (existingItem) {
        // اگر همین محصول با همین رنگ قبلاً توی سبد هست، فقط تعدادشو زیاد کن
        return prevItems.map((item) =>
          item.id === product.id &&
          item.selectedColor?.code === product.selectedColor?.code
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // محصول جدید با رنگ جدید
        return [...prevItems, product];
      }
    });
  };

  // حذف کالا از سبد بر اساس id
  function removeFromCart(id, colorCode) {
    setCartItems((prev) =>
      prev.filter((item) => {
        if (colorCode === undefined) {
          // وقتی رنگ مشخص نشده (undefined)، فقط آیتم‌هایی که رنگ ندارن رو حذف کن
          return !(item.id === id && !item.selectedColor);
        } else {
          // حذف موردی که id و رنگ برابر باشه
          return !(item.id === id && item.selectedColor?.code === colorCode);
        }
      })
    );
  }



  // افزایش تعداد کالا
function increase(id, colorCode) {
  setCartItems((prev) =>
    prev.map((item) => {
      if (item.id !== id) return item;

      if (item.selectedColor && colorCode) {
        return item.selectedColor.code === colorCode ? { ...item, quantity: item.quantity + 1 } : item;
      }

      if (!item.selectedColor && !colorCode) {
        return { ...item, quantity: item.quantity + 1 };
      }

      return item;
    })
  );
}



  // کاهش تعداد کالا (اگر به صفر رسید حذفش کن)
  function decrease(id, colorCode) {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;

          if (item.selectedColor && colorCode) {
            return item.selectedColor.code === colorCode
              ? { ...item, quantity: item.quantity - 1 }
              : item;
          }

          if (!item.selectedColor && !colorCode) {
            return { ...item, quantity: item.quantity - 1 };
          }

          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  }



  // پاک کردن کل سبد خرید
  function clearCart() {
    setCartItems([]);
  }

  // تعداد کل کالاها (مجموع quantity ها)
  const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // این آبجکت رو به همه کامپوننت‌ها میدیم
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increase,
        decrease,
        clearCart,
        quantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 3. هوک آماده استفاده برای راحتی
export function useCart() {
  return useContext(CartContext);
}
