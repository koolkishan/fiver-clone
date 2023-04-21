import Image from "next/image";
import React, { useState } from "react";
import AddReview from "@/components/Gigs/AddReview";
import Reviews from "@/components/Gigs/Reviews";
import { FaStar } from "react-icons/fa";

function Details() {
  const [currentImage, setCurrentImage] = useState("/Pokedex.png");
  const images = ["/Pokedex.png", "/nextportfolio.png"];
  return (
    <div className="col-span-2 flex flex-col gap-3">
      <h2 className="text-2xl font-bold text-[#404145] mb-1">
        I will do unique modern minimalist business logo design with copyrights
      </h2>
      <div className="flex items-center gap-2">
        <div>
          <Image
            src="/kishan.jpeg"
            alt="profile"
            height={30}
            width={30}
            className="rounded-full"
          />
        </div>
        <div className="flex gap-2 items-center">
          <h4 className="text-[#27272a] font-bold">Kishan Sheth</h4>
          <h6 className="text-[#74767e]">@koolkishan</h6>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex text-yellow-500">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <span className="text-yellow-500">4.9</span>
          <span className="text-[#27272a]">(66)</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="max-h-[1000px] max-w-[1000px] overflow-hidden">
          <Image
            src={currentImage}
            alt="Gig"
            height={1000}
            width={1000}
            className="hover:scale-110 transition-all duration-500"
          />
        </div>
        <div className="flex gap-4 flex-wrap">
          {images.map((image) => (
            <Image
              src={image}
              alt="gig"
              height={100}
              width={100}
              key={image}
              onClick={() => setCurrentImage(image)}
              className={`${
                currentImage === image ? "" : "blur-sm"
              } cursor-pointer transition-all duration-500`}
            />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-3xl my-5 font-medium text-[#404145]">
          About this gig
        </h3>
        <div>
          <p>
            Are you looking for a premium quality Logo Design that elevates your
            brand to the next level? Welcome! You are at the perfect place.
          </p>
          <p>
            Clean, Simple, Minimal, Custom, Line art, Typography Brand logo
            designs are here to blow you away.
          </p>
          <p>
            Why Choose Me? Professional, Unique & Fresh Designing Ideas HIGH
            Resolution, Print & Web Ready Files 100% Satisfaction Guaranteed
            Friendly and excellent customer service FREE Unlimited Revisions 3D
            Mockup Affordable cost
          </p>
        </div>
      </div>
      {/* About the seller */}
      <div className="">
        <h3 className="text-3xl my-5 font-medium text-[#404145]">
          About the Seller
        </h3>
        <div className="flex gap-4">
          <div>
            <Image
              src="/kishan.jpeg"
              alt="profile"
              height={120}
              width={120}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex  gap-2 items-center">
              <h4 className="font-medium text-lg">Kishan Sheth</h4>
              <span className="text-[#74767e]">@koolkishan</span>
            </div>
            <div>
              <p>Your Brand, Your Story</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex text-yellow-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <span className="text-yellow-500">4.9</span>
              <span className="text-[#74767e]">(151)</span>
            </div>
          </div>
        </div>
      </div>
      <Reviews />
      <AddReview />
    </div>
  );
}

export default Details;
