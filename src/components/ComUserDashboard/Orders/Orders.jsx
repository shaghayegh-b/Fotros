import { memo, useEffect, useState } from "react";
import OrderTableMd from "./OrderTableMd";
import OrderTableMobile from "./OrderTableMobile";

function Orders() {
  const [activeOrderTab, setActiveOrderTab] = useState("all");
  const orders = [
    {
      id: 1,
      orderNumber: "145632",
      date: "1402/07/10",
      price: "850,000",
      status: "pending",
    },
    {
      id: 2,
      orderNumber: "145633",
      date: "1402/07/12",
      price: "1,200,000",
      status: "delivered",
    },
    {
      id: 3,
      orderNumber: "145634",
      date: "1402/07/15",
      price: "600,000",
      status: "canceled",
    },
    {
      id: 4,
      orderNumber: "145633",
      date: "1402/07/12",
      price: "1,200,000",
      status: "delivered",
    },
    {
      id: 5,
      orderNumber: "145633",
      date: "1402/07/12",
      price: "1,200,000",
      status: "delivered",
    },
    {
      id: 6,
      orderNumber: "145632",
      date: "1402/07/10",
      price: "850,000",
      status: "delivered",
    },
    {
      id: 7,
      orderNumber: "145633",
      date: "1402/07/12",
      price: "1,200,000",
      status: "delivered",
    },
    {
      id: 8,
      orderNumber: "145634",
      date: "1402/07/15",
      price: "600,000",
      status: "delivered",
    },
    {
      id: 9,
      orderNumber: "145633",
      date: "1402/07/12",
      price: "1,200,000",
      status: "delivered",
    },
    {
      id: 10,
      orderNumber: "145633",
      date: "1402/07/12",
      price: "1,200,000",
      status: "delivered",
    },
    {
      id: 11,
      orderNumber: "145632",
      date: "1402/07/10",
      price: "850,000",
      status: "canceled",
    },
    {
      id: 12,
      orderNumber: "145633",
      date: "1402/07/12",
      price: "1,200,000",
      status: "canceled",
    },
    {
      id: 13,
      orderNumber: "145634",
      date: "1402/07/15",
      price: "600,000",
      status: "canceled",
    },
    {
      id: 14,
      orderNumber: "145633",
      date: "1402/07/12",
      price: "1,200,000",
      status: "delivered",
    },
    {
      id: 15,
      orderNumber: "145633",
      date: "1402/07/12",
      price: "1,200,000",
      status: "delivered",
    },
  ];
  const tabs = [
    { id: "all", label: "همه سفارش‌ها" },
    { id: "pending", label: "در حال ارسال" },
    { id: "delivered", label: "ارسال شده" },
    { id: "canceled", label: "لغو شده" },
  ];
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // کمتر از md در Tailwind
        setItemsPerPage(15);
      } else {
        setItemsPerPage(5);
      }
    };

    handleResize(); // مقدار اولیه
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // فیلتر بر اساس تب
  const filteredOrders =
    activeOrderTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeOrderTab);
  // پجینیشن روی لیست فیلترشده
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  useEffect(() => {
    setPage(1);
  }, [activeOrderTab]);

  return (
    <div className="flex flex-col ">
      <h2 className="py-[10px] font-bold text-[130%]">سفارش های من</h2>
      <div className="bg-[unset] md:bg-[#f5f5f5] p-[10px] rounded-sm ">
        <div className="flex flex-nowrap gap-3 mb-4 w-full overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveOrderTab(tab.id)}
              className={`rounded-2xl whitespace-nowrap px-[11px] py-[4px] bg-[#f5f5f5] md:bg-white  ${
                activeOrderTab === tab.id
                  ? "border border-black text-black"
                  : "text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-4 rounded-md bg-[#f5f5f5] ">
          <div className="md:hidden">
            <OrderTableMobile
              orders={paginatedOrders}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          </div>
          <div className="hidden md:inline-block">
            <OrderTableMd
              orders={paginatedOrders}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default memo(Orders);
