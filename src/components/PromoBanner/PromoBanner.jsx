import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useAxios } from "../../context/AxiosContaext/AxiosContaext";

/**
 * بنر تبلیغاتی عمومی با چند وریانت رنگی، برای نمایش بنرهای متفاوت در صفحه اصلی.
 * ساختار مشابه DiscountBanner ولی بدون بج درصد، قابل استفاده برای هر پیام تبلیغاتی.
 */
const VARIANTS = {
  blue: "from-[var(--cartsm)] via-[var(--cartsm)] to-transparent",
  dark: "from-[var(--btn)]/25 via-[var(--btn)]/10 to-transparent",
  soft: "from-[var(--cartcategory)] via-[var(--cartcategory)] to-transparent",
};

function PromoBanner({
  img,
  title,
  description,
  ctaText = "مشاهده محصولات",
  url,
  filterName,
  variant = "blue",
}) {
  const { funcAxios, setSortFilter, setOnlyAvailable, applyFilter } =
    useAxios();

  return (
    <Link
      to="/Fotros/Products"
      onClick={() => {
        funcAxios(url);
        setSortFilter("");
        setOnlyAvailable(false);
        applyFilter("", false, filterName);
      }}
      className={`promo-banner relative flex items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-l ${VARIANTS[variant]} p-4 shadow-[var(--card-shadow)] md:p-6`}
    >
      <div className="media-box h-[110px] w-[40%] shrink-0 md:h-[150px]">
        <img src={img} alt={title} className="promo-banner-img" />
      </div>

      <div className="flex w-full flex-col justify-center gap-2">
        <p className="text-xl font-bold tracking-tight text-[var(--text)] md:text-2xl">
          {title}
        </p>
        <p className="text-sm text-[var(--text-gary)] md:text-base">
          {description}
        </p>
        <span className="promo-banner-cta mt-1 inline-flex w-fit items-center gap-1 rounded-lg bg-[var(--btn)] px-4 py-2 text-sm font-medium text-white">
          {ctaText}
          <IoMdArrowRoundBack />
        </span>
      </div>
    </Link>
  );
}

export default PromoBanner;
