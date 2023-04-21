import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

function Reviews() {
  return (
    <div>
      <h3 className="text-2xl my-5 font-normal text-[#404145]">Reviews</h3>
      <div className="flex gap-3 mb-5">
        <h5>211 reviews for this Gig</h5>
        <div className="flex text-yellow-500 items-center gap-2">
          <div className="flex gap-1">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <span>5</span>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex gap-3">
          <div>
            <Image
              src="/kishan.jpeg"
              height={150}
              width={150}
              alt="profile"
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4>Kishan Sheth</h4>
            <div className="flex text-yellow-500 items-center gap-2">
              <div className="flex gap-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <span>5</span>
            </div>
            <p className="text-[#404145] pr-20">
              Adeeb worked quickly to put together a great Amazon store for my
              business that not only captured the brand’s vision but vibrantly
              displays the products in a beautiful and enticing way. This new
              store will help drive sales for my products and help my brand look
              more professional!
            </p>
          </div>
        </div>
        <div className="flex gap-3 border-t pt-6">
          <div>
            <Image
              src="/kishan.jpeg"
              height={150}
              width={150}
              alt="profile"
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4>Kishan Sheth</h4>
            <div className="flex text-yellow-500 items-center gap-2">
              <div className="flex gap-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <span>5</span>
            </div>
            <p className="text-[#404145] pr-20">
              Adeeb worked quickly to put together a great Amazon store for my
              business that not only captured the brand’s vision but vibrantly
              displays the products in a beautiful and enticing way. This new
              store will help drive sales for my products and help my brand look
              more professional!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
