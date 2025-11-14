import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { assets } from '../assets/assets';

const HomeSlider = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const desktopBanners = [
    assets.header_banner1,
    assets.header_banner2,
    assets.header_banner3,
    assets.header_banner4,
    assets.header_banner5,
    assets.header_banner6,
    assets.header_banner7,
    assets.header_banner8,
  ];

  const mobileBanners = [
    assets.header_mob1,
    assets.header_mob2,
    assets.header_mob3,
    assets.header_mob4,
    assets.header_mob5,
    assets.header_mob6,
    assets.header_mob7,
    assets.header_mob8,
  ];

  const bannerImages = isMobile ? mobileBanners : desktopBanners;

  return (
    <div className="w-full overflow-hidden">
  <Swiper
    spaceBetween={0}
    slidesPerView={1}
    loop={true}
    autoplay={{ delay: 5000, disableOnInteraction: false }}
    modules={[Autoplay]}
  >
    {bannerImages.map((imgSrc, index) => (
      <SwiperSlide key={index}>
        <img
          src={imgSrc}
          alt={`banner ${index + 1}`}
          className="w-full h-auto object-cover"
        />
      </SwiperSlide>
    ))}
  </Swiper>
</div>

  );
};

export default HomeSlider;
