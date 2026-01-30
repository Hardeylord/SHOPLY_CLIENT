import {
  Check,
  CircleX,
  ImagePlus,
  LoaderCircle,
  PackagePlus,
  Plus,
  RefreshCcw,
  Search,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Checkbox } from "@/Components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import "../Components/rating.css";
import Allproduct from "./Allproduct";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "universal-cookie";
import { SearchProduct } from "./DashBoardComponents/SearchProduct";
import { userContext } from "../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";

export const Addproduct = () => {
  const {fetchRefreshToken, bearerToken} = useContext(userContext)
  const navigate = useNavigate()
  const [formData, setFormdata] = useState({
    id: " ",
    prodId: Math.floor(Date.now() / 1000),
    name: " ",
    desc: " ",
    price: " ",
    rating: " ",
    negotiable: false,
    image: [],
  });
  const [rfresh, setRfresh] = useState(false);
  const [uploading, setUploding] = useState(false);

  const allowedImage = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

  function getVal(e) {
    const { name, value, checked } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
      id: Date.now().toString(),
      negotiable: checked,
    });
  }

  function handleCheckChange(checked) {
    setFormdata({ ...formData, negotiable: checked });
  }

  // function getImage(e) {
  //   const image=e.target.files[0];

  //   if (allowedImage.find(valid=>valid===image.type)) {

  //     const url=URL.createObjectURL(image);
  //     setImageprev(url)
  //     setPresent(true)
  //     setFormdata({...formData, image:image})
  //   } else{
  //     toast.error("jpg || jpeg || png ... allowed")
  //   }
  // }

  function getImage(e) {
    const image = e.target.files;
    const images = Array.from(image);

    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      if (allowedImage.find((validImage) => validImage === element.type)) {
        setFormdata((prev) => ({ ...prev, image: [...prev.image, element] }));
        // setImageprev((prev)=>[...prev, element])
      } else {
        toast.error("jpg || jpeg || png ... allowed only.");
        return false;
      }
    }

    // if (allowedImage.find(valid=>valid===image.type)) {

    //   const url=URL.createObjectURL(image);
    //   setImageprev(url)
    //   setPresent(true)
    //   setFormdata({...formData, image:image})
    // } else{
    //   toast.error("jpg || jpeg || png ... allowed")
    // }
  }

  function removeImage(image) {
    const filteredImages = formData.image.filter((remove) => remove !== image);
    setFormdata((prev) => ({ ...prev, image: filteredImages }));
  }

  const [sortBy, setSortBy] = useState("");

  function sort(value) {
    setSortBy(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(formData);

    const datatoJava = new FormData();

    datatoJava.append("id", formData.id);
    datatoJava.append("prodId", formData.prodId);
    datatoJava.append("name", formData.name);
    datatoJava.append("desc", formData.desc);
    datatoJava.append("price", formData.price);
    datatoJava.append("rating", formData.rating);
    datatoJava.append("negotiable", formData.negotiable)

    for (let index = 0; index < formData.image.length; index++) {
      const element = formData.image[index];
      datatoJava.append("image", element);
    }


    try {
      setUploding(true);
      const res = await fetch("http://localhost:8080/addproduct", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        body: datatoJava,
      });

      if (!res.ok) {
        toast.error("Product Not Added.");
        if (res.status === 401) {
          const refreshed = await fetchRefreshToken()
          if (!refreshed) {
            navigate("/signin")
          }
        }
      } else {
        await toast.promise(
          new Promise((res, reject) => {
            setTimeout(() => res("Product Added Succesfully!"), 2000);
          }),
          {
            loading: "Adding ...",
            success: "Product Added Succesfully!",
            error: "Unable to add product.",
          }
        );
        window.location.reload();
      }
    } catch (error) {
      toast.error("error adding product: " + error);
      const notify = () => toast("Unable to add product");
      console.log(error);
    } finally {
      setFormdata({
        name: " ",
        desc: " ",
        price: " ",
        rating: " ",
      });
    }
  }

  const [searchInputs, setSearchInputs] = useState("");

  return (
    <>
      <div className="w-full items-center justify-between  flex space-x-2">
        <div className="flex items-center gap-2">
          <div className="relative">
            <section
              style={{
                opacity: rfresh ? 1 : 0,
              }}
              className="absolute transition-all duration-300 top-8 bg-white p-1 px-2 rounded-[5px]"
            >
              <p>refresh</p>
            </section>
            <RefreshCcw
              onClick={() => window.location.reload()}
              onMouseEnter={() => setRfresh(true)}
              onMouseLeave={() => setRfresh(false)}
              size={20}
              className="cursor-pointer"
              strokeWidth={1.5}
            />
          </div>
          <SearchProduct pSearchInputs={setSearchInputs} />
        </div>
        <div className="flex items-center gap-2">
          <Select onValueChange={sort}>
            <SelectTrigger className="w-[100px] border-2 shadow-none focus:ring-0 px-2 rounded-full border-[#bdbdbd]">
              <SelectValue placeholder="Sort By...." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>ASC</SelectLabel>
                <SelectItem value="price">price</SelectItem>
                <SelectItem value="rating">ratings</SelectItem>
                <SelectItem value="prodId">created at</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Dialog>
            <DialogTrigger>
              <section className="flex cursor-pointer bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-3 items-center">
                <Plus size={16} strokeWidth={1.25} />
                <p className="font-oswald">Add Product</p>
              </section>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle className="flex space-x-2 items-center">
                  <PackagePlus size={16} strokeWidth={1.25} />{" "}
                  <p className="font-oswald">Add New Product</p>
                </DialogTitle>
                <DialogDescription>General Information</DialogDescription>
              </DialogHeader>
              <div className="flex w-full gap-4">
                <div className="bg-[#f6f6f6] w-1/2 font-oswald p-4 rounded-[10px]">
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-4"
                    action=""
                    method="post"
                  >
                    <label htmlFor="name">Product Name:</label>
                    <input
                      name="name"
                      className="inputField"
                      type="text"
                      placeholder="name"
                      onChange={getVal}
                      required
                      value={formData.name}
                    />

                    <label htmlFor="description">Product Description:</label>
                    <textarea
                      className="inputField"
                      name="desc"
                      id=""
                      cols="30"
                      rows="5"
                      required
                      onChange={getVal}
                      value={formData.desc}
                    ></textarea>

                    <div className="flex w-full gap-4">
                      <div className="flex w-1/2 flex-col">
                        <label htmlFor="price">Product Price:</label>
                        <input
                          className=" inputField"
                          name="price"
                          type="text"
                          placeholder="price"
                          onChange={getVal}
                          required
                          value={formData.price}
                        />
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <label htmlFor="rating">Rating:</label>
                        <input
                          className=" inputField"
                          name="rating"
                          type="text"
                          placeholder="rating"
                          onChange={getVal}
                          required
                          value={formData.rating}
                        />
                      </div>
                    </div>
                    {/* checkbox */}
                    <div className="flex items-center gap-3">
                      <label htmlFor="negotiate">Allow for negotiation ?</label>
                      <Checkbox
                        checked={formData.negotiable}
                        onCheckedChange={handleCheckChange}
                        className="border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                        id="negotiate"
                      />
                    </div>

                    <div className="w-full flex justify-center">
                      {/* <DialogTrigger> */}
                      <button
                        type="submit"
                        disabled={uploading}
                        // onClick={notify}
                        className="flex justify-center w-[250px] cursor-pointer bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-2 items-center"
                      >
                        {uploading ? (
                          <span className="flex items-center gap-2 justify-center">
                            {" "}
                            <LoaderCircle
                              className="animate-spin"
                              size={16}
                              strokeWidth={1.35}
                            />{" "}
                            Adding Product...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 justify-center">
                            <Check size={16} strokeWidth={1.35} /> Add Product
                          </span>
                        )}
                        {/* <p>Add Product</p> */}
                        <Toaster />
                      </button>
                      {/* </DialogTrigger> */}
                    </div>
                  </form>
                </div>
                <div className=" w-1/2">
                  <div className="flex-col gap-3 items-center justify-center w-full flex">
                    <p className="text-center">Upload Image</p>
                    <div className="flex gap-4">
                      <input
                        multiple
                        onChange={getImage}
                        type="file"
                        hidden
                        id="imageFile"
                      />
                      <label
                        htmlFor="imageFile"
                        className="cursor-pointer flex justify-center items-center w-[200px] h-[150px] rounded-[10px] bg-[#dcdcdc] "
                      >
                        <ImagePlus size={16} strokeWidth={1.25} />
                      </label>
                    </div>
                    {/* <div className="w-[80%] h-5 relative overflow-hidden bg-green-200 rounded-full">
                    <span className="absolute flex justify-center -mt-1 w-full items-center">
                      {uploadProgress.toFixed()}%
                    </span>
                    <div
                      style={{
                        width: `${uploadProgress}%`,
                        transition: "width 0.2s ease",
                      }}
                      className="h-full bg-green-600"
                    />
                  </div> */}
                    <div className="w-full flex gap-2">
                      {formData.image
                        ? formData.image.map((image, index) => (
                            <section
                              style={{
                                backgroundImage: `url(${URL.createObjectURL(
                                  image
                                )})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                              }}
                              key={index}
                              className="relative h-48 w-1/3"
                            >
                              <CircleX
                                onClick={() => removeImage(image)}
                                className="cursor-pointer absolute backdrop-blur-xs rounded-full right-1 top-1"
                                stroke="white"
                                strokeWidth={1}
                              />
                            </section>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Allproduct pSearchInputs={searchInputs} sort={sortBy} />
    </>
  );
};

export default Addproduct;
