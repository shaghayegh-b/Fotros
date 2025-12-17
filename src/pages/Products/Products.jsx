import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoBookmarkSharp } from "react-icons/io5";

import Navbar from "../../components/Navbar/Navbar";
import Filter from "../../components/Filter/Filter";
import { useAxios } from "../../context/AxiosContaext/AxiosContaext";
import Footer from "../../components/Footer/Footer";
import { useFav } from "../../context/FavProvider/FavProvider";
import Categorys from "../../components/Categorys/Categorys";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext/SearchContext";
import { useAuth } from "../../context/AuthContext/AuthContext";
import ModalAlert from "../../components/ModalAlert/ModalAlert";
import ProductsSkeleton from "../../components/SkeletonCard/ProductsSkeleton";

function Products() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();
  const [pagedProducts, setPagedProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 15; // تعداد محصول در هر صفحه
  const { addToFav, removeFromFav, favoriteItems } = useFav();
  const { filteredProducts, loading, selectedCategory, funcAxios } = useAxios();
  const { searchedProducts, searchQuery } = useSearch();
  const { isLoggedIn } = useAuth();
  const productsToShow =
    searchedProducts.length > 0 ? searchedProducts : filteredProducts;

  useEffect(() => {
    const localProducts = JSON.parse(localStorage.getItem("products")) || [];
    if (localProducts.length === 0) {
      funcAxios(
        "https://686b9bdee559eba90873470f.mockapi.io/ap/bazrafkan-store/products?sortBy=idsortby&order=desc"
      );
    }
  }, []);
  useEffect(() => {
    setCurrentPage(0);
  }, [productsToShow]);

  useEffect(() => {
    const data = Array.isArray(productsToShow) ? productsToShow : [];
    const offset = currentPage * limit;
    const pagedData = data.slice(offset, offset + limit);
    setPagedProducts(pagedData);
    setPageCount(Math.ceil(data.length / limit));
  }, [productsToShow, currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <>
      <Navbar />
      <div className="h-10 lg:h-16"></div>
      <div className="pb-[80px]">
        <h6 className="text-[var(--text-gary)] px-[15px] md:px-[40px] pt-[22px] lg:pt-[15px] pb-[10px] md:pb-[5px] text-[85%] flex gap-[4px]">
          <Link to="/Fotros/">صفحه اصلی &gt; </Link>
          <span>
            {searchedProducts.length > 0
              ? `جستجو : ${searchQuery}`
              : selectedCategory}
          </span>
        </h6>
        <h2 className="text-[175%] font-[600] py-[10px] px-[14px] md:px-[30px] md:py-[5px]">
          {searchedProducts.length > 0
            ? `جستجو : ${searchQuery}`
            : selectedCategory}
        </h2>

        <Categorys resetPage={() => setCurrentPage(0)} />
        <div>
          <Filter resetPage={() => setCurrentPage(0)} />
        </div>
        <div className="md:pt-[15px] pt-[10px] px-[5px]">
          {/* Skeleton Loader */}
          {loading ? (
            <div className="products grid gap-[5px] md:gap-[9px] lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductsSkeleton key={i} />
              ))}
            </div>
          ) : productsToShow.length === 0 ? (
            <p className="text-center text-[var(--text-gary)] mt-10">
              هیچ محصولی در این دسته‌بندی فعلاً موجود نیست !
              <br />
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
            <div className="products grid gap-[5px] md:gap-[9px]  lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
              {pagedProducts.map((product) => {
                const isFav = favoriteItems.some(
                  (item) => item.id === product.id
                );

                return (
                  <div key={product.id} className="product relative">
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
                          onClick={() => {
                            if (!isLoggedIn) {
                              setModalMessage(
                                "برای اضافه کردن محصول به علاقه‌مندی‌ها باید وارد حساب کاربری خود شوید!"
                              );
                              setIsModalOpen(true);
                            }
                            addToFav(product);
                          }}
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
                          <span className=" text-[var(--text-gray)] md:text-[95%] text-[85%] line-through">
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
      <ModalAlert
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        message={modalMessage}
        timer={4000} // مدت زمان نوار progress
        buttons={[
          {
            label: "ورود به حساب کاربری",
            type: "yes",
            onClick: () => {
              setIsModalOpen(false);
              navigate("/Fotros/login");
            },
          },
          {
            label: "بیخیال",
            type: "no",
            onClick: () => {
              setIsModalOpen(false);
            },
          },
        ]}
      />
    </>
  );
}
export default Products;
