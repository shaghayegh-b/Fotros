import { memo, useState } from "react";
import AddressModal from "./AddressModal";
import { TiPhoneOutline } from "react-icons/ti";
import { FaPencilAlt, FaUserCircle } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import EditAddressModal from "./EditAddressModal";
import DeleteAddressModal from "./DeleteAddressModal";
import { useAddress } from "../../../context/AddressContext/AddressContext";

function Addresses() {
  const {
    addresses = [],
    addAddress,
    updateAddress,
    deleteAddress,
  } = useAddress();

  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [editAddressModal, setEditAddressModal] = useState(false);
  const [deleteAddressModal, setDeleteAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  return (
    <div className="flex flex-col gap-[5px]">
      <div className="py-[10px] flex justify-between items-center">
        <h2 className="font-bold text-[130%]">ادرس های من</h2>
        <button
          onClick={() => setOpenAddressModal(true)}
          className="hidden md:inline-block bg-[var(--btn)] text-white text-center py-[8px] px-[50px] rounded-lg w-[fit-content] "
        >
          افزودن ادرس
        </button>
      </div>
      {addresses.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          هنوز هیچ آدرسی اضافه نکردی 😅
        </p>
      )}
      {addresses.map((address) => (
        <div
          key={address.id}
          className="p-[10px] md:p-[15px] bg-[var(--adress-sm)] w-full flex flex-col md:flex-row items-baseline md:justify-between md:items-center "
        >
          <div className="flex flex-col gap-[9px]">
            <h3 className="font-bold text-[105%]">{address.fullAddress}</h3>
            <h5 className="text-gray-600 flex items-center gap-[6px]">
              <TiPhoneOutline />
              {address.phone}
            </h5>
            <h5 className="text-gray-600 flex items-center gap-[6px]">
              <FaUserCircle />
              {address.fname} {address.lname}
            </h5>
          </div>
          <div className="flex gap-[10px] self-end md:self-center text-[105%] md:text-[145%]">
            <FaPencilAlt
              onClick={() => {
                setSelectedAddress(address);
                setEditAddressModal(true);
              }}
              className="text-[#2265c9] cursor-pointer"
            />
            <FaRegTrashCan
              onClick={() => {
                setSelectedAddress(address);
                setDeleteAddressModal(true);
              }}
              className="text-[#c92222] cursor-pointer"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => setOpenAddressModal(true)}
        className="self-center bg-[var(--btn)] w-[90%] inline-block md:hidden text-white text-center py-[8px] px-[50px] rounded-lg "
      >
        افزودن ادرس
      </button>
      {/* مودال */}
      {openAddressModal && (
        <AddressModal
          open={openAddressModal}
          onClose={() => setOpenAddressModal(false)}
          onSave={(newAddress) => {
            addAddress(newAddress);
            setOpenAddressModal(false);
          }}
        />
      )}

      {/* مودال */}

      {editAddressModal && (
        <EditAddressModal
          open={editAddressModal}
          onClose={() => {
            setEditAddressModal(false);
            setSelectedAddress(null);
          }}
          address={selectedAddress}
          onSave={(updatedAddress) => {
            updateAddress(updatedAddress);
            setEditAddressModal(false);
            setSelectedAddress(null);
          }}
        />
      )}

      {/* مودال حذف آدرس */}
      {deleteAddressModal && (
        <DeleteAddressModal
          open={deleteAddressModal}
          onClose={() => {
            setDeleteAddressModal(false);
            setSelectedAddress(null);
          }}
          onConfirm={() => {
            if (selectedAddress) {
              deleteAddress(selectedAddress.id);
              setDeleteAddressModal(false);
              setSelectedAddress(null);
            }
          }}
          address={selectedAddress}
        />
      )}
    </div>
  );
}
export default memo(Addresses);
