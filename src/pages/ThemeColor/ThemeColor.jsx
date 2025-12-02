function ThemeColor() {
  return (
    <>
      <div className="py-[30px] px-[60px] mx-[auto]">
        کافیه کلاس هارو به اینصورت بدیم!
        <br /> bg-[var(--bg)]
        <br />
        در تم لایت رنگ لایت اعمال میشه و در دارک رنگ دارک!
      </div>
      <div className="flex justify-center items-center gap-[30px]">
        <div className="flex flex-col justify-center items-center text-center gap-[5px]">
          <h3>lighte mode</h3>
          <span className="bg-[#454E5A] p-[6px]  inline-block border-[1px]">
            #0D1521 پس‌زمینه اصلی صفحه
          </span>
          <span className="bg-[#1E88E5] p-[6px]  inline-block border-[1px]">
            #131D2A کارت‌ها، کانتینرها
          </span>
          <span className="bg-[#F4F4F5] p-[6px]  inline-block border-[1px]">
            #193F8C رنگ دکمه‌های پرایمری
          </span>
          <span className="bg-[#ffffff] p-[6px]  inline-block border-[1px]">
            #1E88E5 هاور، اکشن‌ها، لینک‌ها
          </span>
          <span className="bg-[#193F8C] p-[6px]  inline-block border-[1px]">
            #5076AF بوردر، دکمه‌های ثانویه
          </span>
          <span className="bg-[#131D2A] p-[6px]  inline-block border-[1px]">
            #84A7C2 هایلایت‌ها و آیتم‌های فرعی
          </span>
          <span className="bg-[#E1EEFB] p-[6px]  inline-block border-[1px]">
            #BEDBFF تگ‌ها و باکس‌های مهم
          </span>
          <span className="bg-[#BEDBFF] p-[6px]  inline-block border-[1px]">
            #E8EEF6 متن اصلی، آیکون روشن
          </span>
          <span className="bg-[#C8D4E0] p-[6px]  inline-block border-[1px]">
            #C8D4E0 متن‌های ثانویه
          </span>
          <span className="bg-[#F4F4F5] p-[6px]  inline-block border-[1px]">
            #F4F4F5 سفید ملایم برای خوانایی بهتر
          </span>
        </div>
        <div className="flex flex-col justify-center items-center text-center gap-[5px]">
          <h3>darke mode</h3>
          <span className="bg-[#051121] p-[6px]  inline-block border-[1px]">
            bg-[var(--bg)]<br></br>
            پس‌زمینه اصلی صفحه
          </span>
          <span className="bg-[#0a1b2f] p-[6px]  inline-block border-[1px]">
            bg-[var(--cart)] <br />
            کارت‌ها، کانتینرها
          </span>
          <span className="bg-[#e7ecf2] p-[6px]  inline-block border-[1px]">
            bg-[var(--cart-sm)] <br />
            بولد کارت‌ها، کانتینرها
          </span>
          <span className="bg-[#e0e0e0] p-[6px]  inline-block border-[1px]">
            bg-[var(--text)] <br />
            متن ها
          </span>

          
          <span className="bg-[#193F8C] p-[6px]  inline-block border-[1px]">
            #193F8C رنگ دکمه‌های پرایمری
          </span>
          <span className="bg-[#1E88E5] p-[6px]  inline-block border-[1px]">
            #1E88E5 هاور، اکشن‌ها، لینک‌ها
          </span>
          <span className="bg-[#5076AF] p-[6px]  inline-block border-[1px]">
            #5076AF بوردر، دکمه‌های ثانویه
          </span>
          <span className="bg-[#84A7C2] p-[6px]  inline-block border-[1px]">
            #84A7C2 هایلایت‌ها و آیتم‌های فرعی
          </span>
          <span className="bg-[#BEDBFF] p-[6px]  inline-block border-[1px]">
            #BEDBFF تگ‌ها و باکس‌های مهم
          </span>
          <span className="bg-[#E8EEF6] p-[6px]  inline-block border-[1px]">
            #E8EEF6 متن اصلی، آیکون روشن
          </span>
          <span className="bg-[#C8D4E0] p-[6px]  inline-block border-[1px]">
            #C8D4E0 متن‌های ثانویه
          </span>
          <span className="bg-[#F4F4F5] p-[6px]  inline-block border-[1px]">
            #F4F4F5 سفید ملایم برای خوانایی بهتر
          </span>
        </div>
      </div>
    </>
  );
}

export default ThemeColor;
