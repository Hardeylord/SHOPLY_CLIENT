import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import Load from "../Components/Load";
import { MoveLeft, MoveRight } from "lucide-react";
import { SkeletonLoad } from "../Components/SkeletonLoad";

function Shop() {
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(false);

  const[isLast, setIsLast]=useState(false);
  const[isFirst, setisFirst]=useState(true);
  const [page, setPage] = useState(1);
  const next = () => {
    setPage((prv) => prv + 1);
  };

  const previous = () => {
    setPage((prv) => prv - 1);
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setFetching(true);

        const product = await fetch(`http://localhost:8080/?pageNo=${page}`);
        const gottenProduct = await product.json();

        setProducts(gottenProduct.content);
        setIsLast(gottenProduct.last)
        setisFirst(gottenProduct.first)
        setFetching(false);
        // console.log(gottenProduct);
      } catch (error) {}
    };

    fetchApi();
  }, [page]);

  return (
    <>
      <div className="w-full h-fit">
        {fetching ? (
          // loader
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-9 px-10 py-4">
          <SkeletonLoad cols={6} />
          </div>
        ) : (
          // products
          <div className="w-full h-fit px-10 py-16 space-y-2.5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-9">
              {products.map((product, index) => (
                <ProductCard
                  key={index}
                  fetch={fetching}
                  product={product}
                  pId={product.id}
                  pImage={product.image}
                  pName={product.name}
                  pDesc={product.desc}
                  pNegotiable={product.negotiable}
                  pPrice={product.price}
                  pRating={Math.floor(product.rating)}
                />
              ))}
            </div>

            {/* pagination */}
            <div className="flex gap-1">
              <button
                style={{
                  cursor: isFirst ? "not-allowed" : "pointer",
                  opacity: isFirst ? 0.6 : 1,
                }}
                disabled={isFirst}
                onClick={previous}
                className="bg-[#dcdcdc] px-1 w-7 flex justify-center rounded-xs"
              >
                <MoveLeft />
              </button>
              <button
                style={{
                  cursor: isLast ? "not-allowed" : "pointer",
                  opacity: isLast ? 0.6 : 1,
                }}
                disabled={isLast}
                onClick={next}
                className="bg-[#dcdcdc] px-1 w-7 flex cursor-pointer justify-center rounded-xs"
              >
                <MoveRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Shop;
