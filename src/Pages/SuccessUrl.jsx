import React from "react";
import { useNavigate } from "react-router-dom";
const SuccessUrl = () => {
  const navigate=useNavigate()

  function returnHome() {
    navigate("/user/orders")
  }
  return (
    <div className="py-16 w-full h-screen flex flex-col justify-center items-center">
      <img src="/payment.webp" className="size-60 mt-10" alt="" />
      <div className="flex flex-col justify-center space-y-4 items-center">
        <p className="font-oswald text-5xl text-center">Your Order Has Been Placed</p>
        <p className="font-montserrat text-center">
          we'll notify you once payment has been confirmed
        </p>
        <button onClick={returnHome} className="bg-[rgb(33,100,89)] rounded-xs cursor-pointer text-white text-center p-2 px-5">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default SuccessUrl;
