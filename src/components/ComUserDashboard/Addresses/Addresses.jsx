import { memo, useState } from "react";
import AddressModal from "./AddressModal";
import { TiPhoneOutline } from "react-icons/ti";
import { FaPencilAlt, FaUserCircle } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import EditAddressModal from "./EditAddressModal";
import DeleteAddressModal from "./DeleteAddressModal";

function Addresses() {
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [editAddressModal, setEditAddressModal] = useState(false);
  const [deleteAddressModal, setDeleteAddressModal] = useState(false);

  return (
    <div className="flex flex-col gap-[5px]">
      <div className="py-[10px] flex justify-between items-center">
        <h2 className="font-bold text-[130%]">ادرس من</h2>
        <button
          onClick={() => setOpenAddressModal(true)}
          className="hidden md:inline-block bg-[#1e88e5] text-white text-center py-[8px] px-[50px] rounded-lg w-[fit-content] "
        >
          افزودن ادرس
        </button>
      </div>
      <div className="p-[10px] md:p-[15px] bg-[#f5f5f5] w-full flex flex-col md:flex-row items-baseline md:justify-between md:items-center ">
        <div className="flex flex-col gap-[9px]">
          <h3 className="font-bold text-[105%]">
            اهواز. گلستان .خیابان تربت غربی . پلاک 42
          </h3>
          <h5 className="text-gray-600 flex items-center gap-[6px]">
            <TiPhoneOutline />
            09399619640
          </h5>
          <h5 className="text-gray-600 flex items-center gap-[6px]">
            <FaUserCircle />
            شقایق بزرافکن نژاد
          </h5>
        </div>
        <div className="flex gap-[10px] self-end md:self-center text-[105%] md:text-[145%]">
          <FaPencilAlt
            onClick={() => setEditAddressModal(true)}
            className="text-[#2265c9]"
          />
          <FaRegTrashCan
            onClick={() => setDeleteAddressModal(true)}
            className="text-[#c92222]"
          />
        </div>
      </div>
      <button
        onClick={() => setOpenAddressModal(true)}
        className="self-center bg-[#1e88e5] w-[90%] inline-block md:hidden text-white text-center py-[8px] px-[50px] rounded-lg "
      >
        افزودن ادرس
      </button>
      {/* مودال */}
      <AddressModal
        open={openAddressModal}
        onClose={() => setOpenAddressModal(false)}
      />
      {/* مودال */}
      <EditAddressModal
        open={editAddressModal}
        onClose={() => setEditAddressModal(false)}
      />
      {/* مودال */}
      <DeleteAddressModal
        open={deleteAddressModal}
        onClose={() => setDeleteAddressModal(false)}
      />
    </div>
  );
}
export default memo(Addresses);
