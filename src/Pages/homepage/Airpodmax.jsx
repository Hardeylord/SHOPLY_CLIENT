import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard";
import { SkeletonLoad } from "../../Components/SkeletonLoad";
import {Sun, Moon} from "lucide-react";
export const Airpodmax = ({themes}) => {
  const [newDrops, setNewDrops] = useState([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const latestProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8080/latestproducts");
        if (response.ok) {
          const latestProducts = await response.json();
          setNewDrops(latestProducts);
          setIsLoading(false);
          // console.log(latestProducts);
        }
      } catch (error) {}
    };
    latestProducts();
  }, []);
  return (
    <>
      <div>
        {/* HERO */}
        <div
          className={`${themes === "light" ? "light" : "dark2"} 
          bg-[rgb(var(--BgColor))] text-[rgb(var(--textColor))] 
          w-full h-screen font-oswald flex relative 
          overflow-x-hidden justify-center items-center px-4 md:px-0`}
        >
          <div className="md:px-20 z-10">
            <p className="text-2xl sm:text-3xl md:text-5xl text-center">
              AirPods Max deliver stunningly detailed, high-fidelity audio for an
              unparalleled listening experience. Each part of the custom-built
              driver works to produce sound with ultra-low distortion.
            </p>
          </div>
  
          {/* background image */}
          <div className="absolute inset-0 bg-[url(/maxAir.png)] bg-contain bg-no-repeat bg-center" />
        </div>
  
        {/* NEW DROPS */}
        <div
          className={`${themes === "light" ? "bg-muted" : "bg-[rgb(var(--BgColor))]"} 
          text-[rgb(var(--textColor))] font-oswald 
          px-4 sm:px-8 md:px-20 space-y-6 py-10`}
        >
          <div className="flex flex-col md:flex-row md:justify-between">
          <p className="text-2xl md:text-3xl">New Drops</p>
  
          <p className="font-light text-sm sm:text-base md:text-end">
            Classic silhouettes and cutting-edge innovation to build your game
            from the ground up. looking for closet staples,
            <br className="hidden md:block" />
            pops of color with layers to be unpacked, or a whole damn outfit, you
            came to the right place.
          </p>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {loading ? (
              <SkeletonLoad cols={3} />
            ) : (
              newDrops.map((drops, index) => (
                <ProductCard
                  key={index}
                  product={drops}
                  pId={drops.id}
                  pImage={drops.image}
                  pName={drops.name}
                  pDesc={drops.desc}
                  pPrice={drops.price}
                  pRating={Math.floor(drops.rating)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
  
};
