import React, { useContext } from "react";
import ProductRow from "./ProductRow";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "@/Components/ui/spinner";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/Components/ui/empty";
import { MoveLeft, MoveRight, Plus, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../Authentication/AuthContext";

export const Allproduct = ({ sort, pSearchInputs }) => {
  const columns = ["IMAGE", "PRODUCT", "PRICE", "EDIT", "DELETE"];

  const { bearerToken, fetchRefreshToken } = useContext(userContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  const [pageSize, setPageSize] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [isLast, setIsLast] = useState(false);
  const [isFirst, setisFirst] = useState(true);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setFetching(true);
        setError(false);

        const product = await fetch(
          `http://localhost:8080/allproducts?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sort}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );
        const gottenProduct = await product.json();
        if (product.ok) {
          setisFirst(gottenProduct.first);
          setIsLast(gottenProduct.last);
          setProducts(gottenProduct.content);
          setTotalElements(gottenProduct.totalElements);
          setFetching(false);
        }
        if (product.status === 401) {
          // setError("Database Unavailable");
          // console.log("Database Unavailable");
          const refreshed = await fetchRefreshToken();
          if (!refreshed) {
            navigate("/signin");
          }
        }
      } catch (error) {
        toast.error("Error occured");
        console.log(error + "....unable to connect to backend");
      } finally {
        setFetching(false);
      }
    };

    fetchApi();
  }, [pageSize, pageNo, sort]);

  function handlePageSize(e) {
    setPageSize(e.target.value);
  }
  function previous() {
    setPageNo((prev) => prev - 1);
  }
  function next() {
    setPageNo((prev) => prev + 1);
  }

  const refresh = () => {
    window.location.reload();
  };

  const start = (pageNo - 1) * pageSize + 1;
  const end = Math.min(pageNo * pageSize, totalElements);

  return (
    <>
      <Toaster />
      <div className="w-full p-4">
        {fetching ? (
          // loader
          <Empty className="w-full h-[70vh]">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Spinner />
              </EmptyMedia>
              <EmptyTitle className="font-oswald">
                Fetching All Products
              </EmptyTitle>
              <EmptyDescription className="font-montserrat">
                Please wait while we fetch all product. Do not refresh the page.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : error ? (
          // <p>unable to fetch product</p> db error
          <div className="w-full flex flex-col space-y-2 justify-center items-center h-[70vh]">
            <p className="font-oswald text-7xl">500</p>
            <p className="font-montserrat text-3xl">
              oops! Internal Server error
            </p>
            <p>Check your network connection</p>
            <section
              onClick={refresh}
              className="flex cursor-pointer bg-green-300 transition-all hover:scale-75 duration-300 py-1.5 rounded-[5px] px-2 space-x-3 items-center"
            >
              <p className="font-oswald">Refresh</p>
            </section>
          </div>
        ) : products.length == 0 ? (
          <div className="w-full flex justify-center items-center h-[70vh]">
            <p className="font-oswald text-7xl">Unable to connect Backend</p>
          </div>
        ) : (
          <div className="grid gap-2 grid-cols-1 grid-rows-1">
            <div className="flex text-[12px] font-oswald w-full text-center items-center space-x-10">
              <div className="w-1/6">
                <p>Image</p>
              </div>
              <div className="w-2/6">
                <p>name</p>
              </div>
              <div className="w-1/6">
                <p> price</p>
              </div>
              <div className="w-1/6">
                <p>rating</p>
              </div>
              <div className="w-1/6">
                <p></p>
              </div>
              <div className="w-1/6">
                <p></p>
              </div>
            </div>
            {products
              .filter((product) => {
                return pSearchInputs.toLowerCase() === ""
                  ? product
                  : product.name.toLowerCase().includes(pSearchInputs);
              })
              .map((product, index) => (
                <ProductRow
                  key={index}
                  pFetching={fetching} 
                  pSetFetching={setFetching}
                  pImage={product.image}
                  pName={product.name}
                  pDesc={product.desc}
                  pPrice={product.price}
                  pRating={Math.floor(product.rating)}
                  id={product.id}
                />
              ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="w-full p-4 flex items-end justify-between font-montserrat text-xs">
        <section>
          <p className="">
            Showing{" "}
            <span className="font-oswald">
              {start}-{end}
            </span>{" "}
            of {totalElements} products
          </p>
        </section>

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
        {/* item/page */}
        <section className="flex gap-2">
          <p>Items Per Page:</p>
          <select
            name=""
            id=""
            onChange={handlePageSize}
            className="border px-2 rounded-full focus:border-white border-[#bdbdbd]"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </section>
      </div>
    </>
  );
};

export default Allproduct;
