import React, { useEffect, useState } from "react";
import FiverrLogo from "./FiverrLogo";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";

function Navbar() {
  const [navFixed, setNavFixed] = useState(false);
  const links = [
    { linkName: "Fiverr Business", handler: "#", type: "link" },
    { linkName: "Explore", handler: "#", type: "link" },
    { linkName: "English", handler: "#", type: "link" },
    { linkName: "Become a Seller", handler: "#", type: "link" },
    { linkName: "Sign in", handler: "#", type: "link" },
    { linkName: "Join", handler: "#", type: "button" },
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
      <ul className="flex gap-10">
        {links.map(({ linkName, handler, type }) => {
          return (
            <li
              key={linkName}
              className={`${
                navFixed ? "text-black" : "text-white"
              } font-medium`}
            >
              {type === "link" && <Link href={handler}>{linkName}</Link>}
              {type === "button" && <button>{linkName}</button>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
