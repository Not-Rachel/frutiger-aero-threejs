import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useProgress } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Model2({
  modelSource,
  scale,
}: {
  modelSource: string;
  scale: number;
}) {
  const gltf = useGLTF(modelSource);
  const puterRef = useRef(null);

  // useEffect(() => {
  //   if (gltf.scene) {
  //     gltf.scene.traverse((child) => {
  //       if ((child as THREE.Mesh).isMesh) {
  //         child.castShadow = true;
  //         child.receiveShadow = true;
  //       }
  //     });
  //   }
  // }, [gltf]);

  // useFrame(() => {
  //   if (puterRef.current) {
  //     (puterRef.current as THREE.Object3D).rotation.y += 0.005;
  //   }
  // });

  return <primitive ref={puterRef} scale={scale} object={gltf.scene} />;
}

function Lights() {
  const blueLightRef = useRef<THREE.PointLight>(null);

  return (
    <>
      {/* <spotLight
        position={[0, 0, 10]}
        // penumbra={0.5}
        intensity={40}
        color={0xffc963}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-near={0.1}
        shadow-radius={1}
      /> */}
      <pointLight
        ref={blueLightRef}
        position={[-1, 6, 6]}
        intensity={200}
        color={0xffc963}
        // castShadow
        // shadow-radius={90}
        // shadow-mapSize={[2048, 2048]}
        // shadow-camera-far={50}
        // shadow-camera-near={0.1}
      />
      <ambientLight intensity={1.0} color={0xa8beff} />
    </>
  );
}

function ShadowPlane() {
  return (
    <mesh
      // rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow={true}
      position={[0, 0, -3]}
    >
      <planeGeometry args={[50, 50]} />
      <shadowMaterial opacity={0.5} />
    </mesh>
  );
}

function LoadingOverlay() {
  const { progress, active } = useProgress();

  return (
    <div
      className="absolute inset-0  flex items-center justify-center transition-opacity duration-500"
      style={{
        opacity: active ? 1 : 0,
        pointerEvents: active ? "auto" : "none",
      }}
    >
      <div className="text-white text-center">
        <div className="w-48 h-1  rounded-full">
          <div
            className="h-full bg-white rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs mt-2 opacity-60">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
function ThreeModel({
  modelSource,
  scale,
}: {
  modelSource: string;
  scale: number;
}) {
  const [autoRotateEnabled, setAutoRotateEnabled] = useState(true);

  const handleControlsStart = () => {
    setAutoRotateEnabled(false);
  };
  useEffect(() => {
    useGLTF.preload(modelSource);
  }, [modelSource]);

  return (
    <div className="w-full h-full max-w-screen overflow-hidden">
      <Canvas
        camera={{ position: [0, 1, 7], fov: 35 }}
        dpr={[1, 2]}
        shadows
        onCreated={({ gl }) => {
          gl.setClearColor(0x0, 0);
          // gl.shadowMap.enabled = true;
          // gl.shadowMap.type = THREE.PCFSoftShadowMap;
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
      >
        <Lights />
        <Suspense fallback={null}>
          <Model2 modelSource={modelSource} scale={scale} />
        </Suspense>
        <ShadowPlane />
        <OrbitControls
          autoRotate={autoRotateEnabled}
          enablePan={true}
          enableRotate={true}
          enableDamping={true}
          enableZoom={true}
          maxPolarAngle={Math.PI / 2}
          onStart={handleControlsStart}
        />
      </Canvas>
      <LoadingOverlay />
    </div>
  );
}

export default ThreeModel;
