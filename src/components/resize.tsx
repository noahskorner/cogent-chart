import {
  Dispatch,
  DragEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface ResizeProps {
  draggable: boolean;
  width: number;
  height: number;
  setWidth: Dispatch<SetStateAction<number>>;
  setHeight: Dispatch<SetStateAction<number>>;
}

const Resize = ({
  draggable,
  width,
  height,
  setWidth,
  setHeight,
}: ResizeProps) => {
  const initialWidth = useRef<number>(width);
  const initialHeight = useRef<number>(height);
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

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    setStart(e.clientX, e.clientY);
  };
  const onDrag = (e: DragEvent<HTMLDivElement>) => {
    setEnd(e.clientX, e.clientY);
  };
  const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    setStart(null, null);
    setEnd(null, null);
  };

  useEffect(() => {
    if (startX != null && startY != null && endX != null && endY != null) {
      setWidth(initialWidth.current + (endX - startX));
      setHeight(initialHeight.current + (endY - startY));
    }
  }, [endX, endY, setHeight, setWidth, startX, startY]);

  return (
    <>
      <div
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        style={{ width: `${width + 6}px` }}
        className={`absolute top-0 -left-[3px] z-0 cursor-ew-resize  h-full`}
        draggable={draggable}
        tabIndex={0}
      ></div>
      <div
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        style={{ height: `${height + 6}px` }}
        draggable={draggable}
        className={`absolute -top-[3px] left-0 z-0 cursor-ns-resize w-full`}
      ></div>
    </>
  );
};

export default Resize;
