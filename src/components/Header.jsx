import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../images/logo.png";
import { motion } from "framer-motion";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { Link as ReactLink } from "react-scroll";

import Avatar from "../images/avatar.png";
import {
  MdAddShoppingCart,
  MdAdd,
  MdLogout,
  MdDisabledVisible,
} from "react-icons/md";

import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const location = useLocation();
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header
      className="fixed  z-50 w-screen  p-3 px-4 md:p-6 md:px-16 bg-[#f5f3f3]"
      style={{ boxShadow: "0 2px 6px 0 grey" }}
    >
      {/*destop & tablet*/}
      <div
        className="hidden md:flex w-full h-full items-center 
      justify-between px-4 md:px-0 max-w-6xl mx-auto"
      >
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-[#2e2e2e] text-xl font-bold">City</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-24"
          >
            <Link
              to={"/"}
              className="text-base text-textColor hover:text-[#2e2e2e] 
              duration-100 transition-all ease-in-out cursor-pointer"
            >
              Home
            </Link>

            <Link
              to={"/aboutUs"}
              className="text-base text-textColor hover:text-[#2e2e2e] 
              duration-100 transition-all ease-in-out cursor-pointer"
            >
              About Us
            </Link>
            {location.pathname !== "/aboutUs" &&
              location.pathname !== "/createItem" && (
                <ReactLink
                  to="menu"
                  spy={true}
                  smooth={true}
                  offset={-30}
                  duration={300}
                  className="text-base text-textColor hover:text-[#2e2e2e] 
                  duration-100 transition-all ease-in-out cursor-pointer"
                >
                  Menu
                </ReactLink>
              )}
          </motion.div>
          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdAddShoppingCart className="text-textColor text-2xl cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div
                className="absolute -top-2 -right-2  w-5 h-5 rounded-full bg-red-600 
              flex items-center justify-center"
              >
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.7 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl 
              cursor-pointer rounded-full "
              alt="userprofile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-100 shadow-xl rounded-lg flex 
                flex-col absolute top-12 right-0"
              >
                {user && user.email === "jha04527@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer 
                      hover:bg-slate-100 transition-all duration-100 ease-in-out 
                      text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  className=" px-4 py-2 flex items-center gap-3 cursor-pointer 
                  hover:bg-slate-100 transition-all duration-100 ease-in-out 
                  text-textColor text-base"
                  onClick={logout}
                >
                  Log Out <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/*mobile*/}
      <div className="flex items-center justify-between md:hidden w-full h-full ">
        <div
          className="relative flex items-center justify-center"
          onClick={showCart}
        >
          <MdAddShoppingCart className="text-textColor text-2xl cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-2 -right-2  w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>

        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-[#2e2e2e] text-xl font-bold">City</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl 
            cursor-pointer rounded-full "
            alt="userprofile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-100 shadow-xl rounded-lg 
              flex flex-col absolute top-12 right-0"
            >
              {user && user.email === "jha04527@gmail.com" && (
                <Link to={"/createItem"}>
                  <p
                    className="px-4 py-2 flex items-center gap-3 
                  cursor-pointer hover:bg-slate-100 transition-all 
                  duration-100 ease-in-out text-textColor text-base"
                    onClick={() => setIsMenu(false)}
                  >
                    New Item <MdAdd />
                  </p>
                </Link>
              )}

              <div className="flex flex-col ">
                <Link
                  to={"/"}
                  className="text-base text-textColor 
                  hover:text-headingColor duration-100 transition-all 
                  ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  Home
                </Link>
                <Link
                  to={"/aboutUs"}
                  className="text-base text-textColor 
                  hover:text-headingColor duration-100 transition-all 
                  ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  About Us
                </Link>
                {location.pathname !== "/aboutUs" &&
                  location.pathname !== "/createItem" && (
                    <ReactLink
                      to="menu"
                      spy={true}
                      smooth={true}
                      offset={-30}
                      duration={300}
                      className="text-base text-textColor hover:text-[#2e2e2e] 
                      duration-100 transition-all ease-in-out cursor-pointer px-4 py-2"
                    >
                      Menu
                    </ReactLink>
                  )}
              </div>

              <p
                className="m-2 p-2 rounded-md shadow-md px-4 py-2 
                flex items-center justify-center bg-gray-200 gap-3 
                 cursor-pointer hover:bg-slate-300 transition-all
                duration-100 ease-in-out text-textColor text-base"
                onclick={logout}
              >
                Log Out <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
