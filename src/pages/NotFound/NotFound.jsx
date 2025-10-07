import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

import notFoundImg from "../../assets/img/404.jpg";

function NotFound() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex flex-col justify-center items-center text-center">
        <img
          src={notFoundImg}
          alt="404 Not Found"
          className="w-[240px] md:w-[400px] mb-6"
        />
        <h1 className="text-[1.8rem] md:text-[2.2rem] font-bold text-gray-800 mb-2">
          صفحه مورد نظر یافت نشد!
        </h1>
        <p className="text-gray-600 text-[1rem] md:text-[1.1rem] mb-6 leading-7">
          متاسفانه صفحه‌ای که به دنبال آن بودید وجود ندارد یا ممکن است حذف شده
          باشد.
          <br />
          لطفاً آدرس را بررسی کنید یا به صفحه اصلی بازگردید.
        </p>
        <Link
          to="/Fotros/"
          className="flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-xl transition-all box-shadow "
        >
                      بازگشت به صفحه اصلی

          <IoMdArrowRoundBack className="text-[1.4rem]" />
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
