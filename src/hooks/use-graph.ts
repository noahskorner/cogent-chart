import { useContext } from "react";
import { GraphContext } from "../contexts/graph-context";

const useGraph = () => {
  return useContext(GraphContext);
};

export default useGraph;
