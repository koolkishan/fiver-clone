import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

function Logout() {
  const [cookies, setCookies, removeCookie] = useCookies();
  const [{}, dispatch] = useStateProvider();

  const router = useRouter();
  useEffect(() => {
    removeCookie("jwt");
    dispatch({ type: reducerCases.SET_USER, userInfo: undefined });
    router.push("/");
  }, [removeCookie, dispatch, router]);
  return <div>Logout</div>;
}

export default Logout;
