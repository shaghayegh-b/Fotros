import { memo, useEffect, useState } from "react";
import SupportTableMobile from "./SupportTableMobile";
import SupportTableMd from "./SupportTableMd";
import NewSupportModal from "./NewSupportModal";

function Support() {
  const [supports, setSupports] = useState([
    {
      id: 1,
      title: "عنوان یک",
      date: "1402/07/10",
      desc: "محتوای پیام یک",
      status: "pending",
      img: "https://raw.githubusercontent.com/shaghayegh-b/bazrafkan-store/refs/heads/main/src/assets/img/daman.webp",
    },
    {
      id: 2,
      title: "عنوان دو",
      date: "1402/07/12",
      desc: "محتوای پیام دو",
      status: "answered",
      messagecontent: "قسمتی از لباس نخ کش شده درخواست مرجوعی دارم",
      answercontent:
        "لطفا عکس لباس رو به این شماره 09399619640 در واتس اپ ارسال کنید ",
      img: "https://raw.githubusercontent.com/shaghayegh-b/bazrafkan-store/refs/heads/main/src/assets/img/daman.webp",
    },
    {
      id: 3,
      title: "عنوان سه",
      date: "1402/07/15",
      desc: "محتوای پیام سه",
      status: "unanswered",
      messagecontent: "کد رهگیری برای من ارسال نشده",
      answercontent: "با عرض پوزش دوست عزیز.کد رهگیری برای شما پیامک شد",
      img: "https://raw.githubusercontent.com/shaghayegh-b/bazrafkan-store/refs/heads/main/src/assets/img/daman.webp",
    },
    {
      id: 4,
      title: "عنوان چهار",
      date: "1402/07/12",
      desc: "1,200,000",
      status: "answered",
      messagecontent: "قسمتی از لباس نخ کش شده درخواست مرجوعی دارم",
      answercontent:
        "لطفا عکس لباس رو به این شماره 09399619640 در واتس اپ ارسال کنید ",
      img: "https://raw.githubusercontent.com/shaghayegh-b/bazrafkan-store/refs/heads/main/src/assets/img/daman.webp",
    },
    {
      id: 5,
      title: "عنوان پنج",
      date: "1402/07/12",
      desc: "1,200,000",
      status: "answered",
      messagecontent: "کد رهگیری برای من ارسال نشده",
      answercontent: "با عرض پوزش دوست عزیز.کد رهگیری برای شما پیامک شد",
      img: "https://raw.githubusercontent.com/shaghayegh-b/bazrafkan-store/refs/heads/main/src/assets/img/daman.webp",
    },

    {
      id: 6,
      title: "عنوان یک",
      date: "1402/07/10",
      desc: "محتوای پیام یک",
      status: "pending",
      img: "https://raw.githubusercontent.com/shaghayegh-b/bazrafkan-store/refs/heads/main/src/assets/img/daman.webp",
    },
    {
      id: 7,
      title: "عنوان دو",
      date: "1402/07/12",
      desc: "محتوای پیام دو",
      status: "answered",
      messagecontent: "قسمتی از لباس نخ کش شده درخواست مرجوعی دارم",
      answercontent:
        "لطفا عکس لباس رو به این شماره 09399619640 در واتس اپ ارسال کنید ",
      img: "https://raw.githubusercontent.com/shaghayegh-b/bazrafkan-store/refs/heads/main/src/assets/img/daman.webp",
    },
    {
      id: 8,
      title: "عنوان سه",
      date: "1402/07/15",
      desc: "محتوای پیام سه",
      status: "unanswered",
      messagecontent: "کد رهگیری برای من ارسال نشده",
      answercontent: "با عرض پوزش دوست عزیز.کد رهگیری برای شما پیامک شد",
      img: "https://raw.githubusercontent.com/shaghayegh-b/bazrafkan-store/refs/heads/main/src/assets/img/daman.webp",
    },
    {
      id: 9,
      title: "عنوان چهار",
      date: "1402/07/12",
      desc: "1,200,000",
      status: "answered",
      messagecontent: "قسمتی از لباس نخ کش شده درخواست مرجوعی دارم",
      answercontent:
        "لطفا عکس لباس رو به این شماره 09399619640 در واتس اپ ارسال کنید ",
      img: "https://raw.githubusercontent.com/shaghayegh-b/bazrafkan-store/refs/heads/main/src/assets/img/daman.webp",
    },
    {
      id: 10,
      title: "عنوان پنج",
      date: "1402/07/12",
      desc: "1,200,000",
      status: "answered",
      messagecontent: "کد رهگیری برای من ارسال نشده",
      answercontent: "با عرض پوزش دوست عزیز.کد رهگیری برای شما پیامک شد",
      img: "https://raw.githubusercontent.com/shaghayegh-b/bazrafkan-store/refs/heads/main/src/assets/img/daman.webp",
    },
  ]);

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
  const filteredSuppor = supports;
  // پجینیشن روی لیست فیلترشده
  const totalPagesSuppor = Math.ceil(filteredSuppor.length / itemsPerPage);
  const startIndexSuppor = (page - 1) * itemsPerPage;
  const paginatedSuppor = filteredSuppor.slice(
    startIndexSuppor,
    startIndexSuppor + itemsPerPage
  );
  const [openNewSupportModal, setOpenNewSupportModal] = useState(false);

  return (
    <div className="flex flex-col ">
      <h2 className="py-[10px] font-bold text-[130%]">درخواست های من</h2>
      <div className="flex flex-col gap-[10px]  bg-[#f5f5f5]  md:bg-[#f5f5f5] p-[20px] rounded-sm ">
        <button
          onClick={() => setOpenNewSupportModal(true)}
          className="bg-[#1e88e5] text-white font-[600] text-[110%] text-center py-[6px] px-[30px] rounded-lg w-full md:w-[fit-content] self-end"
        >
          درخواست جدید
        </button>
        <div className="hidden md:inline-block">
          <SupportTableMd
            supports={paginatedSuppor}
            page={page}
            setPage={setPage}
            totalPages={totalPagesSuppor}
            onOpenNewSupport={() => setOpenNewSupportModal(true)}
          />
        </div>
        <div className=" inline-block md:hidden">
          <SupportTableMobile
            supports={paginatedSuppor}
            page={page}
            setPage={setPage}
            totalPages={totalPagesSuppor}
            onOpenNewSupport={() => setOpenNewSupportModal(true)}
          />
        </div>
        <NewSupportModal
          open={openNewSupportModal}
          onClose={() => setOpenNewSupportModal(false)}
          onSave={(newRequest) => {
            setSupports((prev) => [
              ...prev,
              { ...newRequest, id: prev.length + 1 },
            ]);
            alert("درخواست شما ثبت شد!");
          }}
        />
      </div>
    </div>
  );
}
export default memo(Support);
