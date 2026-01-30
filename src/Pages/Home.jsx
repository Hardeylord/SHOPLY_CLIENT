import { CircleX } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { Home2 } from "./homepage/Home2";
import { Airpodmax } from "./homepage/Airpodmax";
import { HomeSlide } from "./homepage/HomeSlide";
import Bento from "./homepage/Bento";
import Newsletter from "./homepage/Newsletter";
import { userContext } from "../Authentication/AuthContext";

// import { Checkbox } from "@/components/ui/checkbox";
export const Home = () => {
  const { theme } = useContext(userContext);
  const [prv, setPrv] = useState(null);
  const [imgs, setImgs] = useState([]);

  const validInput = ["image/jpeg", "image/png", "image/jpg"];

  function collectImage(e) {
    const images = e.target.files;
    setPrv(e.target.files[0]);
    const nImage = Array.from(images);
    for (let index = 0; index < nImage.length; index++) {
      const element = nImage[index];
      if (validInput.find((valid) => valid === element.type)) {
        console.log("valid");
        console.log(element);
        setImgs((prev) => [...prev, element]);
      } else {
        console.log(
          element.name + " is an invalid file" + " cause its an " + element.type
        );
        return false;
      }
    }

    // console.log(images);
    // console.log(imgs);

    // console.log(typeof images);
    // if (!validInput.find((valid) => valid === image.type)) {
    //   console.log("not allowed");
    // }

    // const url = URL.createObjectURL(image);
    // console.log(url);

    // setPrv(url);
  }

  function removeImage(itemToRemove) {
    const filteredImage = imgs.filter((remove) => remove !== itemToRemove);
    setImgs(filteredImage);
    console.log(imgs);
  }

  const array = [
    {
      secure_url:
        "https://res.cloudinary.com/dujx04o4m/image/upload/…ts/%20test%20test%20test/feqj1c4gbspalfmhiaab.jpg",
      public_id: "products/ test test test/feqj1c4gbspalfmhiaab",
    },

    {
      secure_url:
        "https://res.cloudinary.com/dujx04o4m/image/upload/…ts/%20test%20test%20test/jha7agnlpzumgcvawkey.jpg",
      public_id: "products/ test test test/jha7agnlpzumgcvawkey",
    },

    {
      secure_url:
        "https://res.cloudinary.com/dujx04o4m/image/upload/…ts/%20test%20test%20test/sgjegevvfcyj9hnpvc3o.png",
      public_id: "products/ test test test/sgjegevvfcyj9hnpvc3o",
    },
  ];

  const [value, setValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [searchInputs, setSearchInputs] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSarching] = useState(false);
  const [price, setPrices] = useState([]);

  // const [isNegotiatable, setIsNego] = useState(false);

  // const handleCheckChange = (checked) => {
  //   // UI libraries usually return the boolean directly in the argument
  //   setIsNego(checked);
  //   console.log("Negotiation allowed:", checked);
  // };

  function check(e) {
    setIsNego(e.target.checked);
  }
  // useEffect(() => {
  //   setInterval(() => {
  //     setValue((prv) => prv + 1);
  //   }, 100);

  //   async function search(params) {
  //     try {
  //       let result = await fetch("http://localhost:8080/");

  //       let res = await result.json();

  //       setProducts(res.content);

  //       const pArray=res.content.map((p)=>(p.price))
  //       let sumPArray=pArray.reduce((accumulator, initialValue)=>accumulator+ initialValue, 0)
  //       setPrices(pArray)
  //       console.log(sumPArray)
  //     } catch (error) {}
  //   }

  //   search();
  // }, []);

  useEffect(() => {
    if (searchInputs.trim() === "") {
      return;
    }

    const search = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/search/${searchInputs}`,
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setSearchResults(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    search();
  }, [searchInputs]);

  const priceTotal = 0;

  return (
    <div
      className={`${
        theme === "light" ? "light" : "dark2"
      } bg-[rgb(var(--BgColor))] w-full overflow-hidden`}
    >
      {/* <Chat_Io/> */}
      <Home2 themes={theme} />
      <Airpodmax themes={theme} />
      <HomeSlide themes={theme} />
      <Bento themes={theme} />
      <Newsletter />
      {array.map((url, index) => (
        <div key={index}>
          <p>{url.secure_url}</p>
          <p>{url.public_id}</p>
        </div>
      ))}

      <input
        type="file"
        multiple
        id="imageFile"
        hidden
        onChange={collectImage}
      />

      <label
        className="bg-green-600 cursor-pointer"
        as="label"
        htmlFor="imageFile"
      >
        Upload
      </label>
      {imgs.map((imag, index) => (
        <section key={index} className="relative">
          <CircleX
            onClick={() => removeImage(imag)}
            className="cursor-pointer absolute left-40 -top-3"
            strokeWidth={1}
          />
          <img
            key={index}
            src={URL.createObjectURL(imag)}
            className="size-48"
            alt=""
          />
        </section>
      ))}
      {/* <img src={imgs[0]} className="size-48" alt="" />
      <img src={imgs[1]} className="size-48" alt="" />
      <img src={imgs[2]} className="size-48" alt="" /> */}
      <ProgressBar value={value} />

      <div className="w-full flex justify-center gap-4 items-center flex-col">
        <input
          type="text"
          onChange={(e) => setSearchInputs(e.target.value)}
          placeholder="search..."
          className="border-2 w-96 rounded-full p-2 border-black"
        />
        <div className="w-96 bg-amber-100 h-fit p-2">
          {searchResults.length > 0
            ? searchResults.map((results, index) => (
                <section key={index}>
                  <p>{results.name}</p>
                </section>
              ))
            : null}
        </div>
      </div>

      {/*
      <table className="w-full">
        <thead>
          <tr className="bg-yellow-500">
            {columns.map((column) => (
              <th>{column}</th>
            ))}
          </tr>
        </thead>

        <tbody className="text-center">
          {products
            .filter((pName) => {
              return searchInputs.toLowerCase() === ""
                ? pName
                : pName.name.toLowerCase().includes(searchInputs);
            })
            .map((prod, index) => (
              <tr key={index}>
                <td>{prod.name}</td>
                <td>{prod.price}</td>
              </tr>
            ))}
        </tbody>
      </table> */}

      {/* <div>
        <label htmlFor="isNegotiatable">Negotiable:</label>
        <input
          onChange={check}
          type="checkbox"
          name="negotiable"
          id="isNegotiatable"
        />
      </div> */}

      {/* <div className="flex items-center gap-3">
        <label htmlFor="rating">Allow for negotiation ?</label>
        <Checkbox
          checked={isNegotiatable}
          onCheckedChange={handleCheckChange}
          className="border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
          id="terms"
        />
      </div> */}
    </div>
  );
};
