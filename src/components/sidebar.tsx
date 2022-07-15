import useGraph from "../hooks/use-graph";
import useNodes from "../hooks/use-nodes";

const Sidebar = () => {
  const { zoom, zoomIn, zoomOut } = useGraph();
  const { nodes } = useNodes();

  const handleZoomInClick = () => {
    zoomIn();
  };
  const handleZoomOutClick = () => {
    zoomOut();
  };
  return (
    <div className="flex flex-col z-[100] bg-white shadow fixed top-4 left-4 rounded-md w-96 border border-slate-300">
      <button
        className="text-sm w-full py-2 border-b"
        onClick={handleZoomInClick}
      >
        Zoom in ({(zoom * 100).toFixed(0)}%)
      </button>
      <button className="text-sm w-full py-2" onClick={handleZoomOutClick}>
        Zoom out
      </button>
      <p className="break-all">{JSON.stringify(nodes)}</p>
    </div>
  );
};

export default Sidebar;
