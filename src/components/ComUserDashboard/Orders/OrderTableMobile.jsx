import { memo, useState } from "react";
import { HiArrowCircleLeft } from "react-icons/hi";
import { MdClose } from "react-icons/md";
function OrderTableMobile({ orders, page, setPage, totalPages }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div>
      <table className="w-full text-left rounded-md p-6 table-fixed bg-[var(--sup-sm)]">
        <thead>
          <tr className="border-b border-[var(--sup-b)]">
            <th className="p-3   font-[500] text-center">
              شماره سفارش
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--sup-b)]">
          {orders.map((order) => (
            <tr
              key={order.id}
              className="w-full hover:bg-[#c5c5c594] transition"
            >
              <td className="p-3 text-center bg-[var(--sup-sm)] flex justify-between items-center">
                <span>{order.orderNumber}</span>
                <HiArrowCircleLeft
                  className="text-[160%] cursor-pointer text-[var(--btn)]"
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
                ? "bg-[var(--btn)] text-white"
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
    className="bg-[var(--sup-sm)] px-[4px] py-[10px] rounded-xl shadow-lg w-[85%] max-w-sm"
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
          <th className="p-3 font-[500] text-center bg-[var(--sup)]">شماره سفارش</th>
          <td className="p-3 text-center bg-[var(--sup)]">{selectedOrder.orderNumber}</td>
        </tr>
        <tr className="hover:bg-[#c5c5c594] transition">
          <th className="p-3 font-[500] text-center bg-[var(--sup)]">تاریخ ثبت سفارش</th>
          <td className="p-3 text-center bg-[var(--sup)]">{selectedOrder.date}</td>
        </tr>
        <tr className="hover:bg-[#c5c5c594] transition">
          <th className="p-3 font-[500] text-center bg-[var(--sup)]">مبلغ کل</th>
          <td className="p-3 text-center bg-[var(--sup)]">{selectedOrder.price}</td>
        </tr>
        <tr className="hover:bg-[#c5c5c594] transition">
          <th className="p-3 font-[500] text-center bg-[var(--sup)]">وضعیت سفارش</th>
          <td className="p-3 text-center bg-[var(--sup)]">
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
