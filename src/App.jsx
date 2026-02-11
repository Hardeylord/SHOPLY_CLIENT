import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "./Mainlayout/MainLayout";
import { Home } from "./Pages/Home";
import Shop from "./Pages/Shop";
import DashboardLayout from "./Mainlayout/DashboardLayout";
import Dashboard from "./Dashboard/Dashboard";
import Addproduct from "./Dashboard/Addproduct";
import Productdesc from "./Components/Productdesc";
import { userContext } from "./Authentication/AuthContext";
import { useContext } from "react";
import { Login } from "./Pages/Login";
import Load from "./Components/Load";
import SignUp from "./Pages/SignUp";
import { Account } from "./Pages/Accounts/Account";
import { AccountLayout } from "./Mainlayout/AccountLayout";
import { UpgradeAccount } from "./Pages/Accounts/UpgradeAccount";
import { Sales } from "./Dashboard/Sales";

function App() {
  const { LogOut, user, loading, roles, userRole, isLoading } = useContext(userContext);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="shop/:name" element={<Productdesc />} />

            <Route
              path="/user"
              element={
                loading ? (
                  <Load />
                ) : !user ? (
                  <Navigate to="/signin" />
                ) : (
                  <AccountLayout />
                )
              }
            >
              <Route path="account" element={<Account />} />
              <Route path="accountupgrade" element={<UpgradeAccount />} />
            </Route>
          </Route>

          <Route path="signin" element={<Login />} />
          <Route path="signup" element={<SignUp />} />

          <Route
            path="/dashboard"
            element={
              loading ? (
                <Load />
              ) : !user ? (
                <Navigate to="/signin" />
              ) : (userRole === roles.Admin || userRole === roles.Editor) ? (
                <DashboardLayout />
              ) : (
                <Navigate to="/signin" />
              )
            }
          >
            <Route path="admin" element={<Dashboard />} />
            <Route path="addproduct" element={<Addproduct />} />
            <Route path="sales" element={<Sales/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
