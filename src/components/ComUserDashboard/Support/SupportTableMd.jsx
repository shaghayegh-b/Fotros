import { memo, useState } from "react";
import { HiArrowCircleLeft } from "react-icons/hi";
import { MdClose } from "react-icons/md";

// components/supporTable.jsx
function SupportTableMd({
  supports,
  page,
  setPage,
  totalPages,
  onOpenNewSupport,
}) {
  const [selectedSuppor, setSelectedSuppor] = useState(null);

  return (
    <div>
      <table className="w-full text-left rounded-2xl p-6 table-fixed bg-white">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="p-3 text-[115%] font-[500] text-center">عنوان</th>
            <th className="p-3 text-[115%] font-[500] text-center">تاریخ</th>
            <th className="p-3 text-[115%] font-[500] text-center">
              محتوای پیام
            </th>
            <th className="p-3 text-[115%] font-[500] text-center">وضعیت</th>
            <th className="p-3 text-[115%] font-[500] text-center">
              مشاهده جزئیات
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {supports.map((suppor) => (
            <tr
              key={suppor.id}
              className="w-full hover:bg-[#c5c5c594] transition"
            >
              <td className="p-3 text-center">{suppor.title}</td>
              <td className="p-3 text-center">{suppor.date}</td>
              <td className="p-3 text-center">{suppor.desc}</td>
              <td className="p-3 text-center">
                {suppor.status === "pending" && (
                  <span className="bg-[#ff9f513a] text-[#e45400] text-[95%] px-[4px] w-[100px] inline-block py-1 rounded">
                    در حال بررسی
                  </span>
                )}
                {suppor.status === "answered" && (
                  <span className="bg-[#8eeb8e52] text-[green] text-[95%] px-[4px] w-[100px] inline-block py-1 rounded">
                    پاسخ داده شده
                  </span>
                )}
                {suppor.status === "unanswered" && (
                  <span className="bg-[#fa70704b] text-[red] text-[95%] px-[4px] w-[100px] inline-block py-1 rounded">
                    بی پاسخ
                  </span>
                )}
              </td>
              <td className="p-3 flex justify-center">
                <HiArrowCircleLeft
                  className="text-[160%] cursor-pointer text-[#1e88e5]"
                  onClick={() => setSelectedSuppor(suppor)}
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
      {selectedSuppor && (
        <>
          {supports.map((suppor) => (
            <div
              className="fixed inset-0 flex justify-center items-center bg-[#00000030] z-50"
              onClick={() => setSelectedSuppor(null)} // کلیک روی بک‌دراپ
            >
              <div
                className="bg-white p-[20px] rounded-xl shadow-lg  flex flex-col gap-[8px] w-[58%] max-h-[98vh]  overflow-y-auto scrollbar-hide"
                onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن وقتی روی باکس کلیک شد
              >
                <div className="flex justify-between items-center p-[5px] ">
                  <h3 className="text-[110%] font-bold">جزئیات سفارش</h3>
                  <MdClose
                    onClick={() => setSelectedSuppor(null)}
                    className="rounded-lg hover:bg-gray-200"
                  />
                </div>

                <div className="bg-[#f5f5f5] flex  gap-[20px] p-[10px] ">
                  <div className=" h-[250px] flex justify-center items-center">
                    <img
                      src={suppor.img}
                      alt={suppor.title}
                      className="h-full"
                    />
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <p className="font-[600]  text-[110%]">{suppor.title}</p>
                    <p>{suppor.date}</p>
                    <p>{suppor.desc}</p>
                    <p>{suppor.messagecontent}</p>
                  </div>
                </div>
                <p className="text-[120%] p-[10px] px-[15px]">
                  <span className="font-[600] px-[4px]">پاسخ پشتیبانی:</span>
                  {suppor.answercontent}
                </p>
                <button
                  onClick={() => onOpenNewSupport && onOpenNewSupport()}
                  className="bg-[#1e88e5] text-white font-[600] text-[110%] text-center py-[6px] px-[30px] rounded-lg w-[fit-content] self-end"
                >
                  درخواست جدید
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default memo(SupportTableMd);
