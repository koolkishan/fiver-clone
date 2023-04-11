import React, { useEffect, useState } from "react";
import FiverrLogo from "./FiverrLogo";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { toggleLoginModal, toggleSignupModal } from "@/app/auth/AuthSlice";

function Navbar() {
  const [navFixed, setNavFixed] = useState(false);
  const { showLoginModal, showSignupModal } = useAppSelector(
    ({ auth }) => auth
  );
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    if (showSignupModal) {
      dispatch(toggleSignupModal(false));
    }
    dispatch(toggleLoginModal(true));
  };

  const handleSignup = () => {
    if (showLoginModal) {
      dispatch(toggleLoginModal(false));
    }
    dispatch(toggleSignupModal(true));
  };

  const links = [
    { linkName: "Fiverr Business", handler: "#", type: "link" },
    { linkName: "Explore", handler: "#", type: "link" },
    { linkName: "English", handler: "#", type: "link" },
    { linkName: "Become a Seller", handler: "#", type: "link" },
    { linkName: "Sign in", handler: handleLogin, type: "button" },
    { linkName: "Join", handler: handleSignup, type: "button2" },
  ];
  useEffect(() => {
    const positionNavbar = () => {
      window.pageYOffset > 0 ? setNavFixed(true) : setNavFixed(false);
    };
    window.addEventListener("scroll", positionNavbar);
    return () => window.removeEventListener("scroll", positionNavbar);
  }, []);

  return (
    <nav
      className={`w-full px-24 flex justify-between items-center py-6  top-0 z-30 transition-all duration-300 ${
        navFixed ? "fixed bg-white" : "absolute bg-transparent"
      }`}
    >
      <div>
        <FiverrLogo fillColor={!navFixed ? "#ffffff" : "#404145"} />
      </div>
      <div className={`flex ${navFixed ? "opacity-100" : "opacity-0"}`}>
        <input
          type="text"
          placeholder="What service are you looking for today?"
          className="w-[30rem] py-2.5 px-4 border"
        />
        <button className="bg-gray-900 py-1.5 text-white w-16 flex justify-center items-center">
          <IoSearchOutline className="fill-white text-white h-6 w-6" />
        </button>
      </div>
      <ul className="flex gap-10 items-center">
        {links.map(({ linkName, handler, type }) => {
          return (
            <li
              key={linkName}
              className={`${
                navFixed ? "text-black" : "text-white"
              } font-medium`}
            >
              {type === "link" && (
                <Link href={handler as string}>{linkName}</Link>
              )}
              {type === "button" && (
                <button onClick={handler as () => {}}>{linkName}</button>
              )}
              {type === "button2" && (
                <button
                  onClick={handler as () => {}}
                  className={`border   text-md font-semibold py-1 px-3 rounded-sm ${
                    navFixed
                      ? "border-[#1DBF73] text-[#1DBF73]"
                      : "border-white text-white"
                  } hover:bg-[#1DBF73] hover:text-white hover:border-[#1DBF73] transition-all duration-500`}
                >
                  {linkName}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
