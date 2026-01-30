import React, { useEffect, useState } from "react";
import { AvatarDemo } from "../../Components/AvatarDemo";
import { Link } from "react-router-dom";
import { MoveUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export const Home2 = ({themes}) => {
  const [slidePos, setSlidePos] = useState(0);
  const slider = [
    {
      img: "/heroSect.png",
      bgText: "Built",
      smallText: "by the street",
    },
    {
      img: "/fasho.png",
      bgText: "community",
      smallText: "driven culture",
    },
    {
      img: "/pg.png",
      bgText: "Comfort",
      smallText: "comes first",
    },
    {
      img: "/bgNew.png",
      bgText: "Where",
      smallText: "-a style moment",
    },
    {
      img: "/yelBod.png",
      bgText: "built ",
      smallText: "by the street",
    },
  ];

  useEffect(() => {
    const sliderTimer = setTimeout(() => {
      if (slidePos >= slider.length - 1) {
        return setSlidePos(0);
      }
      setSlidePos((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(sliderTimer);
  }, [slidePos]);
  return (
    <div
      className={`${themes === "light" ? "light" : "dark2"} 
      w-full noisy min-h-screen text-[rgb(var(--textColor))] 
      font-oswald overflow-hidden bg-[rgb(var(--BgColor))] 
      relative flex flex-col md:flex-row px-4 md:px-10 justify-between`}
    >
      {/* LEFT */}
      <div className="w-full md:w-1/3 flex flex-col h-auto md:h-[70vh] space-y-6 md:space-y-10">
        <motion.p
          key={slidePos}
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="font-oswald text-5xl md:text-9xl text-center"
        >
          {slider[slidePos].bgText}
        </motion.p>
  
        <section className="w-full flex justify-center">
          <AvatarDemo />
        </section>
  
        <motion.section
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.5 }}
          className="w-full flex justify-between px-4 md:px-10"
        >
          <p>[©2025]</p>
          <motion.img className="w-6" src="/shape.png" alt="" />
        </motion.section>
  
        <section className="px-4 md:px-20 font-light text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
          >
            From everyday essentials to <br />
            statement pieces, our curated collection is designed to celebrate
            your style, wherever life takes you.
          </motion.p>
        </section>
      </div>
  
      {/* MIDDLE IMAGE */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={slidePos}
          initial={{ y: -40, scale: 1 }}
          animate={{ y: 0, scale: 1.2 }}
          transition={{ duration: 3.5, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ backgroundImage: `url(${slider[slidePos].img})` }}
          className="
            w-full md:w-2/3
            h-[60vh] md:h-full
            relative md:absolute
            md:right-48 md:top-0
            bg-contain md:bg-cover
            bg-no-repeat bg-center
            z-20
          "
        />
      </AnimatePresence>
  
      {/* RIGHT/BOTTOM */}
      <div className="w-full md:w-1/3 font-oswald space-y-6 flex md:flex-col mt-8 md:mt-0">
        <motion.p
          key={slidePos}
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="text-5xl md:text-9xl text-center"
        >
          {slider[slidePos].smallText}
        </motion.p>
  
        <motion.p
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-center md:text-right font-light md:pr-20"
        >
          #FASHION
        </motion.p>
  
        <section className="w-full flex flex-col justify-center items-center md:items-end">
          <p className="font-light text-2xl md:pr-20">320k</p>
          <p className="font-light">INFLUENCED PEOPLE</p>
        </section>
  
        <section className="w-full relative mt-10 flex flex-col items-center md:items-end font-light">
          <div className="size-14 flex items-center justify-center cursor-pointer bg-white rounded-tl-2xl rounded-tr-[5px] rounded-bl-[5px] rounded-br-2xl absolute -top-80 md:top-0 right-30 md:left-36 z-20">
            <Link to="/shop/Bodega%20Summer%20'22%20Lookbook">
              <MoveUpRight />
            </Link>
          </div>
  
          <motion.p
            initial={{ x: -20 }}
            animate={{ x: 20 }}
            transition={{ duration: 1.5 }}
            className="text-center md:text-right mt-6"
          >
            Step into effortless <br />
            elegance with Momento
          </motion.p>
        </section>
      </div>
    </div>
  );
  
};
