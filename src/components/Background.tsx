import {
  Canvas,
  // extend,
  useFrame,
} from "@react-three/fiber";
import hdr from "../assets/puresky.hdr?url";
import {
  Environment,
  // OrbitControls,
  MeshDistortMaterial,
  MeshReflectorMaterial,
  Float,
  useGLTF,
  useAnimations,
  // shaderMaterial,
} from "@react-three/drei";
import fishModel from "../assets/scene.gltf?url";
import puterModel from "../assets/retroComputer.gltf?url";
import * as YUKA from "yuka";
import { useEffect, useMemo, useRef, type JSX } from "react";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";
// import { Water, type WaterOptions } from "three/examples/jsm/Addons.js";
import {
  DepthOfField,
  EffectComposer,
  Noise,
  HueSaturation,
} from "@react-three/postprocessing";
import { Object3D, type Object3DEventMap } from "three";
// import { MeshRefractionMaterial } from "@react-three/drei/materials/MeshRefractionMaterial";
// import { Color } from "three";

function randInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// const glsl = (x: any) => x;

function FishModel(props: any) {
  const gltf = useGLTF(fishModel);
  const cloned = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene]);
  // cloned.matrixAutoUpdate = false;

  const { actions } = useAnimations(gltf.animations, cloned);
  const fishRef = useRef<Object3D<Object3DEventMap>>(null!);
  const vehicleRef = useRef<YUKA.Vehicle>(null!);
  const previousTimeRef = useRef<number>(0);
  const speedRef = useRef(props.speed); // Adjust for larger/smaller circle
  const borderRadius = 20.0;
  const targetBehaviorRef = useRef<YUKA.ArriveBehavior>(null!);
  const wanderBehaviorRef = useRef<YUKA.WanderBehavior>(null!);

  useEffect(() => {
    if (fishRef.current) {
      //Connect mesh to moving obj
      const vehicle = new YUKA.Vehicle();
      vehicle.setRenderComponent(fishRef.current, (entity, renderComponent) => {
        renderComponent.position.copy(entity.position);
        renderComponent.quaternion.copy(entity.rotation);
      });

      vehicle.position.set(
        props.position[0],
        props.position[1],
        props.position[2],
      );
      vehicle.maxSpeed = speedRef.current;
      vehicle.maxForce = 8;
      vehicle.mass = 2;

      // vehicle.position.copy({
      //   x: props.position[0],
      //   y: props.position[1],
      //   z: props.position[2],
      // });

      //Behavior
      const wander = new YUKA.WanderBehavior();
      wander.radius = 5;
      wander.distance = 10;
      wander.jitter = 4;
      const target = new YUKA.ArriveBehavior(new YUKA.Vector3(0, 0, 0), 2, 2);
      target.active = false;

      // wander.active = false;
      vehicle.steering.add(wander);
      vehicle.steering.add(target);

      targetBehaviorRef.current = target;
      wanderBehaviorRef.current = wander;
      // entityManager.add(vehicle);

      vehicleRef.current = vehicle;
    }

    const action = actions["Swim Animation"];
    if (action) {
      action.timeScale = speedRef.current / 7.0;
      action.play();
    }
  }, []);

  useFrame(({ clock }) => {
    if (fishRef.current && vehicleRef.current) {
      const currentTime = clock.getElapsedTime();
      const delta = currentTime - previousTimeRef.current;
      previousTimeRef.current = currentTime;

      const { x, z } = fishRef.current.position;
      const distance = Math.sqrt(x * x + z * z);

      if (distance > borderRadius) {
        wanderBehaviorRef.current!.active = false;
        targetBehaviorRef.current!.active = true;
      } else {
        wanderBehaviorRef.current!.active = true;
        targetBehaviorRef.current!.active = false;
      }

      vehicleRef.current.update(delta);

      // Manual sync if needed
      fishRef.current.position.copy(vehicleRef.current.position);
      fishRef.current.quaternion.copy(vehicleRef.current.rotation);

      // const verticalOffset = Math.sin(clock.getElapsedTime() * 0.5) * 0.5;
      // fishRef.current.position.y = verticalOffset;

      // // Fish should try to rotate away from border
      // const rotationMult = Math.abs(2 / (borderRadius - radius)); // Start rotating more as the fish gets to the edge

      // // Sometimes change direction
      // if (Math.abs(rotationMult) < 0.5 && Math.random() < 0.01) {
      //   directionRef.current = -directionRef.current;
      // }

      // // Rotate fish to face direction of movement
      // fishRef.current.rotation.y =
      //   (fishRef.current.rotation.y +
      //     0.03 * directionRef.current * rotationMult) %
      //   (Math.PI * 2);

      // const movex = Math.sin(fishRef.current.rotation.y) * speed;
      // const movey = Math.cos(fishRef.current.rotation.y) * speed;

      // fishRef.current.position.x += movex;
      // fishRef.current.position.z += movey;
      // fishRef.current.position.y += 0.002 * directionRef.current;
    }
  });

  return <primitive ref={fishRef} object={cloned} {...props} />;
}

