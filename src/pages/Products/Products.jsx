import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoBookmarkSharp } from "react-icons/io5";

import Navbar from "../../components/Navbar/Navbar";
import Filter from "../../components/Filter/Filter";
import { useAxios } from "../../context/AxiosContaext/AxiosContaext";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import { useFav } from "../../context/FavProvider/FavProvider";
import Categorys from "../../components/Categorys/Categorys";
import { Link } from "react-router-dom";

function Products() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const [pagedProducts, setPagedProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 15; // تعداد محصول در هر صفحه
  const { addToFav, removeFromFav, favoriteItems } = useFav();
  const {
    filteredProducts,
    loading,
    selectedCategory,
    funcAxios
  } = useAxios();

  useEffect(() => {
  const localProducts = JSON.parse(localStorage.getItem("products")) || [];
  if (localProducts.length === 0) {
    funcAxios(
      "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?sortBy=idsortby&order=desc"
    );
  }
}, []);
  useEffect(() => {
    if (Array.isArray(filteredProducts)) {
      const offset = currentPage * limit;
      const pagedData = filteredProducts.slice(offset, offset + limit);
      setPagedProducts(pagedData);
      setPageCount(Math.ceil(filteredProducts.length / limit));
    }
  }, [filteredProducts, currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <>
      <Navbar />
      <div className="h-16  "></div>
      <div className="pb-[90px]">
        <h2 className="text-[175%] font-[600] md:px-[60px] p-[10px] md:py-[20px]">
          {selectedCategory}
        </h2>
        <div
          className={`${
            selectedCategory == "همه محصولات" || selectedCategory == "مانتو"
              ? "hidden md:block"
              : ""
          }`}
        >
          <Categorys resetPage={() => setCurrentPage(0)} />
        </div>
        <div>
          <Filter resetPage={() => setCurrentPage(0)} />
        </div>
        <div className="md:pt-[15px] pt-[10px]">
          {/* Skeleton Loader */}
          {loading ? (
            <Loading />
          )  : filteredProducts.length === 0 ? (
  <p className="text-center text-gray-500 mt-10">
    هیچ محصولی در این دسته‌بندی فعلاً موجود نیست 😔
    <br/>
     <span className="flex gap-[5px] items-center justify-center">
        لطفاً کمی صبر کنید تا محصولات تازه اضافه شوند
      <FaHeart
    color="#1e88e5"
    className="m-[5px] mt-[10px] cursor-pointer"
    size={20}
  />
     </span>
  </p>
) : (
            <div className="pruducts grid gap-4  lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
              {pagedProducts.map((product) => {
                const isFav = favoriteItems.some(
                  (item) => item.id === product.id
                );

                return (
                  <div key={product.id} className="pruduct relative">
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
                      className=" md:h-[345px] h-[228px] rounded  p-[10px] pt-0 box-shadow flex flex-col justify-center items-center md:gap-[15px] gap-[9px] "
                    >
                      <img
                        src={product.img}
                        alt={product.title}
                        className="md:h-[220px] h-[140px]"
                        loading="lazy"
                      />
                      <p className="font-semibold self-start text-[110%] ">
                        {product.title}
                      </p>
                      <div className=" self-end flex items-baseline md:gap-[10px] gap-[6px]">
                        {product.off > 0 && (
                          <span className=" text-gray-800 md:text-[95%] text-[85%] line-through">
                            {product.price.toLocaleString()}
                          </span>
                        )}

                        <p className="flex gap-[3px] text-red-800 font-bold text-[110%]">
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
          )}

          {/* React Paginate */}
          <div className="mt-[35px]">
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              containerClassName="flex justify-center items-center gap-[5px] mt-4"
              pageClassName="px-[10px] py-[3px] border border-[#bab7b7] rounded"
              activeClassName="bg-[#d2d1d2b0] "
              previousClassName={
                currentPage === 0
                  ? "disabled px-[10px] py-[3px]   border border-[#bab7b7] rounded opacity-50 cursor-not-allowed"
                  : "px-[10px] py-[3px] border border-[#bab7b7] rounded"
              }
              nextClassName={
                currentPage === pageCount - 1
                  ? "disabled px-[10px] py-[3px]   border border-[#bab7b7]  rounded opacity-50 cursor-not-allowed"
                  : "px-[10px] py-[3px]  border border-[#bab7b7]  rounded"
              }
              forcePage={currentPage}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Products;
