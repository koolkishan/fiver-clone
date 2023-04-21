import React from "react";
import Pricing from "@/components/Gigs/Pricing";
import Details from "@/components/Gigs/Details";

function Gig() {
  return (
    <div className="grid grid-cols-3 mx-32 gap-20">
      <Details />
      <Pricing />
    </div>
  );
}

export default Gig;
