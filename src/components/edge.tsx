import useLines from "../hooks/use-lines";
import { IPoint } from "../hooks/use-node";

interface EdgeProps {
  nodeId: number;
  edge: IPoint;
  index: number;
  height: number;
  width: number;
}

const Edge = ({ nodeId, edge, index, height, width }: EdgeProps) => {
  const { addLine } = useLines();
  const onClick = () => {
    addLine(nodeId, index);
  };

  return (
    <button
      onClick={onClick}
      className="absolute w-[12px] h-[12px] bg-red-600 rounded-full"
      style={{
        top: `${edge.y + -6}px`,
        left: `${edge.x + -6}px`,
      }}
    ></button>
  );
};

export default Edge;
