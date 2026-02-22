import { Loader2, Search, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const ShopSearch = () => {
  const { name } = useParams();
  const [searchInputs, setSearchInputs] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchDebounced, setSearchDebounced] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const debTime = setTimeout(() => {
      const str = searchInputs;
      setSearchDebounced(str);
    }, 1000);

    return () => clearTimeout(debTime);
  }, [searchInputs]);

  const [searchBtn, setSarchBtn] = useState(false);

  useEffect(() => {
    if (searchBtn) inputRef.current.focus();
    if (searchInputs.trim() === "" || !searchDebounced) {
      return;
    }

    const search = async () => {
      setIsSearching(true);
      try {
        const response = await fetch(
          `https://endearing-creation-production-d435.up.railway.app/search/${searchDebounced}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          // console.log(`HTTP error: ${response.status}`);
          throw new Error(`HTTP error: ${response.status}`);
        }
        setIsSearching(false);
        const data = await response.json();

        setSearchResults(Array.isArray(data) ? data : []);
      } catch (error) {
        // console.log(error + "...this is the error.. FROM CATCH BLOCK");
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    search();
  }, [searchDebounced, searchBtn]);

  const cancel = () => {
    setSarchBtn(false);
    setSearchInputs("");
  };

  const inputRef = useRef(null);

  const openSearch = () => {
    setSarchBtn(!searchBtn);
  };
  return (
    <>
      <div
        style={{
          background: searchBtn ? "#F5F5F5" : "none",
        }}
        className="flex relative rounded-full"
      >
        <input
          className="rounded-l-full transition-all duration-300 p-2 outline-0 font-montserrat text-xs"
          style={{
            // width: searchBtn
            //   ? window.innerWidth < 640
            //     ? "140px" // mobile
            //     : "180px" // desktop
            //   : "0px",
            // padding: searchBtn ? "0.5rem" : "0px",
            width: searchBtn ? "180px" : "0px",
          }}
          type="text"
          onChange={(e) => setSearchInputs(e.target.value)}
          value={searchInputs}
          ref={inputRef}
          placeholder="Search products..."
        />
        {searchBtn ? (
          <div className="absolute flex flex-col h-fit space-y-3 size-20 bg-[#F5F5F5] w-full top-10 z-20 rounded-[9px] shadow-xl/30 px-1 py-1.5">
            {searchDebounced.length > 0 && isSearching ? (
              <div className="flex justify-center items-center">
                <Loader2 strokeWidth={1.5} className="animate-spin" />
              </div>
            ) : null}
            <div className="space-y-3 ">
              {
                searchResults.length > 0 &&
                  searchResults.map((prod, index) => (
                    <Link
                      key={index}
                      to={`/shop/${prod.name}`}
                      onClick={() => cancel()}
                    >
                      <section className="flex gap-2 items-center hover:bg-[#dcdcdc] p-1 rounded-[5px] cursor-pointer">
                        <img
                          src={prod.image[0].secure_url}
                          alt={prod.name}
                          className="size-8 object-center rounded-full object-cover"
                        />

                        <p>{prod.name}</p>
                      </section>
                    </Link>
                  ))
                // : (<p>No result found</p>)
              }
            </div>
            <div className="flex flex-col gap-2 px-1 py-1.5">
              <p className="text-xs font-montserrat">Recent searches</p>
              <div className="flex items-center font-oswald text-xs hover:bg-[#dcdcdc] gap-2 cursor-pointer rounded-[9px] p-2">
                <Search strokeWidth={1.25} className=" size-4" />
                <p>mexico</p>
              </div>
            </div>
          </div>
        ) : null}
        <section className=" flex justify-center md:px-3 md:py-2 items-center md:bg-muted cursor-pointer rounded-full">
          {searchInputs ? (
            <button className="cursor-pointer" onClick={() => cancel()}>
              <X className="size-5" strokeWidth={1.25} />
            </button>
          ) : searchBtn ? (
            <button className="cursor-pointer" onClick={() => cancel()}>
              <X className=" size-5" strokeWidth={1.25} />
            </button>
          ) : (
            <button className="cursor-pointer" onClick={() => openSearch()}>
              <Search className="size-4 md:size-5" />
            </button>
          )}
        </section>
      </div>
    </>
  );
};
