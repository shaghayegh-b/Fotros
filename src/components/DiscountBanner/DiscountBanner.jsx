import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useAxios } from "../../context/AxiosContaext/AxiosContaext";

function DiscountBanner({ img, percent = 70 }) {
  const { funcAxios, setSortFilter, setOnlyAvailable, applyFilter } =
    useAxios();

  const goToDiscounted = () => {
    funcAxios(
      "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?sortBy=off&order=desc"
    );
    setSortFilter("");
    setOnlyAvailable(false);
    applyFilter("", false, "فروش ویژه");
  };

  return (
    <Link
      to="/Fotros/Products"
      onClick={goToDiscounted}
      className="discount-banner relative flex min-h-[170px] items-center gap-5 rounded-3xl bg-gradient-to-l from-[var(--cartsm)] via-[var(--cartsm)] to-transparent p-5 shadow-[var(--card-shadow)] md:min-h-[220px] md:p-8"
    >
      {/* دایره‌های تزئینی پشت زمینه */}
      <div className="deco-blob h-[180px] w-[180px] bg-[var(--btn)]/40 -left-10 -top-16" />
      <div className="deco-blob h-[140px] w-[140px] bg-red-400/25 right-1/3 bottom-[-60px]" />

      {/* بج درصد تخفیف - CSS واقعی، نه عکس بریده */}
      <div className="absolute left-4 top-4 z-1 flex -rotate-[14deg] flex-col items-center rounded-lg bg-white/90 px-3 py-1 shadow-md md:left-8 md:top-7">
        <span className="text-2xl font-extrabold leading-none text-red-600 md:text-4xl">
          {percent}%
        </span>
        <span className="text-[0.65rem] font-medium text-red-500">
          تخفیف
        </span>
      </div>

      <div className="relative z-1 h-[150px] w-[42%] shrink-0 md:h-[200px]">
        <img
          src={img}
          alt="فروش ویژه"
          className="discount-banner-img absolute bottom-[-31%] left-35 w-[40%]"
        />
      </div>

      <div className="relative z-1 flex w-full flex-col justify-center gap-2 md:gap-3">
        <p className="text-2xl font-bold tracking-tight text-[var(--text)] md:text-3xl">
          فروش ویژه
        </p>
        <p className="text-sm text-[var(--text-gary)] md:text-lg">
          تخفیف ویژه‌ی روزانه بر روی تمامی محصولات
        </p>
        <span className="discount-banner-cta mt-1 inline-flex w-fit items-center gap-1 rounded-lg bg-[var(--btn)] px-4 py-2 text-sm font-medium text-white md:px-5 md:py-2.5 md:text-base">
          مشاهده محصولات
          <IoMdArrowRoundBack />
        </span>
      </div>
    </Link>
  );
}

export default DiscountBanner;
