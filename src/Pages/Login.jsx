import { React, useContext, useEffect, useState } from "react";
import { userContext } from "../Authentication/AuthContext";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
export const Login = () => {
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

  const navigate = useNavigate();
  const { setUser, setUserRole, setBearerToken, setUserName, theme } =
    useContext(userContext);

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  function getVal(e) {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  const signIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      // console.log(response)
      if (response.ok) {
        const accessToken = await response.text();
        // console.log(accessToken)
        const token = jwtDecode(accessToken);
        setBearerToken(accessToken);
        setUser(true);
        setUserRole(token.role);
        setUserName(token.sub);

        if (token.role === "ADMIN" || token.role === "EDITOR") {
          navigate("/dashboard/admin");
        } else {
          navigate("/user/account");
        }
      }

      if (!response.ok) {
        const message = await response.text();
        if (message.includes("Bad credentials")) {
          toast.error("Invalid Username Or Password");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to Login: " + error);
    }
  };

  return (
    <div className={`${theme === "light" ? "light" : "dark2"} h-screen md:min-h-screen flex flex-col bg-[rgb(var(--BgColor))] md:flex-row items-center justify-center gap-4  md:p-4 text-[rgb(var(--textColor))]`}>
      <Toaster />
      <div className="w-full md:w-1/3 rounded-xl  px-8 space-y-6">
        <h2 className="text-3xl font-oswald text-center">
         Welcome back <br /> Sign In to Your Account
        </h2>

        {/* Error Message Display */}
        {/* {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg text-center font-medium">
            {error}
          </div>
        )} */}

        <form onSubmit={signIn} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-montserrat  mb-1"
            >
              Email
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="appearance-none block w-full px-4 py-3 border border-gray-300 text-white rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-300  sm:text-sm transition duration-150"
              placeholder="shoply@gmail.com"
              onChange={getVal}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-montserrat  mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={getVal}
              required
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-300 sm:text-sm transition duration-150"
              placeholder="••••••••"
            />
          </div>

          <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4   focus:ring-green-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-montserrat hover:text-green-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full cursor-pointer flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-montserrat text-white bg-[rgb(var(--btnColor))] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm">
            Don't have an account?
            <Link
              to="/signup"
              className="font-montserrat hover:text-[rgb(var(--btnColor))] ml-1"
            >
              Sign up
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
