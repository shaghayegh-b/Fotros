function SkeletonCardSlide() {
  return (
    <div
      className="flex flex-col gap-[15px] items-start
      bg-[var(--product)] p-4 rounded-2xl
      shadow-[var(--card-shadow)]
      border border-gray-200/40 w-full max-w-[250px] mx-auto
      aspect-[3/4] sm:aspect-[4/5] md:aspect-[5/6] lg:aspect-[6/7]
      animate-pulse"
    >
      {/* جای تصویر */}
      <div className="w-full h-[70%] bg-[var(--cart)] rounded-xl"></div>

      {/* عنوان */}
      <div className="w-[70%] h-4 bg-[var(--cart)] rounded-lg"></div>

      {/* قیمت */}
      <div className="w-[50%] h-4 bg-[var(--cart)] rounded-lg"></div>
    </div>
  );
}

export default SkeletonCardSlide;
