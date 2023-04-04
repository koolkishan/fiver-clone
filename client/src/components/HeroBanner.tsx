import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
function HomeBanner() {
  const [image, setImage] = useState(1);
  useEffect(() => {
    const interval = setInterval(
      () => setImage(image >= 6 ? 1 : image + 1),
      10000
    );
    return () => clearInterval(interval);
  }, [image]);
  return (
    <div className="h-[80vh] relative">
      <div className="absolute top-0 left-0 w-full h-full transition-opacity z-0">
        {image === 1 && <Image alt="hero" src="/bg-hero1.webp" fill />}
        {image === 2 && <Image alt="hero" src="/bg-hero2.webp" fill />}
        {image === 3 && <Image alt="hero" src="/bg-hero3.webp" fill />}
        {image === 4 && <Image alt="hero" src="/bg-hero4.webp" fill />}
        {image === 5 && <Image alt="hero" src="/bg-hero5.webp" fill />}
        {image === 6 && <Image alt="hero" src="/bg-hero6.webp" fill />}
      </div>
      <div className="z-10 relative w-[650px] flex justify-center flex-col h-full gap-5 ml-20">
        <h1 className="text-white text-5xl">
          Find the perfect&nbsp;
          <i>freelance</i>
          <br />
          services for your business
        </h1>
        <div className="flex align-middle">
          <div className="relative">
            <IoSearchOutline className="absolute text-gray-500 text-2xl flex align-middle h-full left-2" />
            <input
              type="text"
              className="h-14 w-[450px] pl-10 rounded-md rounded-r-none"
              placeholder={`Try "building mobile app"`}
            />
          </div>
          <button className="bg-[#1DBF73] text-white px-12 text-lg font-semibold rounded-r-md">
            Search
          </button>
        </div>
        <div className="text-white flex gap-4">
          Popular:
          <ul className="flex gap-5">
            <li className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	">
              Website Design
            </li>
            <li className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	">
              Wordpress
            </li>
            <li className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	">
              Logo Design
            </li>
            <li className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	">
              AI Services
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
