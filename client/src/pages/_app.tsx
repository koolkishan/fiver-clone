import type { AppProps } from "next/app";
import "@/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
