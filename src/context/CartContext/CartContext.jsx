import React, { createContext, useContext, useState, useEffect } from "react";

// 1. ساخت Context
const CartContext = createContext();

// 2. ساخت Provider
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  // ذخیره سبد خرید در localStorage هر بار که تغییر کرد
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // اضافه کردن کالا به سبد (با در نظر گرفتن رنگ و سایز)
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => {
        if (item.idsortby !== product.idsortby) return false;

        const sameColor =
          (!item.selectedColor && !product.selectedColor) ||
          (item.selectedColor?.code === product.selectedColor?.code);

        const sameSize =
          (!item.selectedSize && !product.selectedSize) ||
          (item.selectedSize === product.selectedSize);

        return sameColor && sameSize;
      });

      if (existingItem) {
        return prevItems.map((item) =>
          item.idsortby === product.idsortby &&
          item.selectedColor?.code === product.selectedColor?.code &&
          item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, product];
      }
    });
  };

  // حذف کالا (idsortby + رنگ + سایز)
  function removeFromCart(idsortby, colorCode, size) {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.idsortby === idsortby &&
            item.selectedColor?.code === colorCode &&
            item.selectedSize === size
          )
      )
    );
  }

  // افزایش تعداد کالا
  function increase(idsortby, colorCode, size) {
    setCartItems((prev) =>
      prev.map((item) => {
        if (
          item.idsortby === idsortby &&
          item.selectedColor?.code === colorCode &&
          item.selectedSize === size
        ) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  }

  // کاهش تعداد کالا (اگر صفر شد حذفش کن)
  function decrease(idsortby, colorCode, size) {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (
            item.idsortby === idsortby &&
            item.selectedColor?.code === colorCode &&
            item.selectedSize === size
          ) {
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

  // تعداد کل کالاها
  const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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

// 3. هوک آماده استفاده
export function useCart() {
  return useContext(CartContext);
}
