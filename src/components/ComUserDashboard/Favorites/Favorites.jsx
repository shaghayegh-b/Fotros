import { memo, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoBookmarkSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useFav } from "../../../context/FavProvider/FavProvider";
import { useAxios } from "../../../context/AxiosContaext/AxiosContaext";
import Loading from "../../Loading/Loading";

function Favorites() {
  const {addToFav, favoriteItems, removeFromFav } = useFav();
  const { allProducts, loading: productsLoading } = useAxios();
  const [pagedFavorites, setPagedFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const limit = 12;

  // وقتی favoriteItems یا allProducts تغییر کنند، علاقه‌مندی‌ها با جزئیات ساخته می‌شوند
  useEffect(() => {
    if (!allProducts.length || !favoriteItems.length) {
      setPagedFavorites([]);
      setPageCount(0);
      return;
    }

    const favWithDetails = favoriteItems
      .map((fav) => {
        const product = allProducts.find(
          (p) => p.idsortby.toString() === fav.id.toString()
        );
        if (product) {
          return { ...product, favId: fav.id }; // favId برای کلید یکتا
        }
        return null;
      })
      .filter(Boolean);

    const offset = currentPage * limit;
    setPagedFavorites(favWithDetails.slice(offset, offset + limit));
    setPageCount(Math.ceil(favWithDetails.length / limit));
  }, [favoriteItems, allProducts, currentPage]);

  const handlePageClick = (event) => setCurrentPage(event.selected);
useEffect(() => {
  setCurrentPage(0);
}, [favoriteItems, allProducts]);

  return (
    <div className="flex flex-col">
      <h2 className="py-[10px] font-bold text-[130%]">علاقه‌مندی‌ها</h2>
      {/* loading */}
      {productsLoading&& <Loading/>}
      {/* اگر محصولی وجود نداشت */}
      { !productsLoading||pagedFavorites.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          هیچ محصولی در علاقه‌مندی‌ها موجود نیست 😔
        </p>
      )}
      <div className="pruducts grid gap-x-[10px] gap-y-[7px] lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
        {pagedFavorites.map((product) => {
          const isFav = favoriteItems.some((item) => item.id === product.id);
          return (
            <div
              key={`${product.idsortby}-${product.favId}`}
              className="product relative"
            >
              <div className="md:px-[10px] px-[2px] flex justify-between absolute z-1 top-0 w-full opacity-80 ">
                {isFav ? (
                  <FaHeart
                    onClick={() => removeFromFav(product.id)}
                    color="#bc0000"
                    className="m-[5px] mt-[10px] cursor-pointer"
                    size={20}
                  />
                ) : (
                  <FaRegHeart
                    onClick={() => addToFav(product)}
                    className="m-[5px] mt-[10px] cursor-pointer"
                    size={20}
                  />
                )}
                {product.off > 0 && (
                  <div className="relative ">
                    <IoBookmarkSharp
                      color="#bc0000"
                      size={47}
                    ></IoBookmarkSharp>
                    <span className="absolute top-[15%] left-[25%] text-[80%] text-white">
                      %{product.off}
                    </span>
                  </div>
                )}
              </div>

              <Link
                to={`/Fotros/Products/${product.idsortby}`}
                className=" md:h-[345px] h-[228px] rounded px-[6px] py-[10px] pt-0 box-shadow flex flex-col justify-center items-center md:gap-[15px] gap-[9px] "
              >
                <div className=" h-[140px] md:h-[220px] lg:h-[180px] "><img
                  src={product.img}
                  alt={product.title}
                  className=" h-full"
                  loading="lazy"
                /></div>

                <p className="font-semibold self-start text-[110%] ">
                  {product.title}
                </p>
                <div className=" self-end flex flex-col  md:flex-row lg:flex-col items-baseline md:gap-[10px] gap-[3px]">
                  {product.off > 0 && (
                    <span className=" text-gray-800 md:text-[95%] text-[85%] line-through">
                      {product.price.toLocaleString()}
                    </span>
                  )}

                  <p className="flex gap-[3px] text-red-800 font-bold text-[100%] md:text-[110%]">
                    {(
                      product.price -
                      (product.price * product.off) / 100
                    ).toLocaleString()}
                    <span>تومان</span>
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {pageCount > 1 && (
        <div className="mt-[35px]">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="<"
            containerClassName="flex justify-center items-center gap-[5px] mt-4"
            pageClassName="px-[10px] py-[3px] border border-[#bab7b7] rounded"
            activeClassName="bg-[#d2d1d2b0]"
            previousClassName={
              currentPage === 0
                ? "disabled px-[10px] py-[3px] border border-[#bab7b7] rounded opacity-50 cursor-not-allowed"
                : "px-[10px] py-[3px] border border-[#bab7b7] rounded"
            }
            nextClassName={
              currentPage === pageCount - 1
                ? "disabled px-[10px] py-[3px] border border-[#bab7b7] rounded opacity-50 cursor-not-allowed"
                : "px-[10px] py-[3px] border border-[#bab7b7] rounded"
            }
            forcePage={currentPage}
          />
        </div>
      )}
    </div>
  );
}

export default memo(Favorites);
