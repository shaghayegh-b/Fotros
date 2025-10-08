import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../AuthContext/AuthContext";

const AddressContext = createContext();

export function AddressProvider({ children }) {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);

  // 🌀 بارگذاری آدرس‌ها از localStorage
  useEffect(() => {
    if (!user) return;
    const stored = JSON.parse(localStorage.getItem(`addresses_${user.id}`)) || [];
    setAddresses(stored);
  }, [user?.id]);

  // ➕ افزودن آدرس
  const addAddress = (newAddress) => {
    if (!user) return;
    const updated = [...addresses, newAddress];
    setAddresses(updated);
    localStorage.setItem(`addresses_${user.id}`, JSON.stringify(updated));
  };

  // ✏️ ویرایش آدرس
  const updateAddress = (updated) => {
    const updatedList = addresses.map((addr) =>
      addr.id === updated.id ? updated : addr
    );
    setAddresses(updatedList);
    localStorage.setItem(`addresses_${user.id}`, JSON.stringify(updatedList));
  };

  // ❌ حذف آدرس
  const deleteAddress = (id) => {
    const updatedList = addresses.filter((addr) => addr.id !== id);
    setAddresses(updatedList);
    localStorage.setItem(`addresses_${user.id}`, JSON.stringify(updatedList));
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export const useAddress = () => useContext(AddressContext);
