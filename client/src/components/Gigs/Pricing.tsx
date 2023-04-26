import React from "react";
import { FiClock, FiRefreshCcw } from "react-icons/fi";
import { BiRightArrowAlt } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { useStateProvider } from "@/context/StateContext";
import { useRouter } from "next/router";
function Pricing() {
  const [{ gigData }, dispatch] = useStateProvider();
  const router = useRouter();

  return (
    <>
      {gigData && (
        <div className="sticky top-36 mb-10 h-max w-96">
          <div className="border p-10 flex flex-col gap-5">
            <div className="flex justify-between">
              <h4 className="text-md font-normal text-[#74767e]">
                {gigData.shortDesc}
              </h4>
              <h6 className="font-medium text-lg">${gigData.price}</h6>
            </div>
            <div>
              <div className="text-[#62646a] font-semibold text-sm flex gap-6">
                <div className="flex items-center gap-2">
                  <FiClock className="text-xl" />
                  <span>{gigData.deliveryTime} Days Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiRefreshCcw className="text-xl" />
                  <span>{gigData.revisions} Revisions</span>
                </div>
              </div>
              <ul></ul>
            </div>
            <ul className="flex gap-1 flex-col">
              {gigData.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <BsCheckLg className="text-[#1DBF73] text-lg" />
                  <span className="text-[#4f5156]">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className="flex items-center bg-[#1DBF73] text-white py-2 justify-center font-bold text-lg relative rounded"
              onClick={() => router.push(`/checkout?gigId=${gigData.id}`)}
            >
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
      )}
    </>
  );
}

export default Pricing;
