import { useState } from "react";
import {
  Canvas,
  // extend,
  // useFrame,
} from "@react-three/fiber";
import { Physics, useBox, usePlane } from "@react-three/cannon";
import {
  // Float,
  // MeshDistortMaterial,
  // Environment,
  OrbitControls,
} from "@react-three/drei";

function Floor() {
  const [ref] = usePlane(() => ({
    mass: 0,
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -2, 0],
  }));

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#123855" />
    </mesh>
  );
}

function Block({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const [ref] = useBox(() => ({
    mass: 1,
    position,
  }));

  const [selected, setSelected] = useState(false);

  return (
    <mesh
      onPointerEnter={() => setSelected(true)}
      onPointerOut={() => {
        setSelected(false);
        console.log("out");
      }}
      ref={ref}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        metalness={0.5}
        roughness={0.1}
        color={color}
        emissive={selected ? 0x53a2a3 : 0x0}
      />
    </mesh>
  );
}

function BlockStacking() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ fov: 65, position: [0, 0, 6] }}
        dpr={[1, 1.5]}
        gl={{
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
          antialias: true,
          alpha: false,
        }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = "srgb";
          gl.setClearColor("#22362c");
        }}
      >
        <ambientLight color={"#22362c"} />
        <pointLight position={[5, 5, 2]} intensity={500} />
        <Physics
          gravity={[0, -9.81, 0]}
          defaultContactMaterial={{ restitution: 0.98 }}
        >
          <Floor />
          <Block position={[0, 2, 0]} color="#ff6b6b" />
          <Block position={[-1.5, 3, 0]} color="#4ecdc4" />
          <Block position={[1.5, 3, 0]} color="#ffeb3b" />
          <Block position={[0, 4, 0]} color="#9c27b0" />
          <Block position={[-1, 5, 0]} color="#00bcd4" />
          <Block position={[1, 5, 0]} color="#ff9800" />
        </Physics>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default BlockStacking;
