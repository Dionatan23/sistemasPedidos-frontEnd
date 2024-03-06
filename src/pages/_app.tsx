import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { AthProvider } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AthProvider>
      <Component {...pageProps} />;
      <ToastContainer autoClose={3000} />
    </AthProvider>
  );
}
