import { useContext } from "react";
import { LinesContext } from "../contexts/line-context";

const useLines = () => {
  return useContext(LinesContext);
};

export default useLines;
