import { useStateProvider } from "../../context/StateContext";
import { HOST } from "../../utils/constants";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

function Reviews() {
  const [{ gigData }] = useStateProvider();
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
      {gigData && (
        <div className="mb-10">
          <h3 className="text-2xl my-5 font-normal text-[#404145] ">Reviews</h3>
          <div className="flex gap-3 mb-5">
            <h5>{gigData.reviews.length} reviews for this Gig</h5>
            <div className="flex text-yellow-500 items-center gap-2">
              <div className="flex gap-1">
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
              <span>{averageRatings}</span>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {gigData.reviews.map((review) => (
              <div className="flex gap-3 border-t pt-6" key={review.id}>
                <div>
                  {review.reviewer.profileImage ? (
                    <Image
                      src={HOST + "/" + review.reviewer.profileImage}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                      <span className="text-xl text-white">
                        {review.reviewer.email[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <h4>{review.reviewer.fullName}</h4>
                  <div className="flex text-yellow-500 items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`cursor-pointer ${
                            review.rating >= star
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span>{review.rating}</span>
                  </div>
                  <p className="text-[#404145] pr-20">{review.reviewText}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Reviews;
