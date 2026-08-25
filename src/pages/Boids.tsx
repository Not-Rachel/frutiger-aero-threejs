import {
  Canvas,
  // extend,
  useFrame,
  // useThree,
} from "@react-three/fiber";
import hdr from "/assets/citrus.hdr?url";
import {
  Environment,
  // OrbitControls,
  MeshDistortMaterial,
  MeshReflectorMaterial,
  Float,
  useGLTF,
  useAnimations,
  OrbitControls,
  useProgress,
  // shaderMaterial,
} from "@react-three/drei";

import fishModel from "/assets/scene.gltf?url";
import puterModel from "/assets/retroComputer.gltf?url";
// import * as YUKA from "yuka";
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  // useState,
  type RefObject,
  type JSX,
} from "react";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";
import { Physics, usePlane, useSphere } from "@react-three/cannon";
// import { Water, type WaterOptions } from "three/examples/jsm/Addons.js";
// import {
//   // DepthOfField,
//   EffectComposer,
//   Vignette,
//   ChromaticAberration,
//   BrightnessContrast,
// } from "@react-three/postprocessing";
// import { BlendFunction } from "postprocessing";
import {
  MathUtils,
  Object3D,
  // Vector2,
  Vector3,
  type Object3DEventMap,
} from "three";
import { randInt } from "three/src/math/MathUtils.js";
// import { MeshRefractionMaterial } from "@react-three/drei/materials/MeshRefractionMaterial";
// import { Color } from "three";

const radius = 15;
// function randInt(min: number, max: number) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
function randFloat(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Avoid wrapping around an angle
function shortestAngle(x: number, y: number) {
  return ((x - y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
}
// const glsl = (x: any) => x;

function avoidCollision(
  position: Vector3,
  obstaclePosition: Vector3,
  target: { current: number },
  targetVertical: { current: number },
  // speedRef: { current: number },
  radius = 1,
  maxForce = 0.25,
) {
  const obstacleToFish = position.clone().sub(obstaclePosition); //Subtract vectors
  const distance = obstacleToFish.length();
  if (distance < radius) {
    // speedRef.current = Math.max(1.2, speedRef.current - 0.1 * maxForce);

    const force = Math.min(1 / distance ** 2, maxForce); // cap the max force
    const vforce = Math.min(1 / distance ** 2, 0.25); // cap the max force

    const repulseYaw = Math.atan2(obstacleToFish.x, obstacleToFish.z);
    const replusPitch = Math.atan2(
      obstacleToFish.y,
      Math.sqrt(obstacleToFish.x ** 2 + obstacleToFish.z ** 2),
    );
    const headingDiff = shortestAngle(repulseYaw, target.current);

    const verticalHeadingDiff = shortestAngle(
      replusPitch,
      targetVertical.current,
    );

    target.current += headingDiff * force;
    targetVertical.current += verticalHeadingDiff * vforce;
  }
  // else speedRef.current = Math.min(3, speedRef.current + 0.005);
}

type BoidProps = Omit<JSX.IntrinsicElements["primitive"], "object"> & {
  speed: number;
  obstacleRef: RefObject<Object3D>;
  fishRefs: RefObject<Object3D[]>;
  index: number;
};

function Boid({ speed, obstacleRef, fishRefs, index, ...props }: BoidProps) {
  const gltf = useGLTF(fishModel);
  const cloned = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene]);
  // cloned.matrixAutoUpdate = false;

  const { actions } = useAnimations(gltf.animations, cloned);
  const fishRef = useRef<Object3D<Object3DEventMap>>(null!);
  // const vehicleRef = useRef<YUKA.Vehicle>(null!);
  // const previousTimeRef = useRef<number>(0);
  const speedRef = useRef(speed); // Adjust for larger/smaller circle
  const heading = useRef(0);
  const targetHeading = useRef(0);
  const verticalHeading = useRef(0);
  const verticalTargetHeading = useRef(0);
  const lastTime = useRef(0);
  const nextInterval = useRef(2);
  // const { camera } = useThree();

  // const obstacleRef = props.obstacleRef;

  useEffect(() => {
    fishRefs.current[index] = fishRef.current;
    // console.log(fishRefs.current);
  }, []);
  // const forward = useRef<Vector3>(new Vector3(0, 0, 0));
  // const target = useRef<Vector3>(new Vector3(0, 0, 0));

  useEffect(() => {
    if (fishRef.current) {
      fishRef.current.rotation.order = "YXZ";
    }

    const action = actions["Swim Animation"];
    if (action) {
      action.timeScale = speedRef.current / 7.0;
      action.play();
    }
  }, [fishRef]);

  useFrame(({ clock }, delta) => {
    if (!fishRef.current || !obstacleRef.current) return;

    const t = clock.getElapsedTime();

    const pos = fishRef.current.position;
    const obPos = obstacleRef.current.position;
    // const radius = 8;

    if (pos.length() > radius * 0.8) {
      // Set heading and/or vertical heading to avoid
      const angleToCenter = Math.atan2(-pos.x, -pos.z);
      const vertAngle = -Math.atan2(-pos.y, Math.sqrt(pos.x ** 2 + pos.z ** 2));

      //Normalize
      const headingDiff = shortestAngle(angleToCenter, targetHeading.current);
      const vertDiff = shortestAngle(vertAngle, verticalTargetHeading.current);

      targetHeading.current += headingDiff;
      verticalTargetHeading.current += vertDiff;

      lastTime.current = t;
    } else if (t - lastTime.current > nextInterval.current) {
      const newHeading = (targetHeading.current =
        heading.current + randFloat(-2, 2));
      verticalTargetHeading.current =
        verticalHeading.current + randFloat(-0.25, 0.25);

      nextInterval.current = Math.abs(newHeading - heading.current) * 2.5;
      lastTime.current = t;

      // console.log(nextInterval.current, lastTime.current);
    }

    // Fish avoid other fishes
    // if (t - lastTime.current > 1 / speed / 10) {
    for (let i = 0; i < fishRefs.current.length; i++) {
      if (i === index) continue; // skip self
      const otherFish = fishRefs.current[i];
      if (!otherFish) continue;
      avoidCollision(
        pos,
        otherFish.position,
        targetHeading,
        verticalTargetHeading,
        // speedRef,
        2,
        0.2,
      );
    }
    // }

    avoidCollision(
      pos,
      obPos,
      targetHeading,
      verticalTargetHeading,
      // speedRef,
      8,
      3,
    );

    // avoidCollision(
    //   pos,
    //   camera.position,
    //   targetHeading,
    //   verticalTargetHeading,
    //   // speedRef,
    //   10,
    //   2,
    // );

    const lerpFactor = 1 - Math.pow(0.5, delta);
    heading.current = MathUtils.lerp(
      heading.current,
      targetHeading.current,
      lerpFactor,
    );
    verticalHeading.current = MathUtils.lerp(
      verticalHeading.current,
      verticalTargetHeading.current,
      lerpFactor,
    );

    fishRef.current.position.x +=
      Math.sin(heading.current) * 0.03 * speedRef.current;
    fishRef.current.position.z +=
      Math.cos(heading.current) * 0.03 * speedRef.current;
    fishRef.current.position.y +=
      Math.sin(-verticalHeading.current) * 0.03 * speedRef.current;

    fishRef.current.rotation.x = verticalHeading.current;

    fishRef.current.rotation.y = heading.current;
    // console.log(verticalHeading.current);
  });

  return <primitive ref={fishRef} object={cloned} {...props} />;
}

type PuterModelProps = Omit<JSX.IntrinsicElements["primitive"], "object">;

function PuterModel({ ...props }: PuterModelProps) {
  const gltf = useGLTF(puterModel);
  const puterRef = useRef<Object3D>(null);
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
      }}
    />
  );
}

