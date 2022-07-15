import { ReactNode } from "react";
import useGraph from "../hooks/use-graph";
import useLines from "../hooks/use-lines";
import useNodes from "../hooks/use-nodes";
import useWindow from "../hooks/use-window";
import Line from "./line";
import Node from "./node";

const defaultNodes = [
  { id: 1, x: 679, y: 453 },
  { id: 2, x: 679, y: 600 },
  { id: 3, x: 20, y: 20 },
];
interface GraphContainerProps {
  children: ReactNode;
}

const GraphContainer = ({ children }: GraphContainerProps) => {
  const { widthStyle: windowWidthStyle, heightStyle: windowHeightStyle } =
    useWindow();
  const { height, width, zoom } = useGraph();
  const { nodes } = useNodes();

  return (
    <>
      <div
        style={{
          maxWidth: windowWidthStyle,
          maxHeight: windowHeightStyle,
          transform: `scale(${zoom})`,
        }}
        className="z-1"
      >
        <div
          style={{
            height: `${height}px`,
            width: `${width}px`,
            minHeight: `${height}px`,
            minWidth: `${width}px`,
          }}
          className="relative border border-slate-300 bg-white shadow-lg"
        >
          <svg className="absolute top-0 left-0 right-0 bottom-0 z-0 w-full h-full">
            <pattern
              id="pattern-0"
              x="0"
              y="0"
              width="15"
              height="15"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="0.4" cy="0.4" r="0.4" fill="#81818a"></circle>
            </pattern>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-0)"
            ></rect>
          </svg>
          {children}
        </div>
      </div>
    </>
  );
};

const Graph = () => {
  const { lines } = useLines();
  const { width: graphWidth, height: graphHeight } = useGraph();

  return (
    <GraphContainer>
      {defaultNodes.map((e) => (
        <Node key={e.id} id={e.id} initialX={e.x} initialY={e.y} />
      ))}
      <svg
        width={graphWidth}
        height={graphHeight}
        className="absolute top-0 left-0 pointer-events-none"
      >
        {lines.map((line, index) => {
          return (
            <Line
              key={index}
              sourceNodeId={line.sourceNodeId}
              sourceEdge={line.sourceEdge}
              targetNodeId={line.targetNodeId}
              targetEdge={line.targetEdge}
            />
          );
        })}
      </svg>
    </GraphContainer>
  );
};

export default Graph;
