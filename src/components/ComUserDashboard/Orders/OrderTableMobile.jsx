import { memo, useState } from "react";
import { HiArrowCircleLeft } from "react-icons/hi";
import { MdClose } from "react-icons/md";
function OrderTableMobile({ orders, page, setPage, totalPages }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div>
      <table className="w-full text-left rounded-md p-6 table-fixed bg-white">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="p-3   font-[500] text-center">
              شماره سفارش
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => (
            <tr
              key={order.id}
              className="w-full hover:bg-[#c5c5c594] transition"
            >
              <td className="p-3 text-center bg-[white] flex justify-between items-center">
                <span>{order.orderNumber}</span>
                <HiArrowCircleLeft
                  className="text-[160%] cursor-pointer text-[#1e88e5]"
                  onClick={() => setSelectedOrder(order)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded-lg shadow transition ${
              page === i + 1
                ? "bg-[#1e88e5] text-white"
                : "bg-white text-black hover:bg-[#9393936b]"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal جزئیات سفارش */}
      {selectedOrder && (
  <div
  className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
  onClick={() => setSelectedOrder(null)} // کلیک روی بک‌دراپ
>
  <div
    className="bg-white px-[4px] py-[10px] rounded-xl shadow-lg w-[85%] max-w-sm"
    onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن وقتی روی باکس کلیک شد
  >
    <div className="flex justify-between items-center p-[5px] ">
      <h3 className="text-[110%] font-bold">جزئیات سفارش</h3>
      <MdClose
        onClick={() => setSelectedOrder(null)}
        className="rounded-lg hover:bg-blue-500"
      />
    </div>
    <table className="w-full text-left rounded-2xl table-fixed border-separate border-spacing-y-[3px] border-spacing-x-[6px]">
      <tbody className="divide-y divide-[white]">
        <tr className="hover:bg-[#c5c5c594] transition">
          <th className="p-3 font-[500] text-center bg-gray-100">شماره سفارش</th>
          <td className="p-3 text-center bg-[#f5f5f5]">{selectedOrder.orderNumber}</td>
        </tr>
        <tr className="hover:bg-[#c5c5c594] transition">
          <th className="p-3 font-[500] text-center bg-gray-100">تاریخ ثبت سفارش</th>
          <td className="p-3 text-center bg-[#f5f5f5]">{selectedOrder.date}</td>
        </tr>
        <tr className="hover:bg-[#c5c5c594] transition">
          <th className="p-3 font-[500] text-center bg-gray-100">مبلغ کل</th>
          <td className="p-3 text-center bg-[#f5f5f5]">{selectedOrder.price}</td>
        </tr>
        <tr className="hover:bg-[#c5c5c594] transition">
          <th className="p-3 font-[500] text-center bg-gray-100">وضعیت سفارش</th>
          <td className="p-3 text-center bg-[#f5f5f5]">
            {selectedOrder.status === "pending" && (
              <span className="bg-[#ff9f513a] text-[#e45400] text-[95%] px-[4px] w-[100px] inline-block py-1 rounded">
                در حال ارسال
              </span>
            )}
            {selectedOrder.status === "delivered" && (
              <span className="bg-[#8eeb8e52] text-[green] text-[95%] px-[4px] w-[100px] inline-block py-1 rounded">
                ارسال شده
              </span>
            )}
            {selectedOrder.status === "canceled" && (
              <span className="bg-[#fa70704b] text-[red] text-[95%] px-[4px] w-[100px] inline-block py-1 rounded">
                لغو شده
              </span>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

      )}
    </div>
  );
}

export default memo(OrderTableMobile);
