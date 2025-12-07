// SkeletonProfileGrid.jsx
const SkeletonProfileGrid = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-[15px] p-[20px]">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="
            w-full aspect-square rounded-full
            animate-pulse
            bg-[var(--cart)]
            border-[1.2px]
            border-[var(--cartcategory-hover)]
          "
        ></div>
      ))}
    </div>
  );
};

export default SkeletonProfileGrid;
