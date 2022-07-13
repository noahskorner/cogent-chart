import type { NextPage } from "next";
import Node from "../components/node";
import useWindow from "../hooks/use-window";
import Graph from "../components/graph";
import useGraph from "../hooks/use-graph";

const Home: NextPage = () => {
  const { widthStyle, heightStyle } = useWindow();
  const { zoom, zoomIn, zoomOut } = useGraph();

  const nodes = [
    { id: 1, x: 679, y: 453 },
    { id: 2, x: 1451, y: 528 },
    { id: 3, x: 20, y: 20 },
  ];

  const handleZoomInClick = () => {
    zoomIn();
  };
  const handleZoomOutClick = () => {
    zoomOut();
  };

  return (
    <div
      style={{
        width: widthStyle,
        height: heightStyle,
      }}
      className="flex justify-center items-center bg-stone-100 z-0 overflow-auto"
    >
      <div className="flex flex-col z-[100] bg-white shadow fixed top-4 left-4 rounded-md w-64 border border-slate-300">
        <button
          className="text-sm w-full py-2 border-b"
          onClick={handleZoomInClick}
        >
          Zoom in ({(zoom * 100).toFixed(0)}%)
        </button>
        <button className="text-sm w-full py-2" onClick={handleZoomOutClick}>
          Zoom out
        </button>
      </div>
      <Graph>
        {nodes.map((e) => (
          <Node key={e.id} initialX={e.x} initialY={e.y} />
        ))}
        {/* <svg
          width={1451 - 679}
          height={528 - 453}
          className="absolute text-black"
          fill="currentColor"
          style={{ top: 453, left: 679 }}
        >
          <line
            x1="0"
            y1="0"
            x2={1451 - 679}
            y2={528 - 453}
            stroke="black"
            strokeWidth={2}
          />
        </svg> */}
      </Graph>
    </div>
  );
};

export default Home;
