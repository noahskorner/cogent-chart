import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { INode } from "../hooks/use-node";

interface INodesContext {
  nodes: INode[];
  setNodes: Dispatch<SetStateAction<INode[]>>;
}

const defaultValues = {
  nodes: [],
  setNodes: () => {},
};

export const NodesContext = createContext<INodesContext>(defaultValues);

interface INodesProvider {
  children: ReactNode;
}

export const NodesProvider = ({ children }: INodesProvider) => {
  const [nodes, setNodes] = useState<INode[]>(defaultValues.nodes);

  return (
    <NodesContext.Provider value={{ nodes, setNodes }}>
      {children}
    </NodesContext.Provider>
  );
};
