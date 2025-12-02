import React, { memo, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useAuth } from "../../../context/AuthContext/AuthContext";
function AddressModal({ open, onClose, onSave }) {
  const { user } = useAuth();

  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isOtherRecipient, setIsOtherRecipient] = useState(false);
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");

  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({});

  // 🟢 دیتای کامل استان‌ها و شهرهای ایران
  const provinces = {
    "آذربایجان شرقی": [
      "تبریز",
      "مراغه",
      "مرند",
      "جلفا",
      "شبستر",
      "اهر",
      "سراب",
      "هشترود",
      "میانه",
      "بستان‌آباد",
    ],
    "آذربایجان غربی": [
      "ارومیه",
      "خوی",
      "مهاباد",
      "بوکان",
      "سلماس",
      "نقده",
      "میاندوآب",
      "پیرانشهر",
      "سردشت",
    ],
    اردبیل: ["اردبیل", "مشگین‌شهر", "پارس‌آباد", "خلخال", "نمین", "گرمی"],
    اصفهان: [
      "اصفهان",
      "کاشان",
      "خمینی‌شهر",
      "نجف‌آباد",
      "فلاورجان",
      "شهرضا",
      "زرین‌شهر",
      "مبارکه",
      "خوانسار",
    ],
    البرز: ["کرج", "فردیس", "نظرآباد", "هشتگرد", "اشتهارد"],
    ایلام: ["ایلام", "دهلران", "آبدانان", "دره‌شهر", "مهران"],
    بوشهر: ["بوشهر", "برازجان", "گناوه", "کنگان", "دشتی", "جم"],
    تهران: [
      "تهران",
      "اسلامشهر",
      "ورامین",
      "شهریار",
      "ری",
      "قدس",
      "پردیس",
      "بومهن",
      "دماوند",
    ],
    "چهارمحال و بختیاری": ["شهرکرد", "بروجن", "فارسان", "لردگان"],
    "خراسان جنوبی": ["بیرجند", "قائن", "فردوس", "نهبندان"],
    "خراسان رضوی": [
      "مشهد",
      "نیشابور",
      "سبزوار",
      "تربت حیدریه",
      "کاشمر",
      "چناران",
      "تربت جام",
    ],
    "خراسان شمالی": ["بجنورد", "شیروان", "اسفراین", "فاروج"],
    خوزستان: [
      "اهواز",
      "آبادان",
      "خرمشهر",
      "دزفول",
      "شوشتر",
      "ایذه",
      "ماهشهر",
      "بندر امام",
      "اندیمشک",
    ],
    زنجان: ["زنجان", "ابهر", "خدابنده", "طارم"],
    سمنان: ["سمنان", "شاهرود", "دامغان", "گرمسار"],
    "سیستان و بلوچستان": ["زاهدان", "چابهار", "ایرانشهر", "خاش", "زابل"],
    فارس: ["شیراز", "مرودشت", "جهرم", "لار", "کازرون", "فسا", "نی‌ریز"],
    قزوین: ["قزوین", "البرز", "بوئین‌زهرا", "تاکستان"],
    قم: ["قم"],
    کردستان: ["سنندج", "سقز", "بانه", "مریوان", "قروه", "بیجار"],
    کرمان: ["کرمان", "رفسنجان", "جیرفت", "زرند", "بم", "سیرجان"],
    کرمانشاه: ["کرمانشاه", "اسلام‌آباد غرب", "هرسین", "پاوه", "سنقر", "صحنه"],
    "کهگیلویه و بویراحمد": ["یاسوج", "دهدشت", "گچساران"],
    گلستان: ["گرگان", "گنبد کاووس", "علی‌آباد", "آزادشهر", "مینودشت", "کلاله"],
    گیلان: [
      "رشت",
      "انزلی",
      "لاهیجان",
      "آستانه اشرفیه",
      "فومن",
      "لنگرود",
      "تالش",
    ],
    لرستان: ["خرم‌آباد", "بروجرد", "دورود", "الیگودرز", "کوهدشت", "نورآباد"],
    مازندران: [
      "ساری",
      "آمل",
      "بابل",
      "قائم‌شهر",
      "چالوس",
      "تنکابن",
      "بابلسر",
      "نور",
    ],
    مرکزی: ["اراک", "ساوه", "محلات", "خمین", "دلیجان"],
    هرمزگان: ["بندرعباس", "میناب", "بندر لنگه", "قشم", "کیش", "جاسک"],
    همدان: ["همدان", "ملایر", "نهاوند", "اسدآباد", "تویسرکان"],
    یزد: ["یزد", "میبد", "اردکان", "بافق", "مهریز"],
  };
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

  const handleSave = (e) => {
    e.preventDefault(); // جلوگیری از رفرش صفحه

    let newErrors = {};
    if (!province) newErrors.province = "انتخاب استان الزامی است";
    if (!city) newErrors.city = "انتخاب شهر الزامی است";
    if (!address) newErrors.address = "آدرس الزامی است";
    if (isOtherRecipient) {

  if (!phone) {
    newErrors.phone = "شماره تماس الزامی است";
  } else if (!/^09\d{9}$/.test(phone)) {
    newErrors.phone = "شماره موبایل معتبر وارد کنید (باید با 09 شروع شود)";
  } else if (phone.length !== 11) {
    newErrors.phone = "شماره موبایل باید 11 رقم باشد";
  }

      if (!fname) newErrors.fname = "نام فرد گیرنده الزامی است";
      if (!lname) newErrors.lname = "نام خانوادگی فرد گیرنده الزامی است";
    }


    if (!/^\d{10}$/.test(postalCode))
      newErrors.postalCode = "کدپستی باید ۱۰ رقم باشد";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // آدرس جدید
    const newAddress = {
      id: Date.now(),
      province,
      city,
      fullAddress: `${province}، ${city}، ${address}`,
      postalCode,
      phone: isOtherRecipient ? phone : user.username,
      fname: isOtherRecipient ? fname : user.fname,
      lname: isOtherRecipient ? lname : user.lname,
    };

    // ارسال به Context از طریق props
    if (onSave) onSave(newAddress);

    // ریست فرم و بستن مودال
    setProvince("");
    setCity("");
    setAddress("");
    setPostalCode("");
    setIsOtherRecipient(false);
    setFName("");
    setLName("");
    setPhone("");
    setErrors({});
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[var(--sup)] w-[95%] md:w-[90%] max-w-md max-h-[64vh] md:max-h-[98vh] p-6 rounded-xl shadow-lg overflow-y-auto scrollbar-hide"
      >
        <div className="flex justify-between items-center pb-[18px]">
          <h2 className="text-lg font-bold">افزودن آدرس</h2>
          <MdClose onClick={onClose} className="cursor-pointer text-[22px]" />
        </div>
        <div className="flex items-center gap-2 pb-[4px]">
          <input
            type="checkbox"
            id="otherRecipient"
            checked={isOtherRecipient}
            onChange={(e) => setIsOtherRecipient(e.target.checked)}
          />
          <label htmlFor="otherRecipient" className="font-semibold">
            گیرنده فرد دیگری است
          </label>
        </div>

        <form action="#" onSubmit={handleSave}>
          {isOtherRecipient && (
            <>
              {/* اسم گیرنده */}
              <label htmlFor="fname" className="block mb-1 font-semibold mt-3">
                نام گیرنده<span className="text-[var(--import)]">*</span>
              </label>
              <input
                id="fname"
                type="text"
                value={fname}
                onChange={(e) => setFName(e.target.value)}
                className="w-full rounded p-2 mb-2 bg-[var(--sup-sm)] placeholder:text-gray-600 border border-transparent focus:outline-none focus:border-[#bababa] "
                placeholder="مثلاً : علی"
              />
              {errors.fname && (
                <p className="text-[var(--import)] text-sm mb-2">{errors.fname}</p>
              )}
              {/* فامیل گیرنده */}
              <label htmlFor="lname" className="block mb-1 font-semibold mt-3">
                نام خانوادگی گیرنده<span className="text-[var(--import)]">*</span>
              </label>
              <input
                id="lname"
                type="text"
                value={lname}
                onChange={(e) => setLName(e.target.value)}
                className="w-full rounded p-2 mb-2 bg-[var(--sup-sm)] placeholder:text-gray-600 border border-transparent focus:outline-none focus:border-[#bababa] "
                placeholder="مثلاً : رضایی"
              />
              {errors.lname && (
                <p className="text-[var(--import)] text-sm mb-2">{errors.lname}</p>
              )}
              {/* شماره تماس گیرنده */}
              <label htmlFor="phone" className="block mb-1 font-semibold mt-3">
                شماره تماس<span className="text-[var(--import)]">*</span>
              </label>
              <input
                id="phone"
                type="text"
                value={phone}
                pattern="\d*"
                maxLength={11}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setPhone(val.slice(0, 11));
                }}
                className={`w-full rounded p-2 mb-2 bg-[var(--sup-sm)] placeholder:text-gray-600 border border-transparent focus:outline-none focus:border-[#bababa]
                 ${
                   phone.length > 0 && phone.length !== 11
                     ? "text-[var(--import)] border-red-400"
                     : "[var(--text-input)] "
                 }`}
                placeholder="مثال : 09123456789"
              />
              {errors.phone && (
                <p className="text-[var(--import)] text-sm mb-2">{errors.phone}</p>
              )}
            </>
          )}

          {/* استان */}
          <label htmlFor="province" className="block mb-1 font-semibold">
            استان<span className="text-[var(--import)]">*</span>
          </label>
          <select
            id="province"
            value={province}
            onChange={(e) => {
              setProvince(e.target.value);
              setCity("");
            }}
            className={`w-full rounded p-2 mb-2 bg-[var(--sup-sm)] border border-transparent focus:outline-none focus:border-[#bababa]  ${
              province === "" ? "text-gray-600 " : "[var(--text-input)] "
            }`}
          >
            <option value="">انتخاب کنید</option>
            {Object.keys(provinces).map((prov) => (
              <option key={prov} value={prov} className="text-[var(--text-input)]">
                {prov}
              </option>
            ))}
          </select>
          {errors.province && (
            <p className="text-[var(--import)] text-sm mb-2">{errors.province}</p>
          )}

          {/* شهر */}
          <label htmlFor="city" className="block mb-1 font-semibold mt-3">
            شهر<span className="text-[var(--import)]">*</span>
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={`w-full rounded p-2 mb-2 bg-[var(--sup-sm)] border border-transparent focus:outline-none focus:border-[#bababa]  ${
              city === "" ? "text-gray-600 " : "[var(--text-input)] "
            }`}
            disabled={!province}
          >
            <option value="">
              {!province ? " ابتدا استان را انتخاب کنید" : "انتخاب کنید"}
            </option>
            {province &&
              provinces[province].map((c) => (
                <option key={c} value={c} className="text-[var(--text-input)]">
                  {c}
                </option>
              ))}
          </select>
          {errors.city && (
            <p className="text-[var(--import)] text-sm mb-2">{errors.city}</p>
          )}

          {/* آدرس */}
          <label htmlFor="address" className="block mb-1 font-semibold mt-3">
            آدرس<span className="text-[var(--import)]">*</span>
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded p-2 mb-2 bg-[var(--sup-sm)] placeholder:text-gray-600 border border-transparent focus:outline-none focus:border-[#bababa] "
            placeholder="مثلاً: شهر. محله. خیابان. پلاک...."
          />
          {errors.address && (
            <p className="text-[var(--import)] text-sm mb-2">{errors.address}</p>
          )}

          {/* کدپستی */}
          <label htmlFor="postalCode" className="block mb-1 font-semibold mt-3">
            کدپستی<span className="text-[var(--import)]">*</span>
          </label>
          <input
            id="postalCode"
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={10}
            value={postalCode}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setPostalCode(val.slice(0, 10));
            }}
            className={`w-full rounded p-2 mb-2 bg-[var(--sup-sm)] placeholder:text-gray-600 border border-transparent focus:outline-none focus:border-[#bababa]  ${
              postalCode.length > 0 && postalCode.length !== 10
                ? "text-[var(--import)] border-red-400"
                : "[var(--text-input)] "
            }`}
            placeholder="مثال :6064554499"
          />
          {errors.postalCode && (
            <p className="text-[var(--import)] text-sm mb-2">{errors.postalCode}</p>
          )}

          {/* دکمه‌ها */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-between mt-4 gap-[8px] ">
            <button
              onClick={onClose}
              type="button"
              className="px-[30px] py-[8px] md:py-[7px] font-semibold text-[105%] md:text-[120%]  w-full lg:w-[50%]  text-[var(--btn)] border border-[var(--btn)] rounded-lg bg-[var(--sup-sm)]"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-[30px] py-[8px] md:py-[7px] font-semibold text-[105%] md:text-[120%]  w-full lg:w-[50%] bg-[var(--btn)] text-white rounded-lg"
            >
              ذخیره آدرس
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default memo(AddressModal);
