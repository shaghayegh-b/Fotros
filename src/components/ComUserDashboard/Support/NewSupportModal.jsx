import { useState, useEffect, memo } from "react";
import { FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";

function NewSupportModal({ open, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  //   وقتی مودال باز است، می‌توان body را lock کرد
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // قفل اسکرول
    } else {
      document.body.style.overflow = "auto"; // بازگرداندن
    }
    return () => {
      document.body.style.overflow = "auto"; // cleanup
    };
  }, [open]);
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) setFile(f);
  };

  const handleSave = (e) => {
    e.preventDefault(); // جلوگیری از رفرش صفحه
    let newErrors = {};

    if (!title) newErrors.title = "عنوان الزامی است";
    if (!desc) newErrors.desc = "توضیحات الزامی است";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSave({
      title,
      desc,
      file,
      date: new Date().toLocaleDateString(),
      status: "pending",
    });

    setTitle("");
    setDesc("");
    setFile(null);
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#d9d9d9] w-[95%] md:w-[58%] max-h-[98vh] p-6 rounded-xl shadow-lg overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-[120%] font-bold">درخواست جدید</h3>
          <MdClose onClick={onClose} className="cursor-pointer text-[22px]" />
        </div>

        <form
          action="#"
          onSubmit={handleSave}
          className="flex flex-col gap-[5px] py-[8px]"
        >
          <label htmlFor="title" className="block  font-semibold">
            عنوان<span className="text-[#c20101]">*</span>
          </label>
          <input
            id="title"
            type="text"
            placeholder="موضوع درخواست خود را بنویسید"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
            }}
            className={`w-full rounded p-2 mb-2 bg-[#f5f5f5] border border-transparent focus:outline-none focus:border-[#bababa] ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
          <label htmlFor="desc" className="block  font-semibold  ">
            محتوای پیام<span className="text-[#c20101]">*</span>
          </label>
          <textarea
            id="desc"
            placeholder="متن درخواست خود را بنویسید"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
              if (errors.desc) setErrors((prev) => ({ ...prev, desc: "" }));
            }}
            className={`w-full rounded p-2 mb-2 bg-[#f5f5f5] border border-transparent focus:outline-none focus:border-[#bababa] ${
              errors.desc ? "border-red-500" : ""
            }`}
          />
          {errors.desc && <p className="text-red-500 text-sm">{errors.desc}</p>}
          <label
            htmlFor="file-upload"
            className="cursor-pointer p-[8px] mt-[8px] mb-[10px] transition flex gap-[15px] w-full rounded  bg-[#f5f5f5] border border-transparent focus:outline-none focus:border-[#bababa]"
          >
            <span className="border w-[45px] h-[45px] border-[#1e88e5] rounded-full flex justify-center items-center ">
              <FaPlus className="text-[#0f6fc3] " />
            </span>
            <p className="flex flex-col gap-[3px]">
              <span className=" font-bold  text-[120%]">اضافه کردن عکس</span>
              <span className="text-gray-500">
                برای اضافه کردن عکس کلیک کنید
              </span>
            </p>
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            key={file ? file.name : ""}
            className="hidden" // مخفی کردن input واقعی
          />
          {file && (
            <p className="text-sm text-gray-700">
              فایل انتخاب شده: {file.name}
            </p>
          )}

          <button
            type="submit"
            disabled={!title || !desc}
            className="bg-[#1e88e5] text-white font-[600] rounded-xl text-[120%] py-2 px-4 w-[fit-content] self-end"
          >
            ثبت درخواست
          </button>
        </form>
      </div>
    </div>
  );
}

export default memo(NewSupportModal);
