import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddReview from "../../components/Gigs/AddReview";
import Reviews from "../../components/Gigs/Reviews";
import { FaStar } from "react-icons/fa";
import { useStateProvider } from "../../context/StateContext";
import { HOST } from "../../utils/constants";

function Details() {
  const [{ gigData, hasOrdered }] = useStateProvider();
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    if (gigData) {
      setCurrentImage(gigData.images[0]);
    }
  }, [gigData]);

  const [averageRatings, setAverageRatings] = useState("0");
  useEffect(() => {
    if (gigData && gigData.reviews.length) {
      let avgRating = 0;
      gigData.reviews.forEach(({ rating }) => (avgRating += rating));
      setAverageRatings((avgRating / gigData.reviews.length).toFixed(1));
    }
  }, [gigData]);

  return (
    <>
      {gigData && currentImage !== "" && (
        <div className="col-span-2 flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-[#404145] mb-1">
            {gigData.title}
          </h2>
          <div className="flex items-center gap-2">
            <div>
              {gigData.createdBy.profileImage ? (
                <Image
                  src={HOST + "/" + gigData.createdBy.profileImage}
                  alt="profile"
                  height={30}
                  width={30}
                  className="rounded-full"
                />
              ) : (
                <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                  <span className="text-xl text-white">
                    {gigData.createdBy.email[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-2 items-center">
              <h4 className="text-[#27272a] font-bold">
                {gigData.createdBy.fullName}
              </h4>
              <h6 className="text-[#74767e]">@{gigData.createdBy.username}</h6>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer ${
                      Math.ceil(averageRatings) >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-yellow-500">{averageRatings}</span>
              <span className="text-[#27272a]">({gigData.reviews.length})</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="max-h-[1000px] max-w-[1000px] overflow-hidden">
              <Image
                src={HOST + "/uploads/" + currentImage}
                alt="Gig"
                height={1000}
                width={1000}
                className="hover:scale-110 transition-all duration-500"
              />
            </div>
            <div className="flex gap-4 flex-wrap">
              {gigData.images.length > 1 &&
                gigData.images.map((image) => (
                  <Image
                    src={HOST + "/uploads/" + image}
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
              <p>{gigData.description}</p>
            </div>
          </div>
          {/* About the seller */}
          <div className="">
            <h3 className="text-3xl my-5 font-medium text-[#404145]">
              About the Seller
            </h3>
            <div className="flex gap-4">
              <div>
                {gigData.createdBy.profileImage ? (
                  <Image
                    src={HOST + "/" + gigData.createdBy.profileImage}
                    alt="profile"
                    height={120}
                    width={120}
                    className="rounded-full"
                  />
                ) : (
                  <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                    <span className="text-xl text-white">
                      {gigData.createdBy.email[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex  gap-2 items-center">
                  <h4 className="font-medium text-lg">
                    {gigData.createdBy.fullName}
                  </h4>
                  <span className="text-[#74767e]">
                    @{gigData.createdBy.username}
                  </span>
                </div>
                <div>
                  <p>{gigData.createdBy.description}</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`cursor-pointer ${
                          Math.ceil(gigData.averageRating) >= star
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-yellow-500">
                    {gigData.averageRating}
                  </span>
                  <span className="text-[#74767e]">
                    ({gigData.totalReviews})
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Reviews />
          {hasOrdered && <AddReview />}
        </div>
      )}
    </>
  );
}

export default Details;
