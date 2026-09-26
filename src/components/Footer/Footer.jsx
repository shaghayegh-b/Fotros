import { memo, useState } from "react";
import img from "../../assets/img/wingfotros.png";
import logo1 from "../../assets/img/mojavez-footer.png";

import {
  FaInstagram,
  FaTelegramPlane,
} from "react-icons/fa";
import { MdOutlinePhone, MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

const LINK_GROUPS = [
  {
    title: "درباره فطروس",
    links: [
      { label: "درباره ما", to: "/Fotros/aboutme" },
      { label: "تماس با ما", to: "/Fotros/contactus" },
      { label: "سوالات متداول", to: "/Fotros/questions" },
    ],
  },
  {
    title: "خدمات مشتریان",
    links: [
      { label: "قوانین و مقررات", to: "/Fotros/rules" },
      { label: "شرایط بازگشت کالا", to: "/Fotros/repol" },
      { label: "پیگیری سفارش", to: "/Fotros/userdashboard/Orders" },
    ],
  },
];


function FooterLinkGroup({ title, links }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/10 py-3 md:border-none md:py-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-base font-semibold md:pointer-events-none md:mb-3"
      >
        {title}
        <MdKeyboardArrowDown
          className={`transition-transform md:hidden ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <ul
        className={`flex flex-col gap-2 text-sm text-[var(--text-footer)]/80 ${
          open ? "mt-3 flex" : "hidden"
        } md:flex md:mt-0`}
      >
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="transition-colors hover:text-[var(--btn)]">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer bg-[var(--footer)] text-[var(--text-footer)]">
      {/* ستون‌های اصلی */}
      <div className="container-page grid grid-cols-1 gap-8 py-8 md:grid-cols-4">
        {/* برند + شبکه‌های اجتماعی */}
        <div className="flex flex-col gap-4">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <img src={img} className="logo w-8" alt="لوگو فطروس" />
            فطروس
          </h2>
          <p className="text-sm text-[var(--text-footer)]/70">
            مد و پوشاک زنانه با کیفیت، برای همه‌ی سلیقه‌ها.
          </p>
          <div className="flex gap-3">
            <a
              href="https://instagram.com/shaghayeghbazrafkan-"
              title="اینستاگرام"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-current transition-colors hover:bg-[var(--btn)] hover:text-white"
            >
              <FaInstagram />
            </a>
            <a
              href="https://t.me/bazrafkannjad"
              title="کانال تلگرام"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-current transition-colors hover:bg-[var(--btn)] hover:text-white"
            >
              <FaTelegramPlane />
            </a>
            <a
              href="tel:+989399619640"
              title="شماره تماس"
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-current transition-colors hover:bg-[var(--btn)] hover:text-white"
            >
              <MdOutlinePhone />
            </a>
          </div>
        </div>

        {/* گروه لینک‌ها */}
        {LINK_GROUPS.map((group) => (
          <FooterLinkGroup key={group.title} {...group} />
        ))}

        {/* خبرنامه */}
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold">عضویت در خبرنامه</h3>
          <p className="text-sm text-[var(--text-footer)]/70">
            از تخفیف‌ها و محصولات جدید باخبر شو.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex overflow-hidden rounded-xl border border-[var(--navbar-searchbar-bg)] "
          >
            <input
              type="email"
              required
              placeholder="ایمیل شما"
              className="w-full bg-transparent px-3 py-2 text-sm outline-none"
            />
            <button
              type="submit"
              className="shrink-0 bg-[var(--btn)] px-4 text-sm font-medium text-white transition-colors hover:bg-[#1565c0]"
            >
              عضویت
            </button>
          </form>
        </div>
      </div>

      {/* پایین فوتر */}
      <div className="container-page flex flex-col items-center justify-between gap-3 border-t border-black/10 py-5 text-xs text-[var(--text-footer)]/60 md:flex-row">
        <span>© تمامی حقوق برای فروشگاه فطروس محفوظ است.</span>
        <img src={logo1} alt="نماد اعتماد" className="h-[70px] " />
      </div>
    </div>
  );
}
export default memo(Footer);
