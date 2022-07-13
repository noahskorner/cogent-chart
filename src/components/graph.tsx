import { ReactNode, useState } from "react";
import useGraph from "../hooks/use-graph";
import useWindow from "../hooks/use-window";

interface IGraph {
  width: number;
  height: number;
  zoom: number;
}

interface GraphProps {
  children: ReactNode;
}

const Graph = ({ children }: GraphProps) => {
  const { widthStyle: windowWidthStyle, heightStyle: windowHeightStyle } =
    useWindow();
  const { height, width, zoom } = useGraph();

  return (
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
  );
};

export default Graph;
