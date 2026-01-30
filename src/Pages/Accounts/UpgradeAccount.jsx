import React, { useContext, useState } from "react";
import Cookies from "universal-cookie";
import {jwtDecode} from "jwt-decode"
import toast, { Toaster } from "react-hot-toast";
import { userContext } from "../../Authentication/AuthContext";
export const UpgradeAccount = () => {
  const{userName}=useContext(userContext)
  // const cookies = new Cookies();

  // const token = cookies.get("jwt");

  // const decodedJwt = jwtDecode(token);
  const name = userName;
  const[email, setEmail]=useState({
    email:name
  })

  async function upgradeAccount(params) {
    try {
      const response = await fetch("http://localhost:8080/accountUpgrade", {
        method: "POST",
        credentials:"include",
         headers: {
          "Content-Type":"application/json"
         },
        body: JSON.stringify(email),
      });

      if (!response.ok) {
        toast.error("Check Email Address")
      } else {
        toast.success("Account Successfully Upgaraded!!!")
      }
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <>
    <Toaster/>
    <div className="w-full flex flex-col justify-center items-center space-y-3">
      {/* <p className="font-oswald text-2xl">Welcome {name.slice(0, name.indexOf("@"))}</p> */}
      <p className="font-oswald text-2xl">Welcome {name}</p>
      <p className="text-center">You are so close to been an editor at Shoply.To finish , just click the button below to upgrade your account. The link will be sent to your registered email and valid for only 15 minutes.</p>
      <p className="font-oswald text-2xl py-2 px-4 bg-[#efefef] rounded-[5px]">{name}</p>
      <section onClick={upgradeAccount} className="flex cursor-pointer bg-green-300 py-1.5 px-5 rounded-full space-x-2 items-center">
              {/* <PackageSearch size={16} strokeWidth={1.25} /> */}
              <p className="font-oswald">Upgrade </p>
            </section>
    </div>
    </>
  );
};
