import React, { createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { userContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

export const Auth = ({ children }) => {
  const jwtCookie = new Cookies();

  const [user, setUser] = useState(false);
  const [loading, isLoading] = useState(true);
  const [userRole, setUserRole] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [bearerToken, setBearerToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [theme, setTheme] = useState("dark2");

  const roles = {
    Admin: "ADMIN",
    Editor: "EDITOR",
    User: "USER",
  };

  const LogOutUser2 = async () => {
    console.log("clicked...");
    await fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    window.location.reload();
  };

  async function myCart() {
    if (!bearerToken) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/cartItems", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cartItems);
        //  console.log(data.cartItems)
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(props.pId)
  }

  const fetchRefreshToken = async () => {
    try {
      const resp = await fetch("http://localhost:8080/refreshToken", {
        method: "POST",
        credentials: "include",
      });

      // console.log(resp);

      if (resp.ok) {
        const newToken = await resp.text();
        console.log(newToken)
        const token = jwtDecode(newToken);
        setBearerToken(newToken);
        myCart()
        // jwtCookie.set("jwt", newToken);
        setUser(true);
        setUserRole(token.role);
        setUserInfo(token.sub);
        setUserName(token.sub);
        return true;
      }

      return false;
    } catch (error) {
      console.log("...: " + error);
    }
  };

  // useEffect(async () => {
  //   const savedToken = jwtCookie.get("jwt");
  //   // console.log(savedToken)
  //   if (savedToken) {
  //     const decoded = jwtDecode(savedToken);
  //     setUser(true);
  //     setUserInfo(decoded);
  //     setUserRole(decoded.role);
  //     setUserName(decoded.sub);
  //     setBearerToken(savedToken);
  //   } else {
  //     const refreshed = await fetchRefreshToken();
  //     if (!refreshed) {
  //       setUser(null);
  //       setUserRole("");
  //     }
  //   }
  //   // fake 3secs loader
  //   const timer = setTimeout(() => {
  //     myCart();
  //   }, 1000);

  //   isLoading(false);
  //   return () => clearTimeout(timer);
  // }, [bearerToken]);
  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      try {
        // If access token already exists in memory
        if (bearerToken) {
          const decoded = jwtDecode(bearerToken);
          if (!isMounted) return;

          myCart()
          setUser(true);
          setUserInfo(decoded);
          setUserRole(decoded.role);
          setUserName(decoded.sub);
          return;
        }

        // Try refreshing silently
        const refreshed = await fetchRefreshToken();

        if (!refreshed && isMounted) {
          setUser(null);
          setUserRole("");
        }
      } finally {
        if (isMounted) isLoading(false);
      }
    }

    initAuth();

    return () => {
      isMounted = false;
    };
  }, [bearerToken]);

  return (
    <userContext.Provider
      value={{
        LogOutUser2,
        setUserName,
        user,
        setUser,
        theme,
        setTheme,
        loading,
        isLoading,
        myCart,
        setBearerToken,
        userRole,
        roles,
        setUserRole,
        userInfo,
        cartItems,
        setCartItems,
        bearerToken,
        userName,
        fetchRefreshToken,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
