import React from "react";
import { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../Authentication/AuthContext";
const SignUp = () => {
  const navigate = useNavigate();
  const gallery = [
    {
      imageUrl: "/image.jpg",
      imageText:
        "Double-stacked max cushioning meets waterproof GORE-TEX protection for a soft and comfortable ride.",
    },
    {
      imageUrl: "/logBg-min.jpg",
      imageText:
        "the Nike United Academy pants feature bright, gradient colors on the mesh side panels.",
    },
    {
      imageUrl: "/nike4.png",
      imageText: "Designed to give you a terrifying boost of acceleration.",
    },
    {
      imageUrl: "/fashion.jpg",
      imageText: "When you need reliable warmth, pull on this Wolf Tree vest.",
    },
  ];

  const [currenIndex, setCurrentIndex] = useState(0);

  
  const {theme } = useContext(userContext);

  useEffect(() => {
    const automaticsScroll = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= gallery.length - 1) {
          // clearInterval(automaticsScroll);
          return 0;
        }
        return prev + 1;
      });
    }, 5000);
    return () => clearInterval(automaticsScroll);
  }, [currenIndex]);

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    email: "",
  });

  function getVal(e) {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  const sigNUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Account Succesfully Created");
        setTimeout(() => {
          navigate("/user/account");
        }, 2000);
      } else {
        toast.error("Unable to create account");
        console.log(response);
      }
    } catch (error) {
      toast.error("ERR_CONNECTION...Try Again");
    }
  };
  return (
    <div className={`${theme === "light" ? "light" : "dark2"} bg-[rgb(var(--BgColor))] h-screen md:min-h-screen flex flex-col md:flex-row items-center text-[rgb(var(--textColor))] justify-center gap-4  md:p-4`}>
      <div className="w-full md:w-1/3 rounded-xl p-8 space-y-6">
        <h2 className="text-3xl font-oswald text-center">
          Create An Account
        </h2>
        <Toaster />
        {/* Error Message Display */}
        {/* {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg text-center font-medium">
            {error}
          </div>
        )} */}

        <form onSubmit={sigNUp} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-montserrat mb-1"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none text-white  sm:text-sm transition duration-150"
              placeholder="hardey1234"
              onChange={getVal}
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-montserrat mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none block w-full px-4 py-3 border text-white border-gray-300 rounded-lg shadow-sm placeholder-gray-400  sm:text-sm transition focus:outline-none duration-150"
              placeholder="harde1234@gmail.com"
              onChange={getVal}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-montserrat mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none text-white block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-300  sm:text-sm transition duration-150"
              placeholder="••••••••"
              onChange={getVal}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600  border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm"></div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full cursor-pointer flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-montserrat text-white bg-[rgb(var(--btnColor))] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm">
            Already have an account?
            <Link
              to="/signin"
              className="font-montserrat text-[rgb(var(--btnColor))] hover:text-green-500 ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${gallery[currenIndex].imageUrl})`,
        }}
        className="w-2/3 p-8 relative bg-cover hidden md:flex items-end bg-center rounded-tl-4xl rounded-br-4xl h-[90vh]"
      >
        <div className="absolute inset-0 bg-black/40 flex items-center rounded-tl-4xl rounded-br-4xl justify-center" />
        <div className="z-30">
          <p className="text-[#bdbdbd] font-oswald text-xl">
            BLACK FRIDAY UP TO 50% OFF!{" "}
          </p>{" "}
          <p className="text-3xl z-50 text-white font-light">
            {" "}
            {gallery[currenIndex].imageText}{" "}
          </p>{" "}
          <p className="text-[#bdbdbd] font-oswald text-xl">
            Shop up to 50% off across our bestselling categories.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
