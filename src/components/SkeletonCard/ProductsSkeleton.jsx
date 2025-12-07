import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoBookmarkSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./SkeletonCard.css"

const ProductsSkeleton = ({ isDarkMode }) => {
  return (
    <div className="product relative animate-pulse">
      {/* تصویر و محتوا */}
      <Link
        to="#"
        className={`md:h-[345px] h-[228px] rounded p-[10px] pt-0 flex flex-col justify-center items-center md:gap-[15px] gap-[9px] ${
          isDarkMode
            ? "bg-[var(--product)] shadow-[var(--card-shadow)]"
            : "bg-[var(--product)] shadow-[var(--card-shadow)]"
        }`}
      >
        <div className="md:h-[220px] h-[140px] w-full bg-[var(--cartsm)] rounded"></div>
        <div className="w-full h-5 bg-[var(--cartsm)] rounded mt-2"></div>
        <div className="self-end w-full h-5 mt-1 flex gap-2">
          <div className="w-1/2 h-5 bg-[var(--cartsm)] rounded"></div>
          <div className="w-1/3 h-5 bg-[var(--cartsm)] rounded"></div>
        </div>
      </Link>
    </div>
  );
};

export default ProductsSkeleton;
