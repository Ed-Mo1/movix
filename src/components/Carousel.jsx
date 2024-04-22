import { Swiper, SwiperSlide } from "swiper/react";
import { IoArrowForward } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import "swiper/css";
import "swiper/css/navigation";
import { A11y, Navigation } from "swiper/modules";
import CarouselCard from "./CarouselCard";

const Carousel = ({ data, activeTab }) => {
  return (
    <Swiper
      modules={[Navigation, A11y]}
      spaceBetween={20}
      slidesPerView={2}
      breakpoints={{
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4.5,
        },
        1440: {
          slidesPerView: 6,
        },
      }}
      navigation={{
        nextEl: ".button-next",
        prevEl: ".button-prev",
      }}
      className="relative"
    >
      {data?.map((deatils) => (
        <SwiperSlide key={deatils.id} className="flex-shrink-0">
          <CarouselCard {...deatils} active_tab={activeTab} />
        </SwiperSlide>
      ))}
      <button className="button-prev absolute top-[40%] translate-y-[-50%] left-4 max-sm:text-xl text-3xl z-40 transition hover:opacity-100 bg-[#000000] opacity-[.5] p-1 rounded-full">
        <IoArrowBack />
      </button>
      <button className="button-next max-sm:text-xl text-3xl absolute top-[40%] right-4 z-40 translate-y-[-50%] transition hover:opacity-100 bg-[#000000] opacity-[.5]  p-1 rounded-full">
        <IoArrowForward />
      </button>
    </Swiper>
  );
};

export default Carousel;
