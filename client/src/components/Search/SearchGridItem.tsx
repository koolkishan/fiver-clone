import { IMAGES_URL } from "@/utils/constants";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { FaStar } from "react-icons/fa";

function SearchGridItem({ gig }: any) {
  const router = useRouter();
  return (
    <div
      className="max-w-[300px] flex flex-col gap-2 p-1 cursor-pointer mb-8"
      onClick={() => router.push(`/gig/${gig.id}`)}
    >
      <div>
        <Image
          src={`${IMAGES_URL}/${gig.images[0]}`}
          alt="gig"
          height={300}
          width={300}
          className="rounded-xl"
        />
      </div>
      <div className="flex items-center gap-2">
        <Image
          src={"/kishan.jpeg"}
          alt="profile"
          width={30}
          height={30}
          className="rounded-full"
        />
        <span className="text-md ">
          <strong className="font-medium">koolkishan</strong>
        </span>
      </div>
      <div>
        <p className="line-clamp-2 text-[#404145]">{gig.title}</p>
      </div>
      <div className="flex items-center gap-1">
        <FaStar />
        <span>
          <strong className="font-medium">5.0</strong>
        </span>
        <span className="text-[#74767e]">(68)</span>
      </div>
      <div>
        <strong className="font-medium">From ${gig.price}</strong>
      </div>
    </div>
  );
}

export default SearchGridItem;
