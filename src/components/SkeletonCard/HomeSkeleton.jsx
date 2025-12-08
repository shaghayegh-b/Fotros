import React from "react";

export default function HomeSkeleton() {
  return (
    <div className="animate-pulse">
      {/* --- فاصله نوار بالایی --- */}
      <div className="main1">

        {/* header */}
        <div className="flex flex-col-reverse md:flex-row-reverse gap-[10px]   mt-[10px] px-[16px] lg:px-[75px]">
          {/* --- بخش هدر (عکس‌ها و باکس‌ها) --- */}
          <div className="flex-1 flex mt-[10px] px-[16px] lg:px-[75px] flex-row-reverse gap-4">
            {/* ستون راست */}
            <div className="flex-1 flex flex-col-reverse gap-4">
              {/* باکس رضایت مشتری */}
              <div className="bg-[var(--cartsm)] rounded-2xl p-4 h-[120px] md:h-[150px]">
                <div className="h-5 w-16 bg-[var(--cart)] rounded mb-2"></div>
                <div className="h-8 w-full bg-[var(--cart)] rounded"></div>
              </div>

              {/* محصول 1 */}
              <div className="bg-[var(--cart)] rounded-2xl h-[200px] md:h-[260px]"></div>
            </div>

            {/* ستون چپ */}
            <div className="flex-1 flex flex-col-reverse gap-4">
              {/* محصول 2 */}
              <div className="bg-[var(--cart)] rounded-2xl h-[200px] md:h-[260px]"></div>

              {/* تنوع محصول */}
              <div className="bg-[var(--cartsm)] rounded-2xl p-4 h-[120px] md:h-[150px]">
                <div className="h-5 w-16 bg-[var(--cart)] rounded mb-2"></div>
                <div className="h-8 w-full bg-[var(--cart)] rounded"></div>
              </div>
            </div>
          </div>

          {/* --- فاصله وسط موبایل --- */}
 <div className="h-[2rem] md:h-[6rem] relative md:hidden">

            </div>
          {/* --- بخش بنر عنوان و دکمه‌ها --- */}
          <div className="flex-1 mx-[9px] flex flex-col justify-center items-center mt-6">
            <div className="h-4 w-48 bg-[var(--cartsm)] rounded mb-4"></div>
            <div className="h-4 w-55 bg-[var(--cartsm)] rounded mb-4"></div>

            <div className="h-12 w-[90%] md:w-[60%] bg-[var(--btn)]/40 rounded-xl mb-3"></div>
            <div className="h-12 w-[90%] md:w-[60%] bg-[var(--cart)] rounded-xl"></div>
          </div>
        </div>
        {/* --- فاصله --- */}
        <div className="h-[3rem] md:h-[4rem]"></div>

        {/* --- دسته بندی --- */}
        <div className="px-3 mb-4">
          <h3 className="font-bold text-[140%] px-[15px] mb-3">
            <span className="block h-6 w-40 bg-[var(--cartsm)] rounded"></span>
          </h3>
          <div className="flex gap-3 overflow-x-hidden">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="min-w-[80px] h-[80px] md:min-w-[100px] md:h-[100px] bg-[var(--cart)] rounded-xl"
              ></div>
            ))}
          </div>
        </div>
   {/* --- اسلایدر بنرها در بالا --- */}
        <div className="pb-[5px] pt-[13px] px-[10px] flex gap-[10px]">
          <div className="w-full h-[90px] lg:h-[180px] bg-[var(--cartsm)] rounded-xl"></div>
          <div className="w-full h-[90px] lg:h-[180px] bg-[var(--cartsm)] rounded-xl"></div>
        </div>
        <div className="h-[3rem]"></div>

        {/* --- بنر تخفیفات --- */}
        <div className="m-[15px] p-[10px] mx-[20px] md:mx-[50px] bg-[var(--cartsm)] h-[180px] md:h-[200px] rounded-2xl flex">
          <div className="h-full w-[30%] bg-[var(--cart)] rounded-xl"></div>

          <div className="flex-1 px-4 flex flex-col justify-center">
            <div className="h-5 w-28 bg-[var(--cart)] rounded mb-3"></div>
            <div className="h-4 w-40 bg-[var(--cart)] rounded mb-1"></div>
            <div className="h-4 w-32 bg-[var(--cart)] rounded"></div>
          </div>
        </div>

        <div className="h-[3rem]"></div>

        {/* --- اسلایدر محصولات جدید --- */}
        <div className="px-3 mb-4">
          <div className="h-6 w-40 bg-[var(--cartsm)] rounded mb-3"></div>
          <div className="flex gap-3 overflow-x-hidden">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="min-w-[200px] h-[300px] bg-[var(--cart)] rounded-xl"
              ></div>
            ))}
          </div>
        </div>
        <div className="h-[3rem]"></div>

        {/* --- ست ها --- */}
        <h2 className="font-bold text-[140%] px-[14px] mb-3">
          <span className="block h-6 w-32 bg-[var(--cartsm)] rounded"></span>
        </h2>

        <div className="px-[8px] grid grid-cols-1 md:grid-cols-2 gap-[10px]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-[var(--cartsm)] rounded-2xl h-[150px] lg:h-[200px] p-4 flex gap-[20px]"
            >
              <div className="w-[45%] bg-[var(--cart)] rounded-xl"></div>
              <div className="flex-1 pl-3 flex flex-col justify-between">
                <div>
                  <div className="h-5 w-28 bg-[var(--cart)] rounded mb-2"></div>
                  <div className="h-4 w-36 bg-[var(--cart)] rounded"></div>
                </div>
                <div className="h-4 w-24 bg-[var(--cart)] rounded self-end"></div>
              </div>
            </div>
          ))}
        </div>

        {/* --- فاصله فوتر --- */}
        <div className="h-[4rem]"></div>
      </div>
      {/* --- فوتر --- */}
      <div className="w-full h-[360px] bg-[var(--footer)]"></div>
    </div>
  );
}
