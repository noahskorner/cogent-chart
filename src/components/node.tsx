import { DragEvent, useCallback, useEffect, useRef } from "react";
import useNode from "../hooks/use-node";
import useNodes from "../hooks/use-nodes";
import Edge from "./edge";

interface NodeProps {
  id: number;
  initialX: number;
  initialY: number;
}

const Node = ({ id, initialX, initialY }: NodeProps) => {
  const { updateNode } = useNodes();
  const {
    x,
    y,
    nodeRef,
    height,
    width,
    edges,
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

  useEffect(() => {
    updateNode({
      id,
      x,
      y,
      height,
      width,
      nodeRef,
      edges,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x, y, height, width, nodeRef]);

  return (
    <>
      <div
        className={`${
          isDragging ? "opacity-0" : ""
        } w-32 h-32 border rounded-md bg-white absolute border-slate-300 shadow cursor-move z-1 focus:ring-1 focus:ring-blue-300`}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        style={{ top: `${y}px`, left: `${x}px` }}
        draggable={draggable}
        tabIndex={0}
        ref={nodeRef}
      >
        {edges.map((edge, index) => {
          return <Edge key={index} nodeId={id} edge={edge} index={index} />;
        })}
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
