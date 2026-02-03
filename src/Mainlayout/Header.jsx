import {
  Bookmark,
  ChevronRight,
  Home,
  Menu,
  Moon,
  MoveRight,
  ShoppingCart,
  Store,
  Sun,
  SunMoon,
  UserRound,
  X,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "@/Components/ui/menubar";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../Authentication/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { ShopSearch } from "../Components/ShopSearch";
import { PopoverClose } from "@radix-ui/react-popover";
function Header() {
  const {
    user,
    userInfo,
    setCartItems,
    myCart,
    cartItems,
    bearerToken,
    userName,
    theme,
    setTheme,
  } = useContext(userContext);

  let totalPrice = 0;
  if (cartItems.length > 0) {
    const prices = cartItems.map((prod) => prod.price);
    totalPrice = prices.reduce((acum, iV) => acum + iV, 0);
  }

  async function removeItem(id) {
    try {
      const response = await fetch(`http://localhost:8080/remove${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(id),
      });

      if (response.ok) {
        myCart();
        const data = await response.json();
        // console.log(data)
      } else {
        toast.error("Login to access cart");
      }
    } catch (error) {}
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenAcct, setIsOpenAcct] = useState(false);

  useEffect(() => {
    if (isOpen || isOpenMenu || isOpenAcct) {
      // stop scrolling
      document.body.style.overflow = "hidden";
    } else {
      // allow scrolling
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isOpenMenu, isOpenAcct]);

  const [theme1, setTheme1] = React.useState("system");

  const category = [
    {
      name: "Men",
    },
    {
      name: "Women",
    },
    {
      name: "Jordan",
    },
    {
      name: "SKIMS",
    },
    {
      name: "Sport",
    },
  ];

  return (
    <>
      <Toaster />
      <div className="w-full h-12 bg-white flex sticky items-center md:justify-between md:px-10 px-5">
        <div className="flex w-1/3 md:w-1/3 items-center justify-start gap-1">
          <Link to="/">
            <div className="flex justify-center items-center">
              <img src="/logo.svg" className="size-7" alt="" />
              <p className="font-oswald text-xl">Shoply</p>
            </div>
          </Link>
        </div>
        <div className="hidden md:flex w-1/3 font-oswald font-light items-center justify-evenly">
          <p className="">
            <Link to="/">Home</Link>
          </p>
          <p className="">
            <Link to="/shop">Shop</Link>
          </p>
          <p className="">
            <Link to="#">Blog</Link>
          </p>
        </div>
        <div className="flex w-2/3 md:w-1/3 items-center justify-end gap-1 md:gap-3">
          {/* ShopSearch */}
          <ShopSearch />

          {/* cart */}

          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="relative inline-flex items-center justify-center h-10 w-10 rounded-full md:bg-muted cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ShoppingCart className="size-4 md:size-5" />

                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 rounded-full light bg-[rgb(var(--btnColor))] text-[11px] font-semibold text-white flex items-center justify-center ring-2 ring-background">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-72 md:w-96 font-oswald items-center flex flex-col justify-between h-[80vh] md:h-[90vh]">
              <div className="flex justify-between w-full">
                <h1 className="text-xl text-center">My Cart</h1>
                <PopoverClose className="rounded-full p-1 hover:bg-muted transition-colors outline-none">
                  <X className="size-5" />
                  <span className="sr-only">Close cart</span>
                </PopoverClose>
              </div>

              <div className="w-full min-h-[40vh] overflow-y-scroll touch-action-none">
                {cartItems.length > 0 ? (
                  cartItems.map((product, index) => (
                    <div
                      key={index}
                      className="flex w-full p-2 mb-2 gap-2 border-[#dcdcdc] border-[1px] rounded-[18px]"
                    >
                      <div
                        style={{
                          backgroundImage: `url(${product.imageUrl[0].secure_url})`,
                        }}
                        className="w-1/3 h-24 bg-cover bg-center rounded-[10px]"
                      ></div>
                      {/* </div> */}
                      <div className="flex w-2/3 flex-col justify-between">
                        <div className="flex justify-between">
                          <p className="text-xs">{product.productName}</p>
                          <X
                            onClick={() => removeItem(product.productId)}
                            className="cursor-pointer"
                          />
                        </div>
                        <p>${product.price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  // <div>{cartItems.length} hello</div>
                  <div className="w-full h-full flex flex-col justify-center items-center">
                    <p className="">Your cart is empty</p>
                    <img
                      src="/crt.png"
                      className="w-32 h-48 md:h-28"
                      alt=""
                      // srcset=""
                    />
                  </div>
                )}
              </div>

              {/* total */}
              {cartItems.length > 0 ? (
                <div className="flex flex-col w-full">
                  {/* <span className="h-0.5 w-full bg-[#dcdcdc] mb-3"></span> */}

                  <div className="flex justify-between">
                    <p>sub-total</p>
                    <p>${totalPrice}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>tax rate</p>
                    <p>5%</p>
                  </div>
                  <div className="flex justify-between">
                    <p>total items</p>
                    <p>{cartItems.length}</p>
                  </div>
                  <span className="h-0.5 w-full bg-[#dcdcdc] mt-3"></span>
                  <div className="flex justify-between">
                    <p>Total Price</p>
                    <p>${Math.round(totalPrice + totalPrice * 0.05)}</p>
                  </div>
                </div>
              ) : null}

              <button
                style={{
                  cursor: cartItems.length === 0 ? "not-allowed" : "pointer",
                  opacity: cartItems.length === 0 ? 0.6 : 1,
                }}
                disabled={cartItems.length === 0}
                className="flex items-center justify-center md:w-[70%] gap-2 text-[rgb(174,157,108)] light bg-[rgb(var(--btnColor))] rounded-[5px] p-1.5 px-4 cursor-pointer"
                type="submit"
              >
                Proceed To Checkout <MoveRight />
              </button>
            </PopoverContent>
          </Popover>

          {/* User Account */}

          <Popover open={isOpenAcct} onOpenChange={setIsOpenAcct}>
            <PopoverTrigger asChild>
              <UserRound className="cursor-pointer size-5" />
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex  gap-4">
                <Link to="/user/account">
                  <section className="bg-[#bdbdbd] rounded-full h-fit p-2">
                    <UserRound className="cursor-pointer" />
                  </section>
                </Link>
                <div className="space-y-1 flex flex-col">
                  <h4 className="text-sm font-oswald">
                    {user ? <span>{userName}</span> : <span>Shoply</span>}
                  </h4>
                  <p className="text-sm">
                    Sign in and subscribe to our newsletter to get new product
                    updates.
                  </p>
                  {user ? null : (
                    <div className="text-muted-foreground text-xs">
                      <Link to="/signin">
                        <section className="cursor-pointer font-oswald flex light bg-[rgb(var(--btnColor))] transition-all duration-300 p-1.5 rounded-[7px] space-x-2 justify-center">
                          <p className="text-black">Sign in </p>
                        </section>
                      </Link>
                      <Link to="/signup">
                        <section className="p-1.5 text-green-900">
                          Register
                        </section>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div className=" hidden md:flex">
                <button
                  onClick={() => setTheme("light")}
                  className="bg-green-400 rounded-full p-2"
                >
                  <Sun strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => setTheme("dark2")}
                  className="bg-black rounded-full p-2"
                >
                  <Moon color="green" strokeWidth={1.5} />
                </button>
              </div>
            </PopoverContent>
          </Popover>

          {/* mobile menu */}
          <Popover open={isOpenMenu} onOpenChange={setIsOpenMenu}>
            <PopoverTrigger asChild>
              <Menu className="size-5 md:hidden" />
            </PopoverTrigger>
            <PopoverContent className="w-72 font-oswald items-center flex flex-col h-[80vh] space-y-5">
              <div className="flex justify-end w-full">
                <PopoverClose className="rounded-full p-1 hover:bg-muted transition-colors outline-none">
                  <X className="size-5" />
                </PopoverClose>
              </div>

              <div className="w-full space-y-2">
                {category.map((cate, index) => (
                  <section key={index} className="flex justify-between">
                    <p>{cate.name}</p>
                    <ChevronRight />
                  </section>
                ))}
              </div>

              {user ? null : (
                <div className="text-muted-foreground flex gap-2 text-xs">
                  <Link to="/signin">
                    <section className="font-oswald dark2 py-1.5 px-5 text-center bg-[rgb(29,76,69)] text-white flex justify-center items-center border rounded-full">
                      Log in
                    </section>
                  </Link>
                  <Link to="/signup">
                    <section className="font-oswald py-1.5 px-5 text-center border-[rgb(29,76,69)] flex justify-center items-center border rounded-full">
                      Register
                    </section>
                  </Link>
                </div>
              )}

              {/* themeing */}

              <Menubar className="w-72 border-none shadow-none ">
                <MenubarMenu>
                  <MenubarTrigger className="space-x-3">
                    <SunMoon strokeWidth={1.5} />
                    <p>Theme</p>
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarRadioGroup value={theme1} onValueChange={setTheme1}>
                      <MenubarRadioItem
                        onClick={() => setTheme("light")}
                        value="light"
                      >
                        Light
                      </MenubarRadioItem>
                      <MenubarRadioItem
                        onClick={() => setTheme("dark2")}
                        value="dark"
                      >
                        Dark
                      </MenubarRadioItem>
                      {/* <MenubarRadioItem value="system">System</MenubarRadioItem> */}
                    </MenubarRadioGroup>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>

              <div className="font-oswald w-full space-y-2">
                <div className="flex gap-3">
                  <Home strokeWidth={1.25} />
                  <p className="">
                    <Link to="/">Home</Link>
                  </p>
                </div>

                <div className="flex gap-3">
                  <Store strokeWidth={1.25} />
                  <p className="">
                    <Link to="/shop">Shop</Link>
                  </p>
                </div>

                <div className="flex gap-3">
                  <Bookmark strokeWidth={1.25} />
                  <p className="">
                    <Link to="#">Blog</Link>
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
}

export default Header;
