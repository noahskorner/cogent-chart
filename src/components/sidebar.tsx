import useGraph from "../hooks/use-graph";

const Sidebar = () => {
  const { zoom, zoomIn, zoomOut } = useGraph();

  const handleZoomInClick = () => {
    zoomIn();
  };
  const handleZoomOutClick = () => {
    zoomOut();
  };
  return (
    <div className="flex flex-col z-[100] bg-white shadow fixed top-4 left-4 rounded-md w-64 border border-slate-300">
      <button
        className="text-sm w-full py-2 border-b"
        onClick={handleZoomInClick}
      >
        Zoom in ({(zoom * 100).toFixed(0)}%)
      </button>
      <button className="text-sm w-full py-2" onClick={handleZoomOutClick}>
        Zoom out
      </button>
    </div>
  );
};

export default Sidebar;
