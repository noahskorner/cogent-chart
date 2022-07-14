import { createContext, ReactNode, useState } from "react";

export interface IPoint {
  x: number;
  y: number;
}

interface INode {
  id: number;
  x: number;
  y: number;
  height: number;
  width: number;
  nodeRef: (node: HTMLDivElement) => void;
  edges: IPoint[];
}

interface INodesContext {
  nodes: INode[];
  updateNode: (node: INode) => void;
  findNode: (id: number) => INode | null;
}

const defaultValues = {
  nodes: [],
  updateNode: () => {},
  findNode: () => null,
};

export const NodesContext = createContext<INodesContext>(defaultValues);

interface INodesProvider {
  children: ReactNode;
}

export const NodesProvider = ({ children }: INodesProvider) => {
  const [nodes, setNodes] = useState<INode[]>(defaultValues.nodes);

  const updateNode = (node: INode) => {
    setNodes((prev) => {
      return [...prev.filter((e) => e.id !== node.id), node];
    });
  };

  const findNode = (id: number) => {
    return nodes.find((e) => e.id === id) ?? null;
  };

  return (
    <NodesContext.Provider value={{ nodes, updateNode, findNode }}>
      {children}
    </NodesContext.Provider>
  );
};