type PuterModelProps = Omit<JSX.IntrinsicElements["primitive"], "object"> & {
  setShowUI: React.Dispatch<React.SetStateAction<boolean>>;
};

function PuterModel({ setShowUI, ...props }: PuterModelProps) {
  const gltf = useGLTF(puterModel);
  const puterRef = useRef(null);
  if (puterRef && puterRef.current) {
    // console.log("Puter pos", puterRef.current.position, puterRef.current.scale);
  }

  return (
    <primitive
      ref={puterRef}
      object={gltf.scene}
      {...props}
      onClick={(e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        setShowUI((prev) => !prev);
        console.log("hello");
      }}
    />
  );
}

function BubbleMesh() {
  const bubble = useRef<Object3D<Object3DEventMap>>(null!);

  useFrame(({ clock }) => {
    if (bubble.current) {
      bubble.current.position.y = Math.sin(clock.elapsedTime / 3.0);
      bubble.current.position.x = Math.cos(clock.elapsedTime / 3.0);
    }
    // console.log("Frame");
  });

  return (
    <Float floatIntensity={1} speed={0.5}>
      <mesh ref={bubble} scale={1} position={[0, 0, 0]}>
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
  );
}

function OceanMesh() {
  const oceanRef = useRef(null!);

  useEffect(() => {
    if (oceanRef.current) {
      // oceanRef.current.rotation.x = -Math.PI / 2;
      console.log(oceanRef.current);
    }
  }, [oceanRef]);

  return (
    <mesh
      ref={oceanRef}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={1}
      position={[0, -1, 0]}
    >
      <planeGeometry args={[64, 64]} />
      {/* <MeshDistortMaterial
        distort={0.0}
        color={"#094443"}
        transmission={0.5}
        thickness={-0.5}
        roughness={0.1}
        iridescence={0.5}
        iridescenceIOR={1}
        iridescenceThicknessRange={[0, 1200]}
        clearcoat={1}
        
        clearcoatRoughness={0}
        envMapIntensity={1.5}
      /> */}
      <MeshReflectorMaterial
        blur={[400, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={15}
        depthScale={1}
        minDepthThreshold={0.85}
        color={"#153333"}
        // metalness={0.6}
        roughness={1}
      />
      {/* <THREE.MeshBasicMaterial */}
      {/* <meshBasicMaterial color={"#094443"} /> */}
    </mesh>
  );
}

type BackgroundProps = {
  setShowUI: React.Dispatch<React.SetStateAction<boolean>>;
};

function Background({ setShowUI }: BackgroundProps) {
  return (
    <Canvas camera={{ fov: 65 }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <FishModel
          key={i}
          scale={7}
          // position={[randInt(-5, 5), randInt(-1, 1), randInt(-5, 5)]}
          speed={randInt(1, 5)}
          position={[0, 0, 0]}
        />
      ))}
      <PuterModel
        scale={4}
        position={[5, 0, -7]}
        rotation={[0, -Math.PI / 1.3, Math.PI / 12]}
        setShowUI={setShowUI}
        // onClick={() => console.log("Hello")}
      />
      <BubbleMesh />
      <OceanMesh />
      {/* <OrbitControls
        enableZoom={true}
        // minAzimuthAngle={-Math.PI / 4}
        // maxAzimuthAngle={Math.PI / 4}
        // minPolarAngle={Math.PI / 6}
        // maxPolarAngle={Math.PI - Math.PI / 6}
      /> */}
      <Environment
        files={hdr}
        backgroundBlurriness={0.03}
        near={1}
        far={100}
        background={true}
      />
      <EffectComposer>
        <DepthOfField
          // focusDistance={2}
          worldFocusDistance={10}
          focalLength={20}
          bokehScale={3}
          // height={1000}
        />
        <HueSaturation staturation={1} />
        <Noise opacity={0.02} />
      </EffectComposer>
    </Canvas>
  );
}

export default Background;
