import { useRef, useState, DragEvent, RefObject } from "react";
import useNode from "../hooks/use-node";

interface NodeProps {
  initialX: number;
  initialY: number;
}

const Node = ({ initialX, initialY }: NodeProps) => {
  const {
    x,
    y,
    prevX,
    prevY,
    draggable,
    isDragging,
    setIsDragging,
    setPrevPosition,
    setPositionInGraph,
  } = useNode({ initialX, initialY });

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setPrevPosition(e.clientX, e.clientY);
  };
  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    setPositionInGraph(e.clientX, e.clientY);
  };
  const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
  };

  return (
    <>
      <div
        className={`${
          isDragging ? "opacity-0" : ""
        } w-64 border rounded-md bg-white absolute border-slate-300 shadow cursor-move z-1`}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        style={{ top: `${y}px`, left: `${x}px` }}
        draggable={draggable}
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
      {isDragging && (
        <div style={{ top: `${y}px`, left: `${x}px` }} className="absolute">
          weeeee {x} {y}
        </div>
      )}
    </>
  );
};

export default Node;
