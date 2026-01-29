import { Canvas, useFrame } from "@react-three/fiber";
import hdr from "../assets/puresky.hdr?url";
import {
  Environment,
  OrbitControls,
  MeshDistortMaterial,
  Float,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import fishModel from "../assets/scene.gltf?url";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useEffect, useMemo, useRef } from "react";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";
function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function FishModel(props) {
  const gltf = useGLTF(fishModel);
  const cloned = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene]);

  const { actions } = useAnimations(gltf.animations, cloned);
  const fishRef = useRef(null);
  const timeRef = useRef(0);
  const directionRef = useRef(1);
  const speed = 0.05; // Adjust for larger/smaller circle
  const borderRadius = 10.0;

  useEffect(() => {
    console.log(actions);
    const action = actions["Swim Animation"];
    if (action) {
      action.timeScale = 0.2;
      action.play();
    }
  }, [actions]);

  useFrame(() => {
    if (fishRef && fishRef.current) {
      const posX = fishRef.current.position.x;
      const posZ = fishRef.current.position.z;

      const radius = Math.sqrt(posX * posX + posZ * posZ);

      //teleport back
      if (radius - borderRadius > 1) {
        fishRef.current.position.x = 0;
        fishRef.current.position.z = 0;
        return;
      }
      // Fish should try to rotate away from border
      const rotationMult = Math.abs(2 / (borderRadius - radius)); // Start rotating more as the fish gets to the edge
      timeRef.current += 0.01;

      // Sometimes change direction
      if (Math.abs(rotationMult) < 0.5 && Math.random() < 0.01) {
        directionRef.current = -directionRef.current;
      }

      // Rotate fish to face direction of movement
      fishRef.current.rotation.y =
        (fishRef.current.rotation.y +
          0.03 * directionRef.current * rotationMult) %
        (Math.PI * 2);

      const movex = Math.sin(fishRef.current.rotation.y) * speed;
      const movey = Math.cos(fishRef.current.rotation.y) * speed;

      fishRef.current.position.x += movex;
      fishRef.current.position.z += movey;
      fishRef.current.position.y += 0.002 * directionRef.current;
    }
  });

  return <primitive ref={fishRef} object={cloned} {...props} />;
}

function Bubble() {
  // const gltf = useLoader(GLTFLoader, gltf_model);

  return (
    <Canvas camera={{ fov: 65 }} className="border-2 border-white">
      {/* <primitive object={gltf.scene} /> */}
      {/* <FishModel scale={7} position={[1, 1, 0]} /> */}
      {/* <FishModel scale={7} position={[0, 0, 0]} /> */}
      {Array.from({ length: 8 }).map((_, i) => (
        <FishModel
          key={i}
          scale={7}
          position={[randInt(-5, 5), randInt(-1, 1), randInt(-5, 5)]}
        />
      ))}

      <Float floatIntensity={1} speed={0.5}>
        <mesh scale={1}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            distort={0.25}
            transmission={1.0}
            thickness={-0.5}
            roughness={0}
            iridescence={1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1200]}
            clearcoat={1}
            clearcoatRoughness={0}
            envMapIntensity={1.5}
          />
        </mesh>
      </Float>

      <OrbitControls enableZoom={true} />
      <Environment
        files={hdr}
        backgroundBlurriness={0.03}
        near={1}
        far={100}
        background={true}
      />
    </Canvas>
  );
}

export default Bubble;
