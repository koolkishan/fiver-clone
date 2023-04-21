import React from "react";
import { FaStar } from "react-icons/fa";

function AddReview() {
  return (
    <div>
      <h3 className="text-2xl my-5 font-normal   text-[#404145]">
        Give Kishan Sheth a Review
      </h3>
      <div className="flex  flex-col  items-start justify-start gap-3">
        <textarea
          name=""
          id=""
          className="block p-2.5 w-4/6 text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        ></textarea>
        <div className="flex gap-1">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <button className="flex items-center bg-[#1DBF73] text-white py-2 justify-center text-md relative rounded px-5">
          Add Review
        </button>
      </div>
    </div>
  );
}

export default AddReview;
