import { memo } from "react";

// components/OrderTable.jsx
function OrderTableMd({ orders, page, setPage, totalPages }) {
  return (
    <div>
      <table className="w-full text-left rounded-2xl p-6 table-fixed bg-white">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="p-3 text-[115%] font-[500] text-center">شماره سفارش</th>
            <th className="p-3 text-[115%] font-[500] text-center">تاریخ ثبت سفارش</th>
            <th className="p-3 text-[115%] font-[500] text-center">مبلغ کل</th>
            <th className="p-3 text-[115%] font-[500] text-center">وضعیت سفارش</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => (
            <tr
              key={order.id}
              className="w-full hover:bg-[#c5c5c594] transition"
            >
              <td className="p-3 text-center">{order.orderNumber}</td>
              <td className="p-3 text-center">{order.date}</td>
              <td className="p-3 text-center">{order.price}</td>
              <td className="p-3 text-center">
                {order.status === "pending" && (
                  <span className="bg-[#ff9f513a] text-[#e45400] text-[95%] px-[4px] w-[100px] inline-block py-1 rounded">
                    در حال ارسال
                  </span>
                )}
                {order.status === "delivered" && (
                  <span className="bg-[#8eeb8e52] text-[green] text-[95%] px-[4px] w-[100px] inline-block py-1 rounded">
                    ارسال شده
                  </span>
                )}
                {order.status === "canceled" && (
                  <span className="bg-[#fa70704b] text-[red] text-[95%] px-[4px] w-[100px] inline-block py-1 rounded">
                    لغو شده
                  </span>
                )}
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
    </div>
  );
}

export default memo(OrderTableMd);
