import {
  useEffect,
  useState,
  DragEvent,
  Dispatch,
  SetStateAction,
} from "react";

export enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

interface UseResizeOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  setX: Dispatch<SetStateAction<number>>;
  setY: Dispatch<SetStateAction<number>>;
  setWidth: Dispatch<SetStateAction<number>>;
  setHeight: Dispatch<SetStateAction<number>>;
  setIsResizing: Dispatch<SetStateAction<boolean>>;
}

const useResize = ({
  x,
  y,
  width,
  height,
  setX,
  setY,
  setWidth,
  setHeight,
  setIsResizing,
}: UseResizeOptions) => {
  const [state, setState] = useState<{
    initialX: number;
    initialY: number;
    initialWidth: number;
    initialHeight: number;
    direction: Direction | null;
    dragStartX: number | null;
    dragStartY: number | null;
    distanceX: number | null;
    distanceY: number | null;
  }>({
    initialX: x,
    initialY: y,
    initialWidth: width,
    initialHeight: height,
    direction: null,
    dragStartX: null,
    dragStartY: null,
    distanceX: null,
    distanceY: null,
  });

  const onDragStart = (e: DragEvent<HTMLDivElement>, direction: Direction) => {
    setIsResizing(true);

    const { pageX, pageY } = e;

    setState((prev) => {
      return {
        ...prev,
        initialX: x,
        initialY: y,
        initialWidth: width,
        initialHeight: height,
        direction: direction,
        dragStartX: pageX,
        dragStartY: pageY,
      };
    });
  };

  const onDrag = (e: DragEvent<HTMLDivElement>) => {
    const { pageX, pageY } = e;
    if (pageX === 0 || pageY === 0) return;

    setState((prev) => {
      if (prev.dragStartX == null || prev.dragStartY == null) return prev;

      return {
        ...prev,
        dragStartX: pageX,
        dragStartY: pageY,
        distanceX: pageX - prev.dragStartX,
        distanceY: pageY - prev.dragStartY,
      };
    });
  };

  const onDragEnd = () => {
    setState({
      initialX: x,
      initialY: y,
      initialWidth: width,
      initialHeight: height,
      direction: null,
      dragStartX: null,
      dragStartY: null,
      distanceX: null,
      distanceY: null,
    });
    setIsResizing(false);
  };

  useEffect(() => {
    const { direction, distanceX, distanceY } = state;

    if (direction == null || distanceX == null || distanceY == null) return;

    switch (direction) {
      case Direction.NORTH:
        setY((prev) => prev + distanceY / 2);
        setHeight((prev) => prev - distanceY);
        break;
      case Direction.SOUTH:
        setY((prev) => prev + distanceY / 2);
        setHeight((prev) => prev + distanceY);
        break;
      case Direction.EAST:
        setX((prev) => prev + distanceX / 2);
        setWidth((prev) => prev - distanceX);
        break;
      case Direction.WEST:
        setX((prev) => prev + distanceX / 2);
        setWidth((prev) => prev + distanceX);
        break;
      default:
        return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return {
    onDragStart,
    onDrag,
    onDragEnd,
  };
};

export default useResize;
