import React, { useEffect, useState } from "react";
import FiverrLogo from "./FiverrLogo";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCookies } from "react-cookie";
import axios from "axios";
import { GET_USER_INFO } from "@/utils/constants";
import ContextMenu from "./ContextMenu";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

function Navbar() {
  const [cookies] = useCookies();
  const router = useRouter();
  const [navFixed, setNavFixed] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [{ showLoginModal, showSignupModal, isSeller, userInfo }, dispatch] =
    useStateProvider();

  const handleLogin = () => {
    if (showSignupModal) {
      dispatch({
        type: reducerCases.TOGGLE_SIGNUP_MODAL,
        showSignupModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_LOGIN_MODAL,
      showLoginModal: true,
    });
  };

  const handleSignup = () => {
    if (showLoginModal) {
      dispatch({
        type: reducerCases.TOGGLE_LOGIN_MODAL,
        showLoginModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_SIGNUP_MODAL,
      showSignupModal: true,
    });
  };

  const links = [
    { linkName: "Fiverr Business", handler: "#", type: "link" },
    { linkName: "Explore", handler: "#", type: "link" },
    { linkName: "English", handler: "#", type: "link" },
    { linkName: "Become a Seller", handler: "#", type: "link" },
    { linkName: "Sign in", handler: handleLogin, type: "button" },
    { linkName: "Join", handler: handleSignup, type: "button2" },
  ];

  useEffect(() => {
    if (router.pathname === "/") {
      const positionNavbar = () => {
        window.pageYOffset > 0 ? setNavFixed(true) : setNavFixed(false);
      };
      window.addEventListener("scroll", positionNavbar);
      return () => window.removeEventListener("scroll", positionNavbar);
    } else {
      setNavFixed(true);
    }
  }, [router.pathname]);

  const handleOrdersNavigate = () => {
    if (isSeller) router.push("/seller/orders");
    router.push("/client/orders");
  };

  const handleModeSwitch = () => {
    console.log("here", { isSeller });
    if (isSeller) {
      dispatch({ type: reducerCases.SWITCH_MODE });
      router.push("/client");
    } else {
      dispatch({ type: reducerCases.SWITCH_MODE });
      router.push("/seller");
    }
  };

  useEffect(() => {
    if (cookies.jwt && !userInfo) {
      const getUserInfo = async () => {
        try {
          const {
            data: { user },
          } = await axios.post(
            GET_USER_INFO,
            {},
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${cookies.jwt}`,
              },
            }
          );

          dispatch({ type: reducerCases.SET_USER, userInfo: user });
        } catch (err) {
          console.log(err);
        }
      };

      getUserInfo();
    }
  }, [cookies, userInfo, dispatch]);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  useEffect(() => {
    const clickListener = (e) => {
      e.stopPropagation();

      if (isContextMenuVisible) setIsContextMenuVisible(false);
    };
    if (isContextMenuVisible) {
      window.addEventListener("click", clickListener);
    }
    return () => {
      window.removeEventListener("click", clickListener);
    };
  }, [isContextMenuVisible]);
  const ContextMenuData = [
    {
      name: "Profile",
      callback: (e) => {
        e.stopPropagation();

        setIsContextMenuVisible(false);
        router.push("/profile");
      },
    },
    {
      name: "Logout",
      callback: (e) => {
        e.stopPropagation();

        setIsContextMenuVisible(false);
        router.push("/logout");
      },
    },
  ];

  return (
    <nav
      className={`w-full px-24 flex justify-between items-center py-6  top-0 z-30 transition-all duration-300 ${
        navFixed || userInfo
          ? "fixed bg-white border-b border-gray-200"
          : "absolute bg-transparent border-transparent"
      }`}
    >
      <div>
        <Link href="/">
          <FiverrLogo
            fillColor={!navFixed && !userInfo ? "#ffffff" : "#404145"}
          />
        </Link>
      </div>
      <div
        className={`flex ${navFixed || userInfo ? "opacity-100" : "opacity-0"}`}
      >
        <input
          type="text"
          placeholder="What service are you looking for today?"
          className="w-[30rem] py-2.5 px-4 border"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
        <button
          className="bg-gray-900 py-1.5 text-white w-16 flex justify-center items-center"
          onClick={() => {
            setSearchData("");
            router.push(`/search?q=${searchData}`);
          }}
        >
          <IoSearchOutline className="fill-white text-white h-6 w-6" />
        </button>
      </div>
      {!userInfo ? (
        <ul className="flex gap-10 items-center">
          {links.map(({ linkName, handler, type }) => {
            return (
              <li
                key={linkName}
                className={`${
                  navFixed ? "text-black" : "text-white"
                } font-medium`}
              >
                {type === "link" && (
                  <Link href={handler as string}>{linkName}</Link>
                )}
                {type === "button" && (
                  <button onClick={handler as () => {}}>{linkName}</button>
                )}
                {type === "button2" && (
                  <button
                    onClick={handler as () => {}}
                    className={`border   text-md font-semibold py-1 px-3 rounded-sm ${
                      navFixed
                        ? "border-[#1DBF73] text-[#1DBF73]"
                        : "border-white text-white"
                    } hover:bg-[#1DBF73] hover:text-white hover:border-[#1DBF73] transition-all duration-500`}
                  >
                    {linkName}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="flex gap-10 items-center">
          <li
            className="cursor-pointer text-[#1DBF73] font-medium"
            onClick={handleOrdersNavigate}
          >
            Orders
          </li>

          {isSeller ? (
            <li
              className="cursor-pointer font-medium"
              onClick={handleModeSwitch}
            >
              Switch To Buyer
            </li>
          ) : (
            <li
              className="cursor-pointer font-medium"
              onClick={handleModeSwitch}
            >
              Switch To Seller
            </li>
          )}
          <li
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsContextMenuVisible(true);
            }}
            title="Profile"
          >
            <Image
              src="/kishan.jpeg"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          </li>
        </ul>
      )}
      {isContextMenuVisible && <ContextMenu data={ContextMenuData} />}
    </nav>
  );
}

export default Navbar;
