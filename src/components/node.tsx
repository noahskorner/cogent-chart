import { DragEvent, KeyboardEvent, useEffect, useRef } from "react";
import useGraph from "../hooks/use-graph";
import useNode from "../hooks/use-node";
import useNodes from "../hooks/use-nodes";
import Edge from "./edge";
import Resize from "./resize";

interface NodeProps {
  id: number;
  initialX: number;
  initialY: number;
}

const Node = ({ id, initialX, initialY }: NodeProps) => {
  const executedRef = useRef(false);
  const { addNode, updateNode, removeNode } = useNodes();
  const node = useNode({ id, initialX, initialY });
  const {
    x,
    y,
    width,
    height,
    nodeRef,
    edges,
    draggable,
    isDragging,
    isResizing,
    isFocused,
    isHovered,
    setWidth,
    setHeight,
    setIsResizing,
    setIsHovered,
    setIsFocused,
    setIsDragging,
    setPrevPosition,
    setPosition,
  } = node;

  const onFocus = () => {
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
  };
  const onHover = () => {
    setIsHovered(true);
  };
  const onMouseLeave = () => {
    setIsHovered(false);
  };
  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setPrevPosition(e.clientX, e.clientY);
  };
  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    if (!isResizing) {
      setPosition(e.clientX, e.clientY);
    }
  };
  const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Delete") {
      removeNode(id);
    }
  };

  useEffect(() => {
    if (executedRef.current) return;

    addNode(node);
    executedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateNode(node);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x, y, width, height]);

  return (
    <>
      <div
        style={{
          top: `${y - height / 2}px`,
          left: `${x - width / 2}px`,
          width: `${width}px`,
          height: `${height}px`,
        }}
        className={`${isDragging ? "opacity-0" : ""} rounded-md absolute z-1`}
        onFocus={onFocus}
        onMouseOver={onHover}
        onMouseLeave={onMouseLeave}
        onBlur={onBlur}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        onKeyDown={onKeyDown}
        draggable={draggable}
        tabIndex={0}
        ref={nodeRef}
      >
        <Resize
          draggable={draggable}
          width={width}
          height={height}
          setWidth={setWidth}
          setHeight={setHeight}
          setIsResizing={setIsResizing}
        />
        <div
          className={`${
            isFocused || isHovered ? "ring-1 ring-blue-300" : ""
          } w-full h-full border rounded-md bg-white border-slate-300 shadow cursor-move relative z-1`}
        >
          {isHovered || isFocused
            ? edges.map((edge, index) => {
                return (
                  <Edge
                    key={index}
                    nodeId={id}
                    edge={edge}
                    index={index}
                    height={height}
                    width={width}
                  />
                );
              })
            : null}
        </div>
      </div>
      {isDragging && (
        <div
          style={{
            top: `${y - height / 2}px`,
            left: `${x - width / 2}px`,
            width: `${width}px`,
            height: `${height}px`,
          }}
          className="rounded-md absolute z-1 pointer-events-none"
          draggable={false}
        >
          <div
            className={`${
              isFocused || isHovered ? "ring-1 ring-blue-300" : ""
            } w-full h-full border rounded-md bg-white border-slate-300 shadow cursor-move relative z-1`}
          ></div>
        </div>
      )}
    </>
  );
};

export default Node;
