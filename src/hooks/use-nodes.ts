import { useContext } from "react";
import { NodesContext } from "../contexts/nodes-context";

const useNodes = () => {
  return useContext(NodesContext);
};

export default useNodes;
