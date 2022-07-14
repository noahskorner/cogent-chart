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
  const waitingNode = useRef<number | null>(null);
  const waitingEdge = useRef<number | null>(null);

  const addLine = (nodeId: number, index: number) => {
    setLines((prev) => {
      if (waitingNode.current == null) {
        waitingNode.current = nodeId;
        waitingEdge.current = index;
        return prev;
      }

      const lines = [
        ...prev,
        {
          sourceNodeId: waitingNode.current!,
          sourceEdge: waitingEdge.current!,
          targetNodeId: nodeId,
          targetEdge: index,
        },
      ];

      return lines;
    });
  };

  return (
    <LinesContext.Provider value={{ lines, addLine }}>
      {children}
    </LinesContext.Provider>
  );
};
