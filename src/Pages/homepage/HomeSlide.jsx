import { ArrowUpRight, MoveLeft, MoveRight } from "lucide-react";
import React, { useState } from "react";
import { slideArray2 } from "../../data/slideArray2";
import { MobileHomeSlider } from "./MobileHomeSlider";

export const HomeSlide = ({ themes }) => {
  const [expanded, setExpanded] = useState(0);

  const expand = (index) => {
    setExpanded(index);
  };

  return (
    <>
      <div
        className={`${
          themes === "light" ? "light" : "dark2"
        } w-full h-[95vh] hidden md:flex flex-col gap-4 bg-[rgb(var(--BgColor))] text-[rgb(var(--textColor))] space-y-2 mb-10 px-8 md:px-20 py-2 mt-20 `}
      >
        <section className="flex flex-col md:flex-row md:justify-between">
          <p className="font-oswald text-3xl">Crafted for the youth</p>
          <p className="sm:text-base md:text-end font-oswald font-light">
            Its everything you need and nothing more. <br></br> A collection of
            product extremely practical, both on the inside and out
          </p>
        </section>
        <div className="flex-1 w-full flex gap-3">
          {slideArray2.map((items, i) => (
            <div
              style={{
                width: i === expanded ? "40%" : "20%",
              }}
              key={i}
              className="transition-all duration-300 flex flex-col gap-2"
            >
              <div
                style={{
                  backgroundImage: `url(${items.image})`,
                }}
                className=" bg-cover bg-center w-full h-full rounded-[40px]"
              ></div>
              <div className="flex gap-2">
                <button
                  onClick={() => expand(i)}
                  className="bg-[rgb(var(--btnColor))] cursor-pointer rounded-full p-2"
                >
                  <ArrowUpRight strokeWidth={1.75} color="white" />
                </button>
                <section className="font-oswald px-10 text-center border-[rgb(var(--btnColor))] flex justify-center items-center border rounded-full">
                  ${items.price}
                </section>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-1">
          <button className="bg-[rgb(var(--btnColor))] p-2 flex justify-center rounded-full">
            <MoveLeft color="white" />
          </button>
          <button className="bg-[rgb(var(--btnColor))] p-2 flex cursor-pointer justify-center rounded-full">
            <MoveRight color="white" />
          </button>
        </div>
      </div>
      <div className="md:hidden">
        <MobileHomeSlider themes={themes} />
      </div>
    </>
  );
};
