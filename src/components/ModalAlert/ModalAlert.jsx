import { memo, useEffect, useRef, useState } from "react";

const ModalAlert = ({
  isOpen,
  onClose,
  message,
  buttons,
  timer = null,
}) => {
  const [progressWidth, setProgressWidth] = useState("100%");
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    setVisible(true);
    setProgressWidth("100%");

    // شروع انیمیشن progress بعد از یک tick کوچک
    const progressTimeout = setTimeout(() => setProgressWidth("0%"), 50);

    if (timer) {
      timerRef.current = setTimeout(() => {
        setVisible(false); // شروع انیمیشن fade/scale
        // بعد از duration transition (300ms)
        setTimeout(() => {
          onClose();
          setProgressWidth("100%");
        }, 300);
      }, timer);
    }

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(progressTimeout);
    };
  }, [isOpen, timer, onClose]);

  const handleCloseSmooth = () => {
    clearTimeout(timerRef.current);
    setVisible(false);
    setTimeout(() => {
      onClose();
      setProgressWidth("100%");
    }, 300);
  };

  // بستن با ESC
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && handleCloseSmooth();
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  // بستن با کلیک روی بکدراپ
  const handleBackdropClick = (e) => {
    if (e.target.id === "modal-backdrop") handleCloseSmooth();
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal-backdrop"
      onClick={handleBackdropClick}
      className={`fixed inset-0 bg-[#00000053] bg-opacity-30 flex justify-center items-start pt-10 z-50 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`relative bg-white rounded-xl shadow-lg w-full max-w-[90%] md:max-w-[47%]  p-[25px] overflow-hidden transform transition-all duration-300 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {timer && (
          <div className="absolute w-[100%]  left-0 bottom-[0px]  shadow-[0_0_8px_rgba(30,136,229,0.6)] rounded-b-xl">
            <div className="h-[4px] bg-gray-300">
              <div
                className=" h-[4px] bg-[#0b9ae7dd] "
                style={{
                  width: progressWidth,
                  transition: `width ${timer}ms linear`,
                }}
              ></div>
            </div>
          </div>
        )}

        <p className=" text-center text-[102%] font-[500] relative z-10">
          {message}
        </p>

       {buttons&& <div className="flex justify-center gap-3 mt-4 relative z-10">
          {buttons.map((btn, idx)=> (btn&&(
            <button
              key={idx}
              onClick={() => {
                btn.onClick?.();
                handleCloseSmooth();
              }}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${
                  btn.type === "confirm"
                    ? "hover:bg-[#1e88e5] text-white bg-[#0b9ae7dd]"
                    : btn.type === "yes"
                    ? "hover:bg-[#1e88e5] text-white bg-[#0b9ae7dd]"
                    : btn.type === "no"
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {btn.label}
            </button>
          )))}
        </div>}
      </div>
    </div>
  );
};
export default memo(ModalAlert);
{/* <ModalAlert
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        message={modalMessage}
        timer={50000} // مدت زمان نوار progress
        buttons={[
          {
            label: "باشه",
            type: "confirm",
            onClick: () => {
              setIsModalOpen(false);
              navigate("/Fotros/profile-login"); // انتقال به صفحه پروفایل بعد از تأیید
            },
          },
          {
            label: "بله",
            type: "yes",
            onClick: () => {
              setLname("");
              setFname("");
              setEmail("");

              setIsModalOpen(false);
              setModalMessage("اطلاعات با موفقیت حذف شد.");
              navigate("/Fotros/");
            },
          },
          {
            label: "خیر",
            type: "no",
            onClick: () => {
              setIsModalOpen(false);
              setModalMessage("عملیات لغو شد.");
            },
          },
        ]}
      /> */}
