import { TbTruckDelivery, TbShieldCheck } from "react-icons/tb";
import { MdSupportAgent } from "react-icons/md";

const ITEMS = [
  {
    icon: TbTruckDelivery,
    title: "ارسال سریع به سراسر کشور",
    desc: "تحویل درب منزل در کمترین زمان ممکن",
  },
  {
    icon: TbShieldCheck,
    title: "ضمانت اصالت کالا",
    desc: "همه محصولات ۱۰۰٪ اورجینال هستند",
  },
  {
    icon: MdSupportAgent,
    title: "پشتیبانی پاسخگو",
    desc: "هر روز هفته، همراه شما هستیم",
  },
];

function TrustBadges() {
  return (
    <div className="flex gap-3 overflow-x-auto scroll-contain thin-scroll snap-x snap-mandatory sm:grid sm:grid-cols-3 sm:overflow-visible pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
      {ITEMS.map(({ icon: Icon, title, desc }) => (
        <div
          key={title}
          className="flex items-center gap-4 shrink-0 w-[78%] xs:w-[70%] sm:w-auto snap-start rounded-2xl bg-[var(--cartsm)]/60 p-4 shadow-[var(--card-shadow)] transition-all duration-300 hover:shadow-[var(--card-hover-shadow)] md:p-5"
        >
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--btn)] text-white">
            <Icon size={24} />
          </div>
          <div>
            <p className="font-semibold text-[var(--text)]">{title}</p>
            <p className="text-sm text-[var(--text-gary)]">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrustBadges;
