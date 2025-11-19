import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { assets } from '../assets/assets';

const HomeBannerBlogSlider = () => {
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
    assets.banner1,
    assets.banner2,
    assets.banner3,
    assets.banner4,
    assets.banner5,
  ];

  const mobileBanners = [
    assets.blog_image1,
    assets.blog_image2,
    assets.blog_image3,
    assets.blog_image4,
    assets.blog_image5,
    assets.blog_image6,
    assets.blog_image7,
    assets.blog_image8,
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

export default HomeBannerBlogSlider;
