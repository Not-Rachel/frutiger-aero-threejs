import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as dat from "dat.gui";
// import vertexShader from "./shaders/vs.vert";
// import fragmentShader from "./shaders/fs.frag";
import { RectAreaLightHelper } from "three/examples/jsm/Addons.js";
// import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  1000,
);

camera.position.z = 10;
camera.position.y = 15;
camera.position.x = -10;
// orbit.update();
const orbit = new OrbitControls(camera, renderer.domElement);

scene.add(camera);

renderer.setClearColor("#031312", 1.0); //transparent
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.enabled = true;

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 60, 60),
  new THREE.MeshStandardMaterial({
    receivedShadowNode: true,
    color: "#874aa4",
    roughness: 0.2,
  }),
);
// sphere.receiveShadow = true;
sphere.castShadow = true;
sphere.position.set(0, 3, 0);
scene.add(sphere);

//Shaders
const uniforms = {
  u_time: { type: "f", value: 0.0 },
  u_resolution: {
    type: "v2",
    value: new THREE.Vector2(
      window.innerWidth,
      window.innerHeight,
    ).multiplyScalar(window.devicePixelRatio),
  },
  u_mouse: { type: "v2", value: new THREE.Vector2(0.0, 0.0) },
};

window.addEventListener("mousemove", function (e) {
  uniforms.u_mouse.value.set(
    e.screenX / this.window.innerWidth,
    1 - e.screenY / this.window.innerWidth,
  );
});

const glsl = (x) => x[0];

const vertexShader = glsl`
uniform float u_time;
varying vec2 vUv;
void main(){
  // vUv = uv; // How to get the texture on the plane
  // float newX = cos(position.x * u_time) * 2.0 * cos(position.y * u_time);
  // vec3 newPosition = vec3(newX, position.y, position.z);
  gl_Position = projectionMatrix * modelViewMatrix  * vec4(position, 1.0);
}`;

const fragmentShader = glsl`
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform sampler2D image;
varying vec2 vUv;
void main(){
  vec2 st = gl_FragCoord.xy / u_resolution;
  vec4 texture = texture2D(image, st);
  gl_FragColor = vec4(0.55,0.33,0.89, 1.0);
}`;
//Plane
const planeGeo = new THREE.PlaneGeometry(15, 15, 128, 128);
const plane = new THREE.Mesh(
  planeGeo,
  new THREE.MeshStandardMaterial({
    color: "#3091db",
    side: THREE.DoubleSide,
  }),
);
plane.receiveShadow = true;
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

const offsets = [];
const GRASS_BLADES = 1024;
const GRASS_BLADE_VERTICES = 15;
const GRASS_PATCH_SIZE = 10;
const VERTICES = 15;

function CreateIndexBuffer() {
  const indices = [];

  const halfVerts = Math.floor(VERTICES / 2);
  for (let i = 0; i < halfVerts - 1; i++) {
    // Left triangle of quad
    indices.push(i * 2, i * 2 + 1, i * 2 + 2);
    // Right triangle of quad
    indices.push(i * 2 + 1, i * 2 + 3, i * 2 + 2);
  }

  return new THREE.BufferAttribute(new Uint32Array(indices), 1);
}

function CreateTileGeometry(grass_x, grass_y) {
  for (let i = 0; i < grass_x; i++) {
    const x = i / grass_y - 0.5;
    for (let j = 0; j < grass_x; j++) {
      const y = j / grass_y - 0.5;
      offsets.push(x * GRASS_PATCH_SIZE + Math.random() * 0.4 - 0.2);
      offsets.push(y * GRASS_PATCH_SIZE + Math.random() * 0.4 - 0.2);
      offsets.push(0);
    }
  }

  const offsetsData = new Float32Array(offsets);

  const vertID = new Uint8Array(GRASS_BLADE_VERTICES);
  for (let i = 0; i < VERTICES; i++) {
    vertID[i] = i;
  }

  const geo = new THREE.InstancedBufferGeometry();
  geo.instanceCount = GRASS_BLADES;
  geo.setAttribute("vertIndex", new THREE.Uint8BufferAttribute(vertID, 1));
  geo.setAttribute(
    "position",
    new THREE.InstancedBufferAttribute(offsetsData, 3),
  );
  geo.setIndex(CreateIndexBuffer());
  return geo;
}

const grassGeo = CreateTileGeometry(100, 100);
console.log(grassGeo);
const grassMesh = new THREE.InstancedMesh(
  grassGeo,
  new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: uniforms,
  }),
);
grassMesh.position.set(0, 0, 0);
scene.add(grassMesh);

scene.fog = new THREE.FogExp2(0x0f1f21, 0.01);

const spotlight = new THREE.SpotLight("#fff7b9");
spotlight.intensity = 500;
spotlight.angle = 0.15;
spotlight.penumbra = 1;
spotlight.position.set(-15, 15, 0);
spotlight.castShadow = true;
spotlight.shadow.mapSize.width = 2048;
spotlight.shadow.mapSize.height = 2048;
scene.add(spotlight);

const rectLight = new THREE.RectAreaLight("#ffa722", 1.0, 2.0, 2.0);
rectLight.position.set(0, 6, 0);
rectLight.intensity = 3;
rectLight.lookAt(0, 0, 0);
scene.add(rectLight, new RectAreaLightHelper(rectLight));

const gui = new dat.GUI();

window.addEventListener("resize", () => {
  //update size
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const clock = new THREE.Clock();
const loop = () => {
  uniforms.u_time.value = clock.getElapsedTime();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();
