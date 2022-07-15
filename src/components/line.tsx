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

  const x1 = source.x + source.edges[sourceEdge].x - source.width / 2;
  const y1 = source.y + source.edges[sourceEdge].y - source.height / 2;
  const x2 = target.x + target.edges[targetEdge].x - target.width / 2;
  const y2 = target.y + target.edges[targetEdge].y - target.height / 2;

  return (
    <>
      <path
        d={`M${x1} ${y1} ${x2} ${y2}`}
        strokeWidth="1"
        stroke="black"
        className="cursor-pointer"
      />
      <path
        d={`M${x1} ${y1} ${x2} ${y2}`}
        strokeWidth="10"
        strokeOpacity={0}
        stroke="black"
        className="cursor-pointer"
      />
    </>
  );
};

export default Line;
