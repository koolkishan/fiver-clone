import { useAppDispatch, useAppSelector } from "@/app/hooks";
import AuthWrapper from "@/components/AuthWrapper";
import Companies from "@/components/Companies";
import HeroBanner from "@/components/HeroBanner";
import React from "react";

function Index() {
  const { showLoginModal, showSignupModal } = useAppSelector(
    ({ auth }) => auth
  );

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
