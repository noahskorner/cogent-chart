import { Dispatch, SetStateAction } from "react";
import useResize, { Direction } from "../hooks/use-resize";

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
  const { onDragStart, onDragEnd, onDrag } = useResize({
    x,
    y,
    width,
    height,
    setIsResizing,
    setX,
    setY,
    setWidth,
    setHeight,
  });

  return (
    <>
      <div
        onDragStart={(e) => onDragStart(e, Direction.NORTH)}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        style={{ height: `${height + 6}px` }}
        draggable={draggable}
        className={`absolute -top-[6px] left-0 z-0 cursor-ns-resize w-full`}
      ></div>
      <div
        onDragStart={(e) => onDragStart(e, Direction.SOUTH)}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        style={{ height: `${height + 6}px` }}
        draggable={draggable}
        className={`absolute -bottom-[6px] left-0 z-0 cursor-ns-resize w-full`}
      ></div>
      <div
        onDragStart={(e) => onDragStart(e, Direction.EAST)}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        style={{ width: `${width + 6}px` }}
        className={`absolute top-0 -left-[6px] z-0 cursor-ew-resize h-full`}
        draggable={draggable}
        tabIndex={0}
      ></div>
      <div
        onDragStart={(e) => onDragStart(e, Direction.WEST)}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        style={{ width: `${width + 6}px` }}
        className={`absolute top-0 -right-[6px] z-0 cursor-ew-resize h-full`}
        draggable={draggable}
        tabIndex={0}
      ></div>
    </>
  );
};

export default Resize;
