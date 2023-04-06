import type { AppProps } from "next/app";
import "@/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Fiverr Clone</title>
      </Head>
      <div className="relative">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </Provider>
  );
}
