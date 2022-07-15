import { createContext, ReactNode, useEffect, useRef, useState } from "react";

interface ILine {
  sourceNodeId: number;
  sourceEdge: number;
  targetNodeId: number;
  targetEdge: number;
}

interface ILinesContext {
  lines: ILine[];
  addLine: (nodeId: number, index: number) => void;
}

const defaultValues = {
  lines: [],
  addLine: () => {},
};

export const LinesContext = createContext<ILinesContext>(defaultValues);

interface ILinesProvider {
  children: ReactNode;
}

export const LinesProvider = ({ children }: ILinesProvider) => {
  const [lines, setLines] = useState<ILine[]>(defaultValues.lines);
  const [queue, setQueue] = useState<{ nodeId: number; edge: number }[]>([]);

  const addLine = (nodeId: number, index: number) => {
    setQueue((prev) => [...prev, { nodeId, edge: index }]);
  };

  useEffect(() => {
    if (queue.length > 0 && queue.length % 2 === 0) {
      setLines((prev) => {
        return [
          ...prev,
          {
            sourceNodeId: queue[queue.length - 2].nodeId,
            sourceEdge: queue[queue.length - 2].edge,
            targetNodeId: queue[queue.length - 1].nodeId,
            targetEdge: queue[queue.length - 1].edge,
          },
        ];
      });
    }
  }, [queue]);

  return (
    <LinesContext.Provider value={{ lines, addLine }}>
      {children}
    </LinesContext.Provider>
  );
};
