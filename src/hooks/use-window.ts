import { useContext } from "react";
import { WindowContext } from "../contexts/window-context";

const useWindow = () => {
  return useContext(WindowContext);
};

export default useWindow;
