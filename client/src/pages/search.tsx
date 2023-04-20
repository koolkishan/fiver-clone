import SearchGridItem from "@/components/Search/SearchGridItem";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";
function Search() {
  return (
    <div className="mx-24 mb-24">
      <h3 className="text-4xl mb-10">
        Results for <strong>nextjs website</strong>
      </h3>
      <div className="flex gap-4">
        <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
          Category
        </button>
        <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
          Budget
        </button>
        <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
          Delivery Time
        </button>
      </div>
      <div>
        <div className="my-4">
          <span className="text-[#74767e] font-medium ">
            608 services available
          </span>
        </div>
        <div className="grid grid-cols-4">
          <SearchGridItem />
          <SearchGridItem />
          <SearchGridItem />
          <SearchGridItem />
          <SearchGridItem />
          <SearchGridItem />
          <SearchGridItem />
          <SearchGridItem />
          <SearchGridItem />
          <SearchGridItem />
          <SearchGridItem />
          <SearchGridItem />
          <SearchGridItem />
          <SearchGridItem />
          <SearchGridItem />
          <SearchGridItem />
          <SearchGridItem />
          <SearchGridItem />
          <SearchGridItem />
          <SearchGridItem />
        </div>
      </div>
    </div>
  );
}

export default Search;
