import AuthWrapper from "@/components/AuthWrapper";
import Companies from "@/components/Companies";
import HeroBanner from "@/components/HeroBanner";
import React from "react";

function index() {
  return (
    <div>
      <HeroBanner />
      <Companies />
      {/* <AuthWrapper /> */}
    </div>
  );
}

export default index;
