import { Listbox } from "@headlessui/react";
import { useAxios } from "../../context/AxiosContaext/AxiosContaext";
import { Link } from "react-router-dom";
import { memo } from "react";
import { FaHome } from "react-icons/fa";

function Filter({ resetPage }) {
  const {
    applyFilter,
    sortFilter,
    setSortFilter,
    onlyAvailable,
    setOnlyAvailable,
    selectedCategory,
  } = useAxios();

  const handleSortChange = (selectedFilter) => {
    const value = selectedFilter.id; // چون filters شامل {id, label} هست
    setSortFilter(value);
    applyFilter(value, onlyAvailable, selectedCategory);
    resetPage(); // صفحه رو صفر می‌کنیم
  };

  const handleAvailableClick = () => {
    const newAvailable = !onlyAvailable;
    setOnlyAvailable(newAvailable);
    applyFilter(sortFilter, newAvailable, selectedCategory);
    resetPage(); // صفحه رو صفر می‌کنیم
  };
  const filters = [
    { id: "", label: "مرتب سازی بر اساس" },
    { id: "cheapest", label: "ارزان‌ترین" },
    { id: "mostExpensive", label: "گران‌ترین" },
    { id: "mostDiscount", label: "بیشترین تخفیف" },
    { id: "newest", label: "جدیدترین" },
  ];
  const selected = filters.find((f) => f.id === sortFilter) || filters[0];

  return (
    <div className="flex justify-between items-center px-[9px] md:px-[20px] py-[10px]">
      <div className="my-filter h-10 flex gap-1 md:px-2 justify-right items-center text-[95%]">
        <button
          onClick={handleAvailableClick}
          className={`
            px-3 py-1 rounded-xl shadow-sm transition min-w-32 focus:ring-1 focus:ring-white
          ${
            onlyAvailable ? "bg-[#81bcf0] border-[3px] border-[#97a7b461]" : ""
          }`}
        >
          محصولات موجود
        </button>
        <Listbox value={sortFilter} onChange={handleSortChange}>
          {({ open }) => (
            <div className="relative">
              <Listbox.Button
                className={`${
                  open ? "border-[1px] border-[#97a7b461]" : ""
                                }  flex justify-between items-center gap-[4px] text-right w-full rounded-xl px-3 py-1 shadow-sm transition focus:outline-none focus:ring-1 focus:ring-white`}
              >
                <span className={`w-[90%] whitespace-nowrap tracking-tighter`}>
                  {selected.label}
                </span>

                <i
                  className={`fa fa-chevron-up md:inline-block hidden  ${
                    open ? "rotate-[180deg]" : ""
                  } transition-all duration-300 text-[85%]`}
                ></i>
              </Listbox.Button>

              <Listbox.Options className="absolute bg-white mt-1 w-full text-[90%] rounded-sm border-[2px] border-[#97a7b461] z-3 focus:outline-none">
                {filters.map((filter) => (
                  <Listbox.Option
                    key={filter.id}
                    value={filter}
                    className={({ active }) =>
                      `px-3 py-1 cursor-pointer whitespace-nowrap ${
                        active
                          ? "bg-[#81bcf0] border-[3px] border-[#97a7b461]"
                          : ""
                      }`
                    }
                  >
                    {filter.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          )}
        </Listbox>
      </div>
      <Link to="/Fotros/" className="hidden md:flex gap-[2px] items-center whitespace-nowrap text-[85%]">صفحه اصلی<FaHome/></Link>
    </div>
  );
}
export default memo(Filter);
