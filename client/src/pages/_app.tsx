import type { AppProps } from "next/app";
import "@/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [cookies] = useCookies();
  useEffect(() => {
    if (
      router.pathname.includes("/seller") ||
      router.pathname.includes("/buyer")
    ) {
      if (!cookies.jwt) {
        router.push("/");
      }
    }
  }, [cookies.jwt, router]);
  return (
    <Provider store={store}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Fiverr Clone</title>
      </Head>
      <div className="relative flex flex-col h-screen justify-between">
        <Navbar />
        <div
          className={`${
            router.pathname !== "/" ? "mt-36" : ""
          } mb-auto w-full mx-auto`}
        >
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </Provider>
  );
}
