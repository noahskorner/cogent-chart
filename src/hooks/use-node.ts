import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import useGraph from "./use-graph";

export interface INode {
  id: number;
  x: number;
  y: number;
  prevX: MutableRefObject<number>;
  prevY: MutableRefObject<number>;
  height: number;
  width: number;
  nodeRef: (node: HTMLDivElement) => void;
  edges: IPoint[];
  isResizing: boolean;
  isFocused: boolean;
  isHovered: boolean;
  draggable: boolean;
  isDragging: boolean;
  setX: Dispatch<SetStateAction<number>>;
  setY: Dispatch<SetStateAction<number>>;
  setWidth: Dispatch<SetStateAction<number>>;
  setHeight: Dispatch<SetStateAction<number>>;
  setIsResizing: Dispatch<SetStateAction<boolean>>;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  setIsHovered: Dispatch<SetStateAction<boolean>>;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  setPrevPosition: (clientX: number, clientY: number) => void;
  setPosition: (clientX: number, clientY: number) => void;
}

export interface IPoint {
  x: number;
  y: number;
}

const defaultValues = {
  z: 0,
  width: 128,
  height: 128,
  prevX: 0,
  prevY: 0,
  isResizing: false,
  isFocused: false,
  isHovered: false,
  draggable: true,
  isDragging: false,
};

interface UseNodeOptions {
  id: number;
  initialX: number;
  initialY: number;
}

const useNode = ({ id, initialX, initialY }: UseNodeOptions): INode => {
  const { zoom } = useGraph();
  const [x, setX] = useState<number>(initialX);
  const [y, setY] = useState<number>(initialY);
  const [z, setZ] = useState<number>(defaultValues.z);
  const [width, setWidth] = useState<number>(defaultValues.width);
  const [height, setHeight] = useState<number>(defaultValues.height);
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
  const [isResizing, setIsResizing] = useState<boolean>(
    defaultValues.isResizing
  );
  const [isFocused, setIsFocused] = useState<boolean>(defaultValues.isFocused);
  const [isHovered, setIsHovered] = useState<boolean>(defaultValues.isHovered);
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
  const setPosition = (clientX: number, clientY: number) => {
    const moveX = (clientX - prevX.current) * (1 / zoom);
    const moveY = (clientY - prevY.current!) * (1 / zoom);

    setPrevPosition(clientX, clientY);
    move(moveX, moveY);
  };

  return {
    id,
    x,
    y,
    nodeRef,
    height,
    width,
    edges,
    prevX,
    prevY,
    isResizing,
    isFocused,
    isHovered,
    draggable,
    isDragging,
    setX,
    setY,
    setWidth,
    setHeight,
    setIsResizing,
    setIsFocused,
    setIsHovered,
    setIsDragging,
    setPrevPosition,
    setPosition,
  };
};

export default useNode;
