import useNodes from "../hooks/use-nodes";

interface LineProps {
  sourceNodeId: number;
  sourceEdge: number;
  targetNodeId: number;
  targetEdge: number;
}

const Line = ({
  sourceNodeId,
  sourceEdge,
  targetNodeId,
  targetEdge,
}: LineProps) => {
  const { findNode } = useNodes();
  const source = findNode(sourceNodeId);
  const target = findNode(targetNodeId);

  if (source == null || target == null) return null;

  return (
    <path
      d={`M${source.x + source.edges[sourceEdge].x} ${
        source.y + source.edges[sourceEdge].y
      } ${target.x + target.edges[targetEdge].x} ${
        target.y + target.edges[targetEdge].y
      }`}
      strokeWidth="1"
      stroke="black"
    />
  );
};

export default Line;
