import { useMemo, useRef } from "react";

import {
  Environment,
  // OrbitControls,
  MeshDistortMaterial,
  MeshReflectorMaterial,
  Float,
  useGLTF,
  useAnimations,
  OrbitControls,
  // shaderMaterial,
} from "@react-three/drei";
import {
  Bone,
  BoxGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  MeshStandardMaterial,
  Skeleton,
  SkinnedMesh,
  Uint16BufferAttribute,
  Vector3,
} from "three";
import { Canvas } from "@react-three/fiber";
// import {boxGeometry} from "@react-three/fiber"

interface PageProps {
  number: number;
  front: itemProps | null;
  back: itemProps | null;
}
interface NoteBookProps {
  items: itemProps[];
  cover: string;
  backcover: string;
}

interface itemProps {
  key: number;
  image: string;
  name: string | null;
  text: string | null;
  model: string | null;
}

const PAGE_WIDTH = 1.28;
const PAGE_HEIGHT = 1.71;
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

const pageGeo = new BoxGeometry(
  PAGE_WIDTH,
  PAGE_HEIGHT,
  PAGE_DEPTH,
  PAGE_SEGMENTS,
  2,
);

pageGeo.translate(PAGE_WIDTH / 2, 0, 0);
const position = pageGeo.attributes.position;
const vertex = new Vector3();
const skinIndexes = [];
const skinWeights = [];

for (let i = 0; i < position.count; i++) {
  vertex.fromBufferAttribute(position, i);
  const x = vertex.x;

  const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
  let skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;
  skinIndexes.push(skinIndex, skinIndex + 1, 0, 0); // Two bones per vertex
  skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
}

pageGeo.setAttribute("skinIndex", new Uint16BufferAttribute(skinIndexes, 4));
pageGeo.setAttribute("skinWeight", new Float32BufferAttribute(skinWeights, 4));
const whiteColor = new Color("white");
const emissiveColor = new Color("orange");

const pageMaterials = [
  new MeshStandardMaterial({
    color: whiteColor,
  }),
  new MeshStandardMaterial({
    color: "#111",
  }),
  new MeshStandardMaterial({
    color: whiteColor,
  }),
  new MeshStandardMaterial({
    color: whiteColor,
  }),
];

function Page({ number, front, back, ...props }: PageProps) {
  const groupRef = useRef<Group>(null!);

  const manualSkinnedMesh = useMemo(() => {
    const bones = [];
    for (let i = 0; i <= PAGE_SEGMENTS; i++) {
      let bone = new Bone();
      bones.push(bone);
      if (i === 0) bone.position.x = 0;
      else bone.position.x = SEGMENT_WIDTH;
      if (i > 0) bones[i - 1].add(bone);

      const skeleton = new Skeleton(bones);
      const materials = pageMaterials;
      const mesh = new SkinnedMesh(pageGeo, materials);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.frustumCulled = true;
    }
  }, []);

  console.log({ number, front, back });
  return (
    <group {...props} ref={groupRef}>
      <mesh>
        <primitive object={pageGeo} />
        <meshBasicMaterial color="red" />
      </mesh>
    </group>
  );
}

function Cover({ ...props }) {
  const groupRef = useRef<Group>(null!);
  return (
    <group {...props} ref={groupRef}>
      <mesh>
        <boxGeometry args={[3, 6, 0.05]} />
        <meshBasicMaterial color="blue" />
      </mesh>
    </group>
  );
}
function Book3D({ items, cover, backcover }: NoteBookProps) {
  if (items.length < 1) return;

  console.log(cover, backcover);
  // Organize into pages
  const pages = [];
  for (let i = 0; i < items.length - 1; i += 2) {
    pages.push([items[i], items[i + 1]]);
  }
  // Get last page if items are not even
  if (items.length % 2 !== 0) pages.push([items[items.length - 1], null]);

  console.log(pages);
  return (
    <Canvas className="border-2 border-white w-full h-full">
      <group>
        {/* <Cover /> */}
        {pages.map((page, index) => {
          return <Page number={index} front={page[0]} back={page[1]} />;
        })}
        {/* <Cover position-x={pages.length * 0.15} /> */}
      </group>
      <OrbitControls />
    </Canvas>
  );
}

export default Book3D;
