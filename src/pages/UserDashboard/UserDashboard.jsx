import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";

import { CgProfile } from "react-icons/cg";
import { FaHeart, FaMapMarkerAlt, FaShoppingCart } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";

import porofDefault from "../../assets/img/porof1.png";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import UserInfo from "../../components/ComUserDashboard/UserInfo/UserInfo";
import Orders from "../../components/ComUserDashboard/Orders/Orders";
import Support from "../../components/ComUserDashboard/Support/Support";
import Favorites from "../../components/ComUserDashboard/Favorites/Favorites";
import Addresses from "../../components/ComUserDashboard/Addresses/Addresses";

import "./UserDashboard.css";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { FiLogOut } from "react-icons/fi";
import ModalAlert from "../../components/ModalAlert/ModalAlert";

function UserDashboard() {
  const { user, logout } = useAuth();
  const { subMenu } = useParams();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [subMenu]);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalButtons, setModalButtons] = useState([]);
  return (
    <div className="flex flex-col min-h-screen">
      {/* navbar */}
      <Navbar />
      <div className="h-6 lg:h-16  "></div>
      {/* main */}
        <h6 className="text-gray-500 pt-[18px] px-[13px] text-[85%] flex gap-[4px]">
        <Link to="/Fotros/">صفحه اصلی &gt; </Link>
        <span>حساب کاربری</span>
      </h6>
      <div className="UserDashboard flex pt-[5px] pb-[10px] px-[14px] lg:px-[30px] ">
        {/*Dashboard */}
        <div className="hidden lg:inline-block w-[20%] p-[20px]">
          <div className="flex flex-col justify-center items-center">
            <img
              src={user.profilePic || porofDefault}
              alt="Profile"
              className="w-[130px] h-[130px] rounded-full border-[1px] border-[#56a3ff61] object-cover"
            />
            <h2 className="font-[600] py-[10px]">
              {user.fname} {user.lname}
            </h2>
          </div>
          <div className="flex flex-col gap-[10px]">
            {[
              { id: "UserInfo", text: "اطلاعات کاربری", icon: <CgProfile /> },
              { id: "Orders", text: "سفارش های من", icon: <FaShoppingCart /> },
              { id: "Favorites", text: "علاقه مندی ها", icon: <FaHeart /> },
              { id: "Addresses", text: "ادرس من", icon: <FaMapMarkerAlt /> },
              { id: "Support", text: "پشتیبانی", icon: <BiSupport /> },
            ].map(({ text, id, icon }, idx) => (
              <NavLink
                key={idx}
                to={`/Fotros/userdashboard/${id}`}
                className=" border-[2px] w-full border-[#dfdfdf] flex items-center justify-start gap-[9px]  pr-[15px] pl-[13px] py-[8px] rounded-xl "
              >
                <span className="icondashboard text-[115%]">{icon}</span>
                <span className="textdashboard">{text}</span>
              </NavLink>
            ))}
            <button
              onClick={() => {
                setModalMessage("میخوای از حساب کاربری خارج بشی؟");
                setModalButtons([
                  {
                    label: "بله",
                    type: "yes",
                    onClick: () => {
                      logout();
                      navigate("/Fotros/");
                      setIsModalOpen(false);
                    },
                  },
                  {
                    label: "خیر",
                    type: "no",
                    onClick: () => {
                      setIsModalOpen(false);
                    },
                  },
                ]);
                setIsModalOpen(true);
              }}
              className=" border-[2px] w-full border-[#dfdfdf] flex items-center justify-start gap-[9px]  pr-[15px] pl-[13px] py-[8px] rounded-xl "
            >
              <span className="icondashboard text-[115%]">
                <FiLogOut />
              </span>
              <span className="textdashboard">خروج از حساب کاربری</span>
            </button>
          </div>
        </div>
        <div className="w-[100%] lg:w-[80%]">
          {subMenu === "UserInfo" && <UserInfo />}
          {subMenu === "Orders" && <Orders></Orders>}
          {subMenu === "Favorites" && <Favorites />}
          {subMenu === "Addresses" && <Addresses />}
          {subMenu === "Support" && <Support />}
        </div>
      </div>
      {/* footer */}
      <div className="h-[1.3rem] lg:h-[3rem]"></div> <Footer />
      <ModalAlert
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        message={modalMessage}
        timer={4000} // مدت زمان نوار progress
        buttons={modalButtons}
      />
    </div>
  );
}
export default UserDashboard;
