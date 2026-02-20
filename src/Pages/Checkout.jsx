import { useContext, useState } from "react";
import { userContext } from "../Authentication/AuthContext";
import { X } from "lucide-react";
export default function Checkout() {
  const { user, myCart, cartItems, bearerToken, userName, setTheme } =
    useContext(userContext);
  let totalPrice = 0;
  if (cartItems.length > 0) {
    const prices = cartItems.map((prod) => prod.price);
    totalPrice = prices.reduce((acum, iV) => acum + iV, 0);
  }

  async function makePayment() {
    try {
      await fetch("http://localhost:8080/checkout/validateCart", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
    } catch (error) {}
  }
  return (
    <>
      <div className="w-full">
        <p className="font-oswald text-5xl">CHECKOUT</p>
        <div className="w-full gap-2 flex flex-col md:flex-row">
          {/* billing forms */}
          <div className="w-full md:w-2/3 py-4">
            <form className="w-full  font-oswald space-y-5" action="">
              <p className="font-light">Personal Information</p>

              <div className="flex w-full gap-4">
                <div className="w-full flex flex-col gap-y-1.5">
                  <label className="ml-2.5" htmlFor="firstname">
                    First Name
                  </label>
                  <input
                    id="firstname"
                    name="firstname"
                    placeholder="john"
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm transition duration-150"
                    type="text"
                  />
                </div>

                <div className="w-full flex flex-col gap-y-1.5">
                  <label className="ml-2.5" htmlFor="lastname">
                    Last Name
                  </label>
                  <input
                    id="lastname"
                    name="lastname"
                    placeholder="doe"
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm transition duration-150"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex w-full gap-4">
                <div className="w-full flex flex-col gap-y-1.5">
                  <label className="ml-2.5" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    placeholder="johndoe@gmail.com"
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm transition duration-150"
                    type="text"
                  />
                </div>

                <div className="w-full flex flex-col gap-y-1.5">
                  <label className="ml-2.5" htmlFor="phonenumber">
                    Phone Number
                  </label>
                  <input
                    id="phonenumber"
                    name="phonenumber"
                    placeholder="090 3172 5065"
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm transition duration-150"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex w-full gap-4">
                <div className="w-full flex flex-col gap-y-1.5">
                  <label className="ml-2.5" htmlFor="City">
                    City
                  </label>
                  <input
                    id="City"
                    name="City"
                    placeholder="ibadan"
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm transition duration-150"
                    type="text"
                  />
                </div>

                <div className="w-full flex flex-col gap-y-1.5">
                  <label className="ml-2.5" htmlFor="State">
                    State
                  </label>
                  <input
                    id="State"
                    name="State"
                    placeholder="oyo"
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm transition duration-150"
                    type="text"
                  />
                </div>

                <div className="w-full flex flex-col gap-y-1.5">
                  <label className="ml-2.5" htmlFor="Zipcode">
                    Zip code
                  </label>
                  <input
                    id="Zipcode"
                    name="Zipcode"
                    placeholder="560021"
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm transition duration-150"
                    type="text"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* order summary */}
          <div className="w-full md:w-1/3 flex flex-col py-4 space-y-4 font-oswald p-2 bg-white">
            <p className="font-light">Shopping Bag ({cartItems.length})</p>
            <div className="flex flex-col gap-2">
              {cartItems.length > 0 &&
                cartItems.map((product, index) => (
                  <div className="flex justify-between" key={index}>
                    <div className="flex gap-2">
                      <div
                        style={{
                          backgroundImage: `url(${product.imageUrl[0].secure_url})`,
                        }}
                        className="size-12 bg-cover bg-center rounded-[5px]"
                      ></div>
                      <div>
                        <p className="text-xs">{product.productName}</p>
                      </div>
                    </div>
                    <div>
                      <p>${product.price}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex">
              <input
                placeholder="Coupon Code"
                className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-xs shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm"
                type="text"
              />
              <section className="bg-[rgb(33,100,89)] text-white p-2 px-5">
                Apply
              </section>
            </div>

            {/* price summary */}
            <div className="flex flex-col w-full">
              <div className="flex justify-between">
                <p className="font-light">sub-total</p>
                <p>${totalPrice}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-light">tax rate</p>
                <p>5%</p>
              </div>
              <div className="flex justify-between">
                <p className="font-light">total items</p>
                <p>{cartItems.length}</p>
              </div>
              <span className="h-0.5 w-full bg-[#dcdcdc] mt-3"></span>
              <div className="flex justify-between">
                <p>Total Price</p>
                <p>${Math.round(totalPrice + totalPrice * 0.05)}</p>
              </div>
            </div>

            <section
              onClick={() => makePayment()}
              className="bg-[rgb(33,100,89)] rounded-xs cursor-pointer text-white text-center p-2 px-5"
            >
              Continue to Payment
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
