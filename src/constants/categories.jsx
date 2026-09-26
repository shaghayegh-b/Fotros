import { API_ENDPOINTS } from "./apiEndpoints";

// آیکون‌ها
import {
  GiLargeDress,
  GiLipstick,
  GiPoloShirt,
  GiSkirt,
} from "react-icons/gi";
import { PiDressFill, PiHandbagSimpleBold } from "react-icons/pi";
import { TbHomeHeart, TbHeartDiscount } from "react-icons/tb";
import { FaSnowflake, FaGlasses, FaPersonHalfDress } from "react-icons/fa6";
import { AiOutlineProduct } from "react-icons/ai";

// نکته مهم: filterName فقط برای نمایش (عنوان صفحه/دکمه‌ها) استفاده میشه.
// matchCategory همون کلمه‌ای هست که واقعاً توی url به عنوان category=... به
// سرور فرستاده میشه و باید با فیلد category محصولات توی دیتابیس یکی باشه.
// قبلاً این دو تا قاطی شده بودن و همین باعث میشد فیلتر «محصولات موجود» یا
// مرتب‌سازی، لیست محصولات رو خالی نشون بده.
export const PRODUCT_CATEGORIES = [
  {
    id: 1,
    name: "همه محصولات",
    icon: AiOutlineProduct,
    url: API_ENDPOINTS.ALL_PRODUCTS,
    filterName: "همه محصولات",
    matchCategory: null, // یعنی همه چیز، فیلتر دسته‌بندی اعمال نشه
  },
  {
    id: 2,
    name: "مانتو",
    icon: GiPoloShirt,
    url: API_ENDPOINTS.CATEGORY("مانتو"),
    filterName: "مانتو",
    matchCategory: "مانتو",
  },
  {
    id: 3,
    name: "شلوار و دامن",
    icon: GiSkirt,
    url: API_ENDPOINTS.CATEGORY("شلوار"),
    filterName: "شلوار و دامن",
    matchCategory: "شلوار",
  },
  {
    id: 4,
    name: "ست",
    icon: PiDressFill,
    url: API_ENDPOINTS.CATEGORY("ست"),
    filterName: "ست",
    matchCategory: "ست",
  },
  {
    id: 5,
    name: "تو خونه‌ای",
    icon: TbHomeHeart,
    url: API_ENDPOINTS.CATEGORY("خونگی"),
    filterName: "تو خونه‌ای",
    matchCategory: "خونگی",
  },
  {
    id: 6,
    name: "آرایشی‌بهداشتی",
    icon: GiLipstick,
    url: API_ENDPOINTS.CATEGORY("ارایشی"),
    filterName: "آرایشی‌بهداشتی",
    matchCategory: "ارایشی",
  },
  {
    id: 7,
    name: "لباس گرم",
    icon: FaSnowflake,
    url: API_ENDPOINTS.CATEGORY("زمستونه"),
    filterName: "لباس گرم",
    matchCategory: "زمستونه",
  },
  {
    id: 8,
    name: "کیف و کفش",
    icon: PiHandbagSimpleBold,
    url: API_ENDPOINTS.CATEGORY("کیف"),
    filterName: "کیف و کفش",
    matchCategory: "کیف",
  },
  {
    id: 9,
    name: "اکسسوری",
    icon: FaGlasses,
    url: API_ENDPOINTS.CATEGORY("اکسسوری"),
    filterName: "اکسسوری",
    matchCategory: "اکسسوری",
  },
  {
    id: 10,
    name: "لباس مجلسی",
    icon: GiLargeDress,
    url: API_ENDPOINTS.CATEGORY("مجلسی"),
    filterName: "مجلسی",
    matchCategory: "مجلسی",
  },
  {
    id: 11,
    name: "فروش ویژه",
    icon: TbHeartDiscount,
    url: API_ENDPOINTS.SORT_BY_OFF,
    filterName: "فروش ویژه",
    matchCategory: null, // یه دسته واقعی نیست، محصولات تخفیف‌دار از همه‌ی دسته‌هاست
  },
  {
    id: 12,
    name: "اسپورت",
    icon: FaPersonHalfDress,
    url: API_ENDPOINTS.CATEGORY("اسپورت"),
    filterName: "اسپورت",
    matchCategory: "اسپورت",
  },
];
