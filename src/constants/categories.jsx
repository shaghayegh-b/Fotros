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

export const PRODUCT_CATEGORIES = [
  {
    id: 1,
    name: "همه محصولات",
    icon: AiOutlineProduct,
    url: API_ENDPOINTS.ALL_PRODUCTS,
    filterName: "همه محصولات",
  },
  {
    id: 2,
    name: "مانتو",
    icon: GiPoloShirt,
    url: API_ENDPOINTS.CATEGORY("مانتو"),
    filterName: "مانتو",
  },
  {
    id: 3,
    name: "شلوار و دامن",
    icon: GiSkirt,
    url: API_ENDPOINTS.CATEGORY("شلوار"),
    filterName: "شلوار و دامن",
  },
  {
    id: 4,
    name: "ست",
    icon: PiDressFill,
    url: API_ENDPOINTS.CATEGORY("ست"),
    filterName: "ست",
  },
  {
    id: 5,
    name: "تو خونه‌ای",
    icon: TbHomeHeart,
    url: API_ENDPOINTS.CATEGORY("خونگی"),
    filterName: "تو خونه‌ای",
  },
  {
    id: 6,
    name: "آرایشی‌بهداشتی",
    icon: GiLipstick,
    url: API_ENDPOINTS.CATEGORY("ارایشی"),
    filterName: "آرایشی‌بهداشتی",
  },
  {
    id: 7,
    name: "لباس گرم",
    icon: FaSnowflake,
    url: API_ENDPOINTS.CATEGORY("زمستونه"),
    filterName: "لباس گرم",
  },
  {
    id: 8,
    name: "کیف و کفش",
    icon: PiHandbagSimpleBold,
    url: API_ENDPOINTS.CATEGORY("کیف"),
    filterName: "کیف و کفش",
  },
  {
    id: 9,
    name: "اکسسوری",
    icon: FaGlasses,
    url: API_ENDPOINTS.CATEGORY("اکسسوری"),
    filterName: "اکسسوری",
  },
  {
    id: 10,
    name: "لباس مجلسی",
    icon: GiLargeDress,
    url: API_ENDPOINTS.CATEGORY("مجلسی"),
    filterName: "مجلسی",
  },
  {
    id: 11,
    name: "فروش ویژه",
    icon: TbHeartDiscount,
    url: API_ENDPOINTS.SORT_BY_OFF,
    filterName: "فروش ویژه",
  },
  {
    id: 12,
    name: "اسپورت",
    icon: FaPersonHalfDress,
    url: API_ENDPOINTS.CATEGORY("اسپورت"),
    filterName: "اسپورت",
  },
];
