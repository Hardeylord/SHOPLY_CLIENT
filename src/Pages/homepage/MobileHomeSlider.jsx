import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { slideArray2 } from "../../data/slideArray2";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "../../Styles.css";

// import required modules
import { EffectCards, Navigation } from "swiper/modules";
import { ArrowUpRight, MoveLeft, MoveRight } from "lucide-react";
export const MobileHomeSlider = ({ themes }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [slide, setSlide] = useState(0);
  function nextSlide() {
    setSlide((prv) => prv + 1);
  }

  function prvSlide() {
    setSlide((prv) => prv - 1);
  }
  return (
    <>
      <div
        className={`${
          themes === "light" ? "light" : "dark2"
        } w-full h-[95vh] flex flex-col gap-4 bg-[rgb(var(--BgColor))] text-[rgb(var(--textColor))] space-y-2 mb-10 px-8 md:px-20 py-2 mt-20 `}
      >
        <section className="flex flex-col md:flex-row md:justify-between">
          <p className="font-oswald text-3xl">Crafted for the youth</p>
          <p className="sm:text-base md:text-end font-oswald font-light">
            Its everything you need and nothing more. <br></br> A collection of
            product extremely practical, both on the inside and out
          </p>
        </section>
        <div className="flex justify-center items-center flex-col gap-3">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards, Navigation]}
            className="mySwiper"
            cardsEffect={{
              rotate: false,
              slideShadows: false,
              perSlideOffset: 14,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
          >
            {slideArray2.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  className="h-full w-full object-cover"
                  src={img.image}
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* price */}
          <div className="flex gap-2">
            <button className="bg-[rgb(var(--btnColor))] cursor-pointer rounded-full p-2">
              <ArrowUpRight strokeWidth={1.75} color="white" />
            </button>
            <section className="font-oswald px-10 text-center border-[rgb(var(--btnColor))] flex justify-center items-center border rounded-full">
              ${slideArray2[slide].price}
            </section>
          </div>

          {/* Navigation */}
          <div className="flex gap-1">
            <button
              ref={prevRef}
              onClick={() => prvSlide()}
              className="bg-[rgb(var(--btnColor))] p-2 flex justify-center rounded-full"
            >
              <MoveLeft color="white" />
            </button>
            <button
              ref={nextRef}
              onClick={() => nextSlide()}
              className="bg-[rgb(var(--btnColor))] p-2 flex cursor-pointer justify-center rounded-full"
            >
              <MoveRight color="white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
