import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { AthProvider } from "@/contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AthProvider>
      <Component {...pageProps} />;
    </AthProvider>
  );
}
