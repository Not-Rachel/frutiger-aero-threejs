import { useEffect, useRef } from "react";
import initDitherDemo from "../scripts/ditherDemo.js";
function DitherDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef) {
      const cleanup = initDitherDemo(canvasRef.current);
      return () => cleanup && cleanup();
    }
  }, []);
  return <canvas ref={canvasRef} className="w-full h-full"></canvas>;
}

export default DitherDemo;
