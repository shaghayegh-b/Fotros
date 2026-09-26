import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useAxios } from "../../context/AxiosContaext/AxiosContaext";

function CategoryPromoCard({ img, title, description, url, filterName }) {
  const { funcAxios, setSortFilter, setOnlyAvailable, applyFilter } =
    useAxios();

  return (
    <Link
      to="/Fotros/Products"
      onClick={() => {
        localStorage.removeItem("products");
        localStorage.removeItem("productsFetchTime");
        funcAxios(url);
        setSortFilter("");
        setOnlyAvailable(false);
        applyFilter("", false, filterName);
      }}
      className="category-promo-card flex items-center gap-3 rounded-2xl bg-[var(--cartsm)] p-3 shadow-[var(--card-shadow)]"
    >
      <div className="media-box h-[110px] w-[38%] shrink-0 rounded-xl md:h-[130px]">
        <img src={img} alt={title} className="category-promo-card-img" />
      </div>
      <div className="flex h-[110px] w-full flex-col justify-between md:h-[130px]">
        <div>
          <p className="mb-1 font-semibold text-lg text-[var(--text)]">
            {title}
          </p>
          <p className="text-sm text-[var(--text-gary)]">{description}</p>
        </div>
        <span className="flex items-center justify-end gap-1 text-base font-medium text-[var(--btn)]">
          مشاهده محصولات
          <IoMdArrowRoundBack />
        </span>
      </div>
    </Link>
  );
}

export default CategoryPromoCard;
