import React from "react";
import { FiClock, FiRefreshCcw } from "react-icons/fi";
import { BiRightArrowAlt } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
function Pricing() {
  const features = [
    "3 concepts included",
    "Logo transparency",
    "Vector file",
    "Printable file",
    "Include 3D mockup",
    "Include source file",
    "Include social media kit",
  ];
  return (
    <div className="sticky top-36 mb-10 h-max w-96">
      <div className="border p-10 flex flex-col gap-5">
        <div className="flex">
          <h4 className="text-md font-normal text-[#74767e]">
            1 Unique Logo Concept + HQ Transparent PNG + 3D Mock-up
          </h4>
          <h6 className="font-medium text-lg">$500</h6>
        </div>
        <div>
          <div className="text-[#62646a] font-semibold text-sm flex gap-6">
            <div className="flex items-center gap-2">
              <FiClock className="text-xl" />
              <span>3 Days Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <FiRefreshCcw className="text-xl" />
              <span>3 Revisions</span>
            </div>
          </div>
          <ul></ul>
        </div>
        <ul className="flex gap-1 flex-col">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <BsCheckLg className="text-[#1DBF73] text-lg" />
              <span className="text-[#4f5156]">{feature}</span>
            </li>
          ))}
        </ul>
        <button className="flex items-center bg-[#1DBF73] text-white py-2 justify-center font-bold text-lg relative rounded">
          <span>Continue</span>
          <BiRightArrowAlt className="text-2xl absolute right-4" />
        </button>
      </div>
      <div className="flex items-center justify-center mt-5">
        <button className=" w-5/6 hover:bg-[#74767e] py-1 border border-[#74767e] px-5 text-[#6c6d75] hover:text-white transition-all duration-300 text-lg rounded font-bold">
          Contact Me
        </button>
      </div>
    </div>
  );
}

export default Pricing;
