import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { FaHeart } from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";
import Filter from "../../components/Filter/Filter";
import { useAxios } from "../../context/AxiosContaext/AxiosContaext";
import Footer from "../../components/Footer/Footer";
import Categorys from "../../components/Categorys/Categorys";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext/SearchContext";
import ModalAlert from "../../components/ModalAlert/ModalAlert";
import ProductsSkeleton from "../../components/SkeletonCard/ProductsSkeleton";
import ProductCard from "../../components/ProductCard/ProductCard";

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
  const { filteredProducts, loading, selectedCategory, funcAxios } =
    useAxios();
  const { searchedProducts, searchQuery } = useSearch();
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
        <h6 className="text-[var(--text-gary)] container-page pt-[22px] lg:pt-[15px] pb-[10px] md:pb-[5px] text-[85%] flex gap-[4px]">
          <Link to="/Fotros/">صفحه اصلی &gt; </Link>
          <span>
            {searchedProducts.length > 0
              ? `جستجو : ${searchQuery}`
              : selectedCategory}
          </span>
        </h6>
        <h2 className="text-[175%] font-[600] py-[10px] container-page md:py-[5px]">
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
            <div className="products grid gap-[10px] md:gap-[16px]  lg:grid-cols-6 md:grid-cols-3 grid-cols-2">
              {pagedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onNeedLogin={() => {
                    setModalMessage(
                      "برای اضافه کردن محصول به علاقه‌مندی‌ها باید وارد حساب کاربری خود شوید!"
                    );
                    setIsModalOpen(true);
                  }}
                />
              ))}
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
