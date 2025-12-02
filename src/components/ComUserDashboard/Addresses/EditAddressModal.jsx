import React, { memo, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

function EditAddressModal({ open, onClose , address, onSave }) {
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
const [fullAddress, setFullAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
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
  // بارگذاری اطلاعات آدرس وقتی مودال باز شد یا آدرس تغییر کرد
  useEffect(() => {
    if (address) {
      setProvince(address.province || "");
      setCity(address.city || "");
      setFullAddress(address.fullAddress?.split("،").slice(2).join("،") || "");
      setPostalCode(address.postalCode || "");
    }
  }, [address]);
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
    if (!fullAddress) newErrors.fullAddress = "آدرس الزامی است";
    if (!/^\d{10}$/.test(postalCode))
      newErrors.postalCode = "کدپستی باید ۱۰ رقم باشد";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedAddress = {
      ...address,
      province,
      city,
      fullAddress: `${province}، ${city}، ${fullAddress}`,
      postalCode,
    };

    if (onSave) onSave(updatedAddress);

    // ریست فرم و بستن مودال
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
        className="bg-[var(--sup)] w-[95%] md:w-[90%] max-w-md max-h-[98vh] p-6 rounded-xl shadow-lg overflow-y-auto scrollbar-hide"
      >
        <div className="flex justify-between items-center pb-[18px]">
          <h2 className="text-lg font-bold">ویرایش آدرس</h2>
          <MdClose onClick={onClose} className="cursor-pointer text-[22px]" />
        </div>
        <form action="#" onSubmit={handleSave}>
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
          <label htmlFor="fullAddress" className="block mb-1 font-semibold mt-3">
            آدرس<span className="text-[var(--import)]">*</span>
          </label>
          <input
            id="fullAddress"
            type="text"
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
            className="w-full rounded p-2 mb-2 bg-[var(--sup-sm)] placeholder:text-gray-600 border border-transparent focus:outline-none focus:border-[#bababa] "
            placeholder="مثلاً: شهر. محله. خیابان. پلاک...."
          />
          {errors.fullAddress && (
            <p className="text-[var(--import)] text-sm mb-2">{errors.fullAddress}</p>
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
export default memo(EditAddressModal);
