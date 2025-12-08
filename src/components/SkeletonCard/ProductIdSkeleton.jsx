import React from "react";
import "./SkeletonCard.css"

const ProductIdSkeleton = () => {
  return (
    <div className="ProductId p-2 flex flex-col gap-8 animate-pulse">
      <div className="md:w-[88%] w-full flex md:flex-row flex-col justify-center items-start md:gap-16 gap-5 md:px-10 px-4">
        {/* عکس محصول */}
        <div className="flex flex-col gap-5 justify-between self-center items-center md:w-1/4 w-full">
          <div className="bg-[var(--cart)] dark:bg-[var(--cartsm)] w-full h-[12rem] rounded-lg" />
          <div className="flex gap-2 w-full justify-start">
            <div className="bg-[var(--cart)] dark:bg-[var(--cartsm)] w-16 h-16 rounded-lg" />
            <div className="bg-[var(--cart)] dark:bg-[var(--cartsm)] w-16 h-16 rounded-lg" />
            <div className="bg-[var(--cart)] dark:bg-[var(--cartsm)] w-16 h-16 rounded-lg" />
          </div>
        </div>
        {/* توضیحات */}
        <div className="md:w-2/3 w-full flex flex-col gap-7">
          <div className="bg-[var(--cart)] dark:bg-[var(--cartsm)] h-8 w-1/2 rounded" />
          <div className="flex md:flex-row flex-col md:gap-4 gap-2 items-baseline">
            <div className="bg-[var(--cart)] dark:bg-[var(--cartsm)] h-6 w-20 rounded" />
            <div className="bg-[var(--cart)] dark:bg-[var(--cartsm)] h-6 w-12 rounded" />
          </div>
          <div className="flex gap-2 items-center">
            <div className="bg-[var(--cart)] dark:bg-[var(--cartsm)] h-6 w-16 rounded" />
            <div className="bg-[var(--cart)] dark:bg-[var(--cartsm)] h-6 w-16 rounded" />
          </div>
          <div className="flex gap-2 items-center">
            <div className="bg-[var(--cart)] dark:bg-[var(--cartsm)] h-6 w-12 rounded" />
            <div className="bg-[var(--cart)] dark:bg-[var(--cartsm)] h-6 w-12 rounded" />
          </div>
          <div className="flex gap-2 items-center">
            <div className="bg-[var(--btn)] dark:bg-[var(--btn)] h-9 w-full rounded" />
          </div>
        </div>
      </div>

      {/* مشخصات و نظرات */}
      <div className="md:mx-10 mx-4 my-8 flex flex-col gap-4">
        <div className="bg-[var(--cart)] dark:bg-[var(--cartsm)] h-10 w-full rounded" />
        <div className="bg-[var(--cart)] dark:bg-[var(--cartsm)] h-36 w-full rounded" />
        <div className="bg-[var(--cart)] dark:bg-[var(--cartsm)] h-10 w-full rounded" />
      </div>
    </div>
  );
};

export default ProductIdSkeleton;
