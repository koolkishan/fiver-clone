import React from "react";
import FiverrLogo from "./FiverrLogo";
import Link from "next/link";

function Navbar() {
  const links = [
    { linkName: "Fiverr Business", handler: "#", type: "link" },
    { linkName: "Explore", handler: "#", type: "link" },
    { linkName: "English", handler: "#", type: "link" },
    { linkName: "Become a Seller", handler: "#", type: "link" },
    { linkName: "Sign in", handler: "#", type: "link" },
    { linkName: "Join", handler: "#", type: "button" },
  ];
  return (
    <nav className="w-full   px-24 flex justify-between py-6 ">
      <div>
        <FiverrLogo />
      </div>
      <ul className="flex gap-10">
        {links.map(({ linkName, handler, type }) => {
          return (
            <li key={linkName}>
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
