import type { NextPage } from "next";
import useWindow from "../hooks/use-window";
import Graph from "../components/graph";
import { GraphProvider } from "../contexts/graph-context";
import Sidebar from "../components/sidebar";
import { NodesProvider } from "../contexts/nodes-context";
import { LinesProvider } from "../contexts/line-context";

const Home: NextPage = () => {
  const { widthStyle, heightStyle } = useWindow();

  return (
    <div
      style={{
        width: widthStyle,
        height: heightStyle,
      }}
      className="flex justify-center items-center bg-stone-100 z-0 overflow-auto"
    >
      <GraphProvider>
        <NodesProvider>
          <LinesProvider>
            <Sidebar />
            <Graph />
          </LinesProvider>
        </NodesProvider>
      </GraphProvider>
    </div>
  );
};

export default Home;
