import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WindowProvider } from "../contexts/window-context";
import { GraphProvider } from "../contexts/graph-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WindowProvider>
      <GraphProvider>
        <Component {...pageProps} />
      </GraphProvider>
    </WindowProvider>
  );
}

export default MyApp;
