import React, { memo, useEffect } from "react";
import { MdClose } from "react-icons/md";

function DeleteAddressModal({ open, onClose, onConfirm, address }) {
  //   وقتی مودال باز است، می‌توان body را lock کرد
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // قفل اسکرول
    } else {
      document.body.style.overflow = "auto"; // بازگرداندن
    }
    return () => {
      document.body.style.overflow = "auto"; // cleanup
    };
  }, [open]);
console.log(address)
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#f5f5f5] flex flex-col gap-[8px] w-[95%] md:w-[90%] max-w-md max-h-[98vh] p-6 rounded-xl shadow-lg overflow-y-auto scrollbar-hide"
      >
        <MdClose
          onClick={onClose}
          className="cursor-pointer text-[22px] self-end"
        />
        <h2 className="text-lg font-semibold text-[125%]">
          میخواهید این ادرس را حذف کنید؟
        </h2>
        <p className="text-gray-600">
          {address?.fullAddress || "آدرس موجود نیست"}{" "}
        </p>
        {/* دکمه‌ها */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between mt-4 gap-[8px] ">
          <button
            onClick={onClose}
            type="button"
            className="px-[30px] py-[8px] md:py-[7px] font-semibold text-[105%] md:text-[120%]  w-full lg:w-[50%]  text-[#0e73cc] border border-[#1e88e5] rounded-lg bg-[white]"
          >
            انصراف
          </button>
          <button
            onClick={onConfirm}
            type="submit"
            className="px-[30px] py-[8px] md:py-[7px] font-semibold text-[105%] md:text-[120%]  w-full lg:w-[50%] bg-[#1e88e5] text-white rounded-lg"
          >
            حذف آدرس
          </button>
        </div>
      </div>
    </div>
  );
}
export default memo(DeleteAddressModal);
