function SkeletonCardSlide() {
  return (
    <div
      className="
        flex flex-col gap-[15px] items-start
        bg-[var(--product)]
        p-4 rounded-2xl
        shadow-[var(--card-shadow)]
        border border-gray-100
        w-full max-w-[250px] mx-auto
        aspect-[3/4] sm:aspect-[4/5] md:aspect-[5/6] lg:aspect-[6/7]
        animate-pulse
      "
    >
      {/* تصویر محصول */}
      <div className="w-full h-[70%] flex items-center justify-center">
        <div className="w-[95%] h-[95%] bg-[var(--cart)] rounded-xl" />
      </div>

      {/* عنوان محصول */}
      <div className="w-full flex justify-center">
        <div className="w-[75%] h-4 bg-[var(--cart)] rounded-lg" />
      </div>

      {/* قیمت */}
      <div className="w-full flex justify-center">
        <div className="w-[55%] h-4 bg-[var(--cart)] rounded-lg" />
      </div>
    </div>
  );
}

export default SkeletonCardSlide;
