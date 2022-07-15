import { Dir } from "fs";
import {
  Dispatch,
  DragEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

const MIN_SIZE = 50;

enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

interface ResizeProps {
  draggable: boolean;
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

const Resize = ({
  draggable,
  x,
  y,
  width,
  height,
  setX,
  setY,
  setWidth,
  setHeight,
  setIsResizing,
}: ResizeProps) => {
  const initialX = useRef<number>(x);
  const initialY = useRef<number>(y);
  const initialWidth = useRef<number>(width);
  const initialHeight = useRef<number>(height);
  const directionRef = useRef<Direction | null>(null);
  // TODO: Move these to a single state object
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [endX, setEndX] = useState<number | null>(null);
  const [endY, setEndY] = useState<number | null>(null);

  const setStart = (x: number | null, y: number | null) => {
    setStartX(x);
    setStartY(y);
  };

  const setEnd = (x: number | null, y: number | null) => {
    setEndX(x);
    setEndY(y);
  };

  const onDragStart = (e: DragEvent<HTMLDivElement>, direction: Direction) => {
    setIsResizing(true);

    directionRef.current = direction;
    setStart(e.clientX, e.clientY);
  };
  const onDrag = (e: DragEvent<HTMLDivElement>) => {
    setEnd(e.clientX, e.clientY);
  };
  const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    setStart(null, null);
    setEnd(null, null);

    directionRef.current = null;
    setIsResizing(false);
  };

  useEffect(() => {
    if (startX != null && startY != null && endX != null && endY != null) {
      if (
        directionRef.current === Direction.NORTH ||
        directionRef.current === Direction.SOUTH
      ) {
        const direction = directionRef.current === Direction.NORTH ? 1 : -1;
        const moveY = (endY - startY) * direction;
        const newHeight = initialHeight.current - moveY;

        if (newHeight > MIN_SIZE) {
          setY(initialY.current + moveY * (direction / 2));
          setHeight(newHeight);

          console.log(directionRef.current, direction, moveY, newHeight);
        }
      } else if (
        directionRef.current === Direction.EAST ||
        directionRef.current === Direction.WEST
      ) {
        const direction = directionRef.current === Direction.WEST ? 1 : -1;
        const moveX = (endX - startX) * direction;
        const newWidth = initialWidth.current - moveX;
        if (newWidth > MIN_SIZE) {
          setX(initialX.current + moveX * (direction / 2));
          setWidth(newWidth);

          console.log(directionRef.current, direction, moveX, newWidth);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endX, endY]);

  useEffect(() => {
    if (startX == null || startY == null) {
      initialWidth.current = width;
      initialHeight.current = height;
      initialX.current = x;
      initialY.current = y;
    }
  }, [height, startX, startY, width, x, y]);

  return (
    <>
      <div
        onDragStart={(e) => onDragStart(e, Direction.WEST)}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        style={{ width: `${width + 6}px` }}
        className={`absolute top-0 -left-[6px] z-0 cursor-ew-resize h-full`}
        draggable={draggable}
        tabIndex={0}
      ></div>
      <div
        onDragStart={(e) => onDragStart(e, Direction.NORTH)}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        style={{ height: `${height + 6}px` }}
        draggable={draggable}
        className={`absolute -top-[6px] left-0 z-0 cursor-ns-resize w-full`}
      ></div>
      <div
        onDragStart={(e) => onDragStart(e, Direction.EAST)}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        style={{ width: `${width + 6}px` }}
        className={`absolute top-0 -right-[6px] z-0 cursor-ew-resize  h-full `}
        draggable={draggable}
        tabIndex={0}
      ></div>
      <div
        onDragStart={(e) => onDragStart(e, Direction.SOUTH)}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        style={{ height: `${height + 6}px` }}
        draggable={draggable}
        className={`absolute -bottom-[6px] left-0 z-0 cursor-ns-resize w-full `}
      ></div>
    </>
  );
};

export default Resize;
