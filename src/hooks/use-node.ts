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
