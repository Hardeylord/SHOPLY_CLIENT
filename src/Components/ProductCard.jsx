import { Handshake, Heart, ShoppingCart, Star } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./rating.css";
import { Link } from "react-router-dom";
import { userContext } from "../Authentication/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import Chat_Io from "../messaging/Chat_Io";

function ProductCard(props) {
  const [cart, setCart] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  const { cartItems, myCart, setCartItems, bearerToken } =
    useContext(userContext);

  // function addToCart(cartItem) {
  //   // console.log(typeof(cartItems))
  //   setCartItems(prev => {
  //     const exists = prev.find(p => p.id === cartItem.id);
  //     if (exists) {
  //       toast.error("Product Already In Cart");
  //       return prev;
  //     }
  //     const updated = [...prev, cartItem]
  //     console.log(updated)

  //     return updated
  //   });
  // }

  async function addToCart2() {
    try {
      const response = await fetch("http://localhost:8080/addToCart", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props.pId),
      });

      if (response.ok) {
        toast.success("Product Added To Cart");
        myCart();
        // const data = await response.json();
        // console.log(data)
      } else {
        toast.error("NET_ERROR OR Login to access cart");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // async function cartItem(){

  //   try {
  //     const response = await fetch("http://localhost:8080/cartItems", {
  //       method: "GET",
  //       headers:{
  //         "Authorization" :  `Bearer ${bearerToken}`
  //       }
  //     })

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data.cartItems)
  //     } else{
  //       console.log(response)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   console.log(props.pId)
  // }

  return (
    <div>
      <Toaster />
      <div className="flex relative">
        {/* icons */}
        <div className="absolute rounded-3xl inset-0 bg-black/0 hover:bg-black/50  transition-colors duration-200 flex items-center justify-center">
          <div className="flex flex-col space-y-2 absolute top-5 left-2">
            <div className="flex space-x-2">
              {/* cart */}
              <ShoppingCart
                color="white"
                className="cursor-pointer"
                strokeWidth={1.25}
                // onClick={()=>addToCart(props.product)}
                onClick={() => addToCart2()}
                onMouseEnter={() => setCart(true)}
                onMouseLeave={() => setCart(false)}
              />
              <div
                style={{
                  opacity: cart ? 1 : 0,
                }}
                className="h-6 transition-all duration-300 flex bg-white items-center p-1 rounded-xs"
              >
                <p className="text-xs font-montserrat">Add To Cart</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {/* wishlist */}
              <Heart
                color="white"
                className="cursor-pointer"
                // onClick={()=>cartItem()}
                strokeWidth={1.25}
                onMouseEnter={() => setWishlist(true)}
                onMouseLeave={() => setWishlist(false)}
              />
              <div
                style={{
                  opacity: wishlist ? 1 : 0,
                }}
                className="h-6 flex transition-all duration-300 bg-white items-center p-1 rounded-xs"
              >
                <p className="text-xs font-montserrat">Wishlist</p>
              </div>
            </div>
            {/* negotiate */}
            {props.pNegotiable ? (<Chat_Io/>) : (null)}
            
          </div>
        </div>
        <img
          src={
            props.pImage.length === 0
              ? "/noImage.jpg"
              : props.pImage[0].secure_url
          }
          className="w-full h-100 rounded-3xl object-cover object-center"
          alt=""
        />
      </div>
      <Link to={`/shop/${props.pName}`}>
        <div className="text-black space-y-1.5">
          <p className="font-medium text-2xl font-oswald">{props.pName}</p>
          <p className="text-xs text-[#4f4f4f] font-montserrat font-medium">
            {props.pDesc.length >= 90
              ? props.pDesc.substring(0, 70)
              : props.pDesc}
          </p>
          <div className="flex flex-row justify-between">
            <p className="font-oswald">${props.pPrice}</p>
            <div className="flex gap-1 mt-2">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    strokeWidth={1.25}
                    className={`heart ${
                      i < props.pRating ? "active" : "fill-none"
                    }`}
                  />
                ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
