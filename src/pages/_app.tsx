import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WindowProvider } from "../contexts/window-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WindowProvider>
      <Component {...pageProps} />
    </WindowProvider>
  );
}

export default MyApp;
