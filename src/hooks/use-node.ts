import { useCallback, useRef, useState } from "react";

const defaultValues = {
  prevX: 0,
  prevY: 0,
  draggable: true,
  isDragging: false,
};

interface UseNodeOptions {
  initialX: number;
  initialY: number;
}

const useNode = ({ initialX, initialY }: UseNodeOptions) => {
  const [x, setX] = useState<number>(initialX);
  const [y, setY] = useState<number>(initialY);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const nodeRef = useCallback((node: HTMLDivElement) => {
    if (node != null) {
      setWidth(node.clientWidth);
      setHeight(node.clientHeight);
    }
  }, []);
  const edges = [
    { x: width / 2, y: 0 }, // top
    { x: width, y: height / 2 }, // right
    { x: width / 2, y: height }, // bottom
    { x: 0, y: height / 2 }, // left
  ];
  const prevX = useRef<number>(defaultValues.prevX);
  const prevY = useRef<number>(defaultValues.prevY);
  const [draggable, setDraggable] = useState<boolean>(defaultValues.draggable);
  const [isDragging, setIsDragging] = useState<boolean>(
    defaultValues.isDragging
  );

  const move = (moveX: number, moveY: number) => {
    setX((prev) => prev + moveX);
    setY((prev) => prev + moveY);
  };

  const setPrevPosition = (clientX: number, clientY: number) => {
    prevX.current = clientX;
    prevY.current = clientY;
  };

  const setPositionInGraph = (clientX: number, clientY: number) => {
    const moveX = clientX - prevX.current;
    const moveY = clientY - prevY.current!;

    setPrevPosition(clientX, clientY);
    move(moveX, moveY);
  };

  return {
    x,
    y,
    nodeRef,
    height,
    width,
    edges,
    prevX,
    prevY,
    draggable,
    isDragging,
    setIsDragging,
    setPrevPosition,
    setPositionInGraph,
  };
};

export default useNode;
