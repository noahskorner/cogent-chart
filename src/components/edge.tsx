import { IPoint } from "../contexts/nodes-context";
import useLines from "../hooks/use-lines";

interface EdgeProps {
  nodeId: number;
  edge: IPoint;
  index: number;
}

const Edge = ({ nodeId, edge, index }: EdgeProps) => {
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
