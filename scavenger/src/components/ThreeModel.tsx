import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, SoftShadows } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
function Model({ modelSource, scale }: { modelSource: string; scale: number }) {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useThree();
  const { scene: gltfScene } = useGLTF(modelSource);

  useEffect(() => {
    console.log("Useeffect");
    if (gltfScene && modelRef.current) {
      const model = gltfScene.clone();
      model.scale.set(scale, scale, scale);
      model.rotateY(110);
      model.castShadow = true;
      modelRef.current = model;
      console.log(modelRef.current);
      scene.add(model);

      return () => {
        scene.remove(model);
      };
    }
  }, [gltfScene, scale, scene]);

  useFrame(({ clock }) => {
    if (modelRef.current) {
      modelRef.current.position.y =
        Math.sin(clock.getElapsedTime() * 0.8) * 0.07;
    }
  });

  return null;
}

function Model2({
  modelSource,
  scale,
}: {
  modelSource: string;
  scale: number;
}) {
  const gltf = useGLTF(modelSource);
  const puterRef = useRef(null);

  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [gltf]);

  useFrame(() => {
    if (puterRef.current) {
      (puterRef.current as THREE.Object3D).rotation.y += 0.005;
    }
  });

  return <primitive ref={puterRef} scale={scale} object={gltf.scene} />;
}

function Lights() {
  const blueLightRef = useRef<THREE.PointLight>(null);

  // useFrame(({ clock }) => {
  //   if (blueLightRef.current) {
  //     blueLightRef.current.position.y =
  //       Math.sin(clock.getElapsedTime() * 0.8) * 0.07;
  //   }
  // });

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
        position={[-1, 1, 6]}
        intensity={100}
        color={0xffc963}
        castShadow
        shadow-radius={90}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-near={0.1}
      />
      <ambientLight intensity={0.25} color={0xa8beff} />
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

function ThreeModel({
  modelSource,
  scale,
}: {
  modelSource: string;
  scale: number;
}) {
  return (
    <div className="w-full h-full max-w-screen overflow-hidden">
      <Canvas
        camera={{ position: [0, 1, 7], fov: 35 }}
        dpr={[1, 2]}
        shadows
        onCreated={({ gl }) => {
          gl.setClearColor(0x0, 0);
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
      >
        <Lights />
        {/* <Model modelSource={modelSource} scale={scale} /> */}
        <Model2 modelSource={modelSource} scale={scale} />
        <ShadowPlane />
        {/* <OrbitControls
          autoRotate={false}
          enablePan={true}
          enableRotate={true}
          enableDamping={true}
          enableZoom={true}
        /> */}
      </Canvas>
    </div>
  );
}

export default ThreeModel;
