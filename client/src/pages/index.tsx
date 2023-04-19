import { useAppDispatch, useAppSelector } from "@/app/hooks";
import AuthWrapper from "@/components/AuthWrapper";
import Companies from "@/components/Companies";
import HeroBanner from "@/components/HeroBanner";
import { useStateProvider } from "@/context/StateContext";
import React from "react";

function Index() {
  const [{ showLoginModal, showSignupModal }] = useStateProvider();

  return (
    <div>
      <HeroBanner />
      <Companies />
      {(showLoginModal || showSignupModal) && (
        <AuthWrapper type={showLoginModal ? "login" : "signup"} />
      )}
    </div>
  );
}

export default Index;
