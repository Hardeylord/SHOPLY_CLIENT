import {
  Check,
  CircleX,
  ImagePlus,
  PackagePlus,
  Pen,
  PenLine,
  Plus,
  RefreshCw,
  Star,
  Trash,
  Trash2,
  X,
} from "lucide-react";
import React, { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import Cookies from "universal-cookie";
import { userContext } from "../Authentication/AuthContext";
import { useContext } from "react";

export const ProductRow = (props) => {
  const { loading, userRole, roles, bearerToken } = useContext(userContext);

  const [disB, setDisb] = useState(true);

  useEffect(() => {
    if (loading) {
      setDisb(true);
    } else {
      if (roles.Admin == userRole) {
        setDisb(false);
      } else {
        setDisb(true);
      }
    }
  }, []);

  const [formData, setFormdata] = useState({
    id: props.id,
    name: props.pName || "",
    desc: props.pDesc || "",
    price: props.pPrice || "",
    rating: props.pRating || "",
    image: props.pImage || [],
  });

  const getVal = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  };

  const [replacementId, setReplacementId] = useState([]);
  const [replacementImage, setReplacementImage] = useState([]);

  const handleEdit = async (e, id) => {
    e.preventDefault();
    // console.log(props.pSetFetching)
    const dataToJava = new FormData();
    dataToJava.append("id", formData.id);
    dataToJava.append("name", formData.name);
    dataToJava.append("desc", formData.desc);
    dataToJava.append("price", formData.price);
    dataToJava.append("rating", formData.rating);
    
    replacementId.forEach((imagesId) => {
      dataToJava.append("imageId", imagesId);
    });
    replacementImage.forEach((images) => {
      dataToJava.append("image", images);
    });

    try {
      const response = await fetch(
        `http://localhost:8080/product/update/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
          body: dataToJava,
        }
      );
      
      if (response.ok) {
        toast.success("Product Succesfully Updated!");
        // window.location.reload();
      } else {
        toast.error("Unable to edit product.");
      }
    } catch (error) {
      toast.error(error);
    } finally{
    }
  };

  const allowedImage = ["image/jpeg", "image/png", "image/jpg"];

  function getImage(e) {
    const images = e.target.files;
    const arrayImages = Array.from(images);
    for (let index = 0; index < arrayImages.length; index++) {
      const element = arrayImages[index];
      if (
        allowedImage.find((validatedImages) => validatedImages == element.type)
      ) {
        setReplacementImage((prev) => [...prev, element]);
      } else {
        toast.error(element.type + " not allowed");
      }
    }
  }

  function replaceImage(image_secure_url, e, id) {
    const nimage = e.target.files;
    const actualImageFile = Array.from(nimage);
    for (let index = 0; index < actualImageFile.length; index++) {
      const element = actualImageFile[index];
      if (
        allowedImage.find((validatedImages) => validatedImages == element.type)
      ) {
        // console.log(id);
        const filteredImage = formData.image.filter(
          (remove) => remove.secure_url !== image_secure_url
        );
        setReplacementId((prev) => [...prev, id]);
        setReplacementImage((prev) => [...prev, element]);
        // console.log(replacementImage, replacementId);
        setFormdata((prev) => ({ ...prev, image: filteredImage }));
        // console.log(props.pImage);
      } else {
        toast.error(element.type + " not allowed");
      }
    }
  }

  function removeImage(image) {
    const filteredImages = replacementImage.filter(
      (remove) => remove !== image
    );
    setReplacementImage(filteredImages);
  }

  const del = async (name, public_id) => {
    const ids = public_id.map((id) => console.log(id.public_id));
    // console.log(public_id)
    try {
      const response = await fetch(`http://localhost:8080/delete/${name}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(ids),
      });

      // console.log(response.formData);
      if (response.ok) {
        toast.success("product deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />
    
      <div className="flex w-full items-center space-x-10">
        <div className="w-1/6">
          <div className="rounded-xs w-fit p-1 bg-white">
            <img
              src={
                props.pImage.length == 0
                  ? "/noImage.jpg"
                  : props.pImage[0].secure_url
              }
              className="size-14  object-cover object-center"
              alt=""
            />
          </div>
        </div>
        <div className="w-2/6">
          <p className="text-[12px] font-oswald">{props.pName} </p>
        </div>
        <div className="w-1/6">
          <p className="text-[12px] font-oswald">${props.pPrice} </p>
        </div>
        <div className="w-1/6">
          <p className="text-[12px] font-oswald">{props.pRating} </p>
        </div>
        <div className="w-1/6">
          <Dialog>
            <DialogTrigger
            //  onClick={logged}
            >
              <section className="flex px-2 py-1 cursor-pointer hover:bg-green-200 bg-green-300 transition-all duration-300 rounded-[5px] space-x-2 items-center">
                <Plus size={16} strokeWidth={1.25} />
                <p className="font-oswald">Edit</p>
              </section>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle className="flex space-x-2 items-center">
                  <PackagePlus size={16} strokeWidth={1.25} />{" "}
                  <p className="font-oswald">Edit</p>
                </DialogTitle>
                <DialogDescription className="font-montserrat text-xl font-medium text-green-600">
                  {props.pName}
                </DialogDescription>
              </DialogHeader>
              <div className="w-full flex gap-4">
                <div className="bg-[#f6f6f6] w-1/2 font-oswald p-4 rounded-[10px]">
                  <form
                    onSubmit={(e) => handleEdit(e, props.id)}
                    className="flex flex-col space-y-4"
                    action=""
                    method="PUT"
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
                    <div className="w-full flex justify-center">
                      {/* <DialogTrigger> */}
                      <button
                        type="submit"
                        onClick={() =>
                          console.log(replacementImage, replacementId)
                        }
                        className="flex justify-center w-[250px] cursor-pointer bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-2 items-center"
                      >
                        <Check size={16} strokeWidth={1.35} />
                        <p>Confirm Edit</p>
                        <Toaster />
                      </button>
                      {/* </DialogTrigger> */}
                    </div>
                  </form>
                </div>
                <div className="w-1/2">
                  <div className="flex-col gap-3 items-center justify-center w-full flex">
                    <p className="text-center">Uploaded Images</p>
                    <div className="flex gap-4">
                      <input
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
                    <div className="w-full flex gap-2">
                      {formData.image
                        ? formData.image.map((image, index) => (
                            <section
                              style={{
                                backgroundImage: `url(${image.secure_url})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                              }}
                              key={index}
                              className="relative h-48 w-1/3"
                            >
                              <input
                                type="file"
                                hidden
                                id="relImage"
                                onChange={(e) =>
                                  replaceImage(
                                    image.secure_url,
                                    e,
                                    image.public_id
                                  )
                                }
                              />
                              <label htmlFor="relImage">
                                <RefreshCw
                                  className="cursor-pointer absolute backdrop-blur-xs rounded-full right-1 top-1"
                                  stroke="white"
                                  strokeWidth={1}
                                />
                              </label>
                            </section>
                          ))
                        : null}

                      {replacementImage.length == 0
                        ? null
                        : replacementImage.map((image, index) => (
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
                              <X
                                onClick={() => removeImage(image)}
                                className="cursor-pointer absolute backdrop-blur-xs rounded-full right-1 top-1"
                                stroke="white"
                                strokeWidth={1}
                              />
                            </section>
                          ))}
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          {/* delete dialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                style={{
                  cursor: disB ? "not-allowed" : "pointer",
                }}
                disabled={disB}
                className="hover:bg-[#dcdcdc] px-2 py-1 rounded-[5px] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2
                  style={{
                    cursor: disB ? "not-allowed" : "pointer",
                  }}
                  size={20}
                  strokeWidth={1.5}
                />
              </button>
            </AlertDialogTrigger>
            {/* <AlertDialogTrigger
              disabled={disB}
              className="hover:bg-[#dcdcdc] px-2 py-1 rounded-[5px]"
            >
              <Trash2 className="cursor-pointer" size={20} strokeWidth={1.5} />
            </AlertDialogTrigger> */}
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="font-oswald">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="font-montserrat">
                  This action cannot be undone.{" "}
                  <span className="font-oswald text-red-700">
                    {props.pName}
                  </span>{" "}
                  will permanently be deleted and remove your data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => del(props.pName, formData.image)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* edit dialog */}
    </>
  );
};

export default ProductRow;
