import type { NextPage } from "next";
import { useState, DragEvent, useRef, RefObject } from "react";
import useWindow from "../hooks/use-window";

interface ICanvas {
  width: number;
  height: number;
  zoom: number;
}

interface INode {
  x: number;
  y: number;
  startX: null | number;
  startY: null | number;
  draggable: boolean;
  isDragging: boolean;
  ref: RefObject<HTMLDivElement>;
}

const Home: NextPage = () => {
  const { widthStyle, heightStyle } = useWindow();
  const [canvas, setCanvas] = useState({
    width: 1920,
    height: 1080,
    zoom: 1,
  });
  const [node, setNode] = useState<INode>({
    x: 20,
    y: 20,
    startX: null,
    startY: null,
    draggable: true,
    isDragging: false,
    ref: useRef<HTMLDivElement>(null),
  });

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    setNode((prev) => {
      return {
        ...prev,
        startX: e.clientX,
        startY: e.clientY,
        isDragging: true,
      };
    });
  };
  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    setNode((prev) => {
      const moveX = e.clientX - prev.startX!;
      const moveY = e.clientY - prev.startY!;

      const x = prev.x + moveX;
      const y = prev.y + moveY;

      return {
        ...prev,
        x: x,
        y: y,
        startX: e.clientX,
        startY: e.clientY,
      };
    });
  };
  const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    setNode((prev) => {
      return {
        ...prev,
        isDragging: false,
      };
    });
  };
  const handleZoomInClick = () => {
    setCanvas((prev) => {
      return {
        ...prev,
        zoom: prev.zoom + 0.1,
      };
    });
  };
  const handleZoomOutClick = () => {
    setCanvas((prev) => {
      return {
        ...prev,
        zoom: prev.zoom - 0.1,
      };
    });
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
          Zoom in ({(canvas.zoom * 100).toFixed(0)}%)
        </button>
        <button className="text-sm w-full py-2" onClick={handleZoomOutClick}>
          Zoom out
        </button>
      </div>
      <div
        style={{
          maxWidth: widthStyle,
          maxHeight: heightStyle,
          transform: `scale(${canvas.zoom})`,
        }}
        className="z-1"
      >
        <div
          style={{
            height: `${canvas.height}px`,
            width: `${canvas.width}px`,
            minHeight: `${canvas.height}px`,
            minWidth: `${canvas.width}px`,
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
          <div
            className={`${
              node.isDragging ? "opacity-0" : ""
            } w-64 border rounded-md bg-white absolute border-slate-300 shadow cursor-move z-1`}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            style={{ top: `${node.y}px`, left: `${node.x}px` }}
            draggable={node.draggable}
            ref={node.ref}
          >
            <div className="border-b border-slate-300">
              <input
                type="text"
                name=""
                id=""
                className="w-full h-full p-2 rounded-t-md text-sm font-semibold"
              />
            </div>
            <div>
              <input
                type="text"
                name=""
                id=""
                className="w-full h-full p-2 text-sm"
              />
              <input
                type="text"
                name=""
                id=""
                className="w-full h-full p-2 text-sm"
              />
              <input
                type="text"
                name=""
                id=""
                className="w-full h-full p-2 rounded-b-md text-sm"
              />
            </div>
          </div>
          {node.isDragging && (
            <div
              style={{ top: `${node.y}px`, left: `${node.x}px` }}
              className="absolute"
            >
              weeeee
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
