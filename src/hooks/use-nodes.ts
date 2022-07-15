import { useContext } from "react";
import { NodesContext } from "../contexts/nodes-context";
import { INode } from "./use-node";

const useNodes = () => {
  const nodesContext = useContext(NodesContext);
  const { nodes, setNodes } = nodesContext;

  const addNode = (node: INode) => {
    setNodes((prev) => {
      if (prev.some((e) => e.id === node.id)) return prev;
      return [...prev, node];
    });
  };

  const updateNode = (node: INode) => {
    setNodes((prev) => {
      return [...prev.filter((e) => e.id !== node.id), node];
    });
  };

  const findNode = (id: number) => {
    return nodes.find((e) => e.id === id) ?? null;
  };

  return {
    ...nodesContext,
    addNode,
    updateNode,
    findNode,
  };
};

export default useNodes;
