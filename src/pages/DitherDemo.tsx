import { useEffect, useRef } from "react";
import initDitherDemo from "../scripts/ditherDemo.ts";
function DitherDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const cleanup = initDitherDemo(canvasRef.current);
      return () => cleanup && cleanup();
    }
  }, []);
  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="z-50 pointer-events-auto"></canvas>
      <div id="gui-container" className="absolute top-0 right-0"></div>
    </div>
  );
}

export default DitherDemo;
