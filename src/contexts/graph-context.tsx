import { createContext, ReactNode, useState } from "react";

interface IGraphContext {
  width: number;
  height: number;
  zoom: number;
  setArea: (width: number, height: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

const defaultValues = {
  width: 1920,
  height: 1080,
  zoom: 1,
  setArea: () => {},
  zoomIn: () => {},
  zoomOut: () => {},
};

export const GraphContext = createContext<IGraphContext>(defaultValues);

interface IGraphProvider {
  children: ReactNode;
}

const DEFAULT_ZOOM_INCREMENT = 0.05;

export const GraphProvider = ({ children }: IGraphProvider) => {
  const [width, setWidth] = useState<number>(defaultValues.width);
  const [height, setHeight] = useState<number>(defaultValues.height);
  const [zoom, setZoom] = useState<number>(defaultValues.zoom);

  const setArea = (width: number, height: number) => {
    setWidth(width);
    setHeight(height);
  };

  const zoomIn = () => {
    setZoom((prev) => prev + DEFAULT_ZOOM_INCREMENT);
  };

  const zoomOut = () => {
    setZoom((prev) => prev - DEFAULT_ZOOM_INCREMENT);
  };

  return (
    <GraphContext.Provider
      value={{ width, height, zoom, setArea, zoomIn, zoomOut }}
    >
      {children}
    </GraphContext.Provider>
  );
};