function BubbleMesh() {
  // const bubble = useRef<Object3D<Object3DEventMap>>(null!);

  // useFrame(({ clock }) => {
  //   if (bubble.current) {
  //     bubble.current.position.y = Math.sin(clock.elapsedTime / 3.0);
  //     bubble.current.position.x = Math.cos(clock.elapsedTime / 3.0);
  //   }
  //   // console.log("Frame");
  // });

  const [ref] = useSphere(() => ({
    mass: 0.02,
    position: [0, 1, -4],
    velocity: [-1, Math.random() * 0.5, Math.random() * 0.5],
  }));

  return (
    <Float floatIntensity={1} speed={0.5}>
      <mesh ref={ref} scale={1} position={[0, 0, 0]}>
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

function Cage(props: any) {
  console.log("Radius", props.radius, props);
  const [ref] = useSphere(() => ({
    mass: 0,
    type: "Static",
    ...props,
  }));
  return (
    <mesh ref={ref}>
      <sphereGeometry args={props.args} />
      <meshBasicMaterial wireframe={true} transparent={true} opacity={0.2} />
    </mesh>
  );
}

function OceanMesh() {
  const [ref] = usePlane(() => ({
    mass: 0,
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -1, 0],
  }));

  // const envMap = useEnvironment({ files: hdr });

  return (
    <mesh ref={ref}>
      {/* <planeGeometry args={[16, 16]} /> */}
      <planeGeometry args={[200, 200]} />
      <MeshReflectorMaterial
        // blur={[400, 221]}
        resolution={512}
        mixBlur={1}
        mixStrength={4}
        depthScale={1}
        minDepthThreshold={0.85}
        color={"#153333"}
        roughness={0.2}
        mirror={1}
        metalness={0.5}
        distortion={5}
        blur={[256, 64]}
        // envMap={envMap}
        // envMapIntensity={0.0}
      />
      {/* <meshBasicMaterial color={"#094443"} /> */}
    </mesh>
  );
}

function LoadingOverlay() {
  const { progress, active } = useProgress();

  return (
    <div
      className="absolute inset-0 bg-black flex items-center justify-center transition-opacity duration-500"
      style={{
        opacity: active ? 1 : 0,
        pointerEvents: active ? "auto" : "none",
      }}
    >
      <div className="text-white text-center">
        <div className="w-48 h-1 bg-white/20 rounded-full">
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

// function UnderwaterEffects() {
//   const { camera } = useThree();
//   const [isUnderwater, setIsUnderwater] = useState(false);

//   useFrame(() => {
//     setIsUnderwater(camera.position.y < -1); // below plane y
//   });

//   // if (!isUnderwater) return null;

//   return (
//     <EffectComposer>
//       {/* Teal fog tint */}

//       {/* <ColorAverage blendFunction={BlendFunction.COLOR} /> */}
//       {/* <DepthOfField
//         focusDistance={5}
//         focalLength={0.09}
//         bokehScale={1.2}
//         height={480}
//       /> */}
//       <ChromaticAberration
//         blendFunction={BlendFunction.AVERAGE}
//         offset={isUnderwater ? [0.005, 0.005] : [0.0, 0.0]}
//       />
//       <Vignette
//         eskil={false}
//         offset={isUnderwater ? 0.3 : 0}
//         darkness={isUnderwater ? 0.8 : 0}
//       />

//       <BrightnessContrast
//         brightness={isUnderwater ? -0.3 : 0.0} // brightness. min: -1, max: 1
//         contrast={0} // contrast: min -1, max: 1
//       />
//     </EffectComposer>
//   );
// }

function Boids() {
  const puterRef = useRef<Object3D>(null!);

  const containerRef = useRef(null);

  const fishRefs = useRef<Object3D[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(() => {
      window.dispatchEvent(new Event("resize"));
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%" }}
      className="relative border-2 border-white"
    >
      <Canvas
        camera={{ fov: 65 }}
        frameloop="demand"
        gl={{
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
          antialias: true,
          alpha: false,
        }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = "srgb";
          console.log("Window w h", window.innerWidth, window.innerHeight);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              window.dispatchEvent(new Event("resize"));
            });
          });
        }}
        style={{ width: "100%", height: "100%" }}
        // linear
      >
        <Suspense fallback={null}>
          {/* <pointLight position={[10, 10, 10]} color="yellow" intensity={1000} /> */}

          <Physics
            gravity={[0, 0.1, 0]}
            defaultContactMaterial={{ restitution: 1.0 }}
          >
            {Array.from({ length: 40 }).map((_, i) => (
              <Boid
                key={i}
                fishRefs={fishRefs}
                index={i}
                // position={[randInt(-5, 5), randInt(-1, 1), randInt(-5, 5)]}
                speed={randFloat(0.75, 5)}
                obstacleRef={puterRef}
                position={[
                  randInt(-radius, radius),
                  0,
                  randInt(-radius, radius),
                ]}
                scale={7}
              />
            ))}
            <PuterModel
              ref={puterRef}
              scale={4}
              position={[3, 0, -5]}
              rotation={[0, -Math.PI / 1.3, Math.PI / 12]}
            />
            {/* <mesh>
              <sphereGeometry args={[radius]} />
              <meshBasicMaterial
                wireframe={true}
                transparent={true}
                opacity={0.2}
              />
            </mesh> */}
            <Cage position={[0, 0, 0]} args={[radius]} />

            {/* <Box position={[0, 0, 0]} args={[16, 16, 0.2]} /> */}

            <BubbleMesh />
            <OceanMesh />
            <OrbitControls
              enableZoom={true}
              maxDistance={50}
              minDistance={1}
              setPolarAngle={Math.PI / 6}
              // minAzimuthAngle={-Math.PI / 4}
              // maxAzimuthAngle={Math.PI / 4}
              // minPolarAngle={Math.PI / 6}
              // maxPolarAngle={Math.PI - Math.PI / 6}
            />
          </Physics>
          <Environment
            files={hdr}
            backgroundBlurriness={0.03}
            near={1}
            far={100}
            background={true}
          />
          {/* <UnderwaterEffects /> */}
        </Suspense>
      </Canvas>
      <LoadingOverlay />
    </div>
  );
}

export default Boids;
