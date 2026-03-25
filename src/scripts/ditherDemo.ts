import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as dat from "dat.gui";
import * as CANNON from "cannon-es";
import { BlueDitheringPass } from "./BlueDitheringPass.ts";
import {
  EffectComposer,
  RenderPass,
  AfterimagePass,
} from "three/examples/jsm/Addons.js";

type PhysicsMesh = {
  mesh: THREE.Mesh;
  body: CANNON.Body;
};

export default function initDitherDemo(canvas: HTMLCanvasElement) {
  const sizes = {
    width: canvas.clientWidth,
    height: canvas.clientHeight,
  };
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

  const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.1,
    1000,
  );

  camera.position.z = 20;
  camera.position.y = 30;
  camera.position.x = -20;
  new OrbitControls(camera, renderer.domElement);
  scene.add(camera);

  //Add world
  const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.81, 0),
  });
  const timeStep = 1 / 30;

  renderer.setClearColor(0xffffff, 0.0); //transparent
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
  renderer.shadowMap.enabled = true;
  renderer.debug.checkShaderErrors = true;

  const gui = new dat.GUI({ autoPlace: false });
  const options = {
    highcolor: "#ffffff",
    midcolor: "#61cf9a",
    lowcolor: "#000000",
  };

  const guiContainer = document.getElementById("gui-container");
  guiContainer!.appendChild(gui.domElement);

  //Post Proc First render pass
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const ditherPass = new BlueDitheringPass("#ffffff", "#61cf9a", "#040405");
  gui.addColor(options, "highcolor").onChange((e: Event) => {
    ditherPass.highTint = e;
  });
  gui.addColor(options, "midcolor").onChange((e: Event) => {
    ditherPass.midTint = e;
  });
  gui.addColor(options, "lowcolor").onChange((e: Event) => {
    ditherPass.lowTint = e;
  });

  composer.addPass(ditherPass);
  composer.addPass(new AfterimagePass(0.7));

  // Add object on mouse click
  const mouse = new THREE.Vector2();
  const intersectionPoint = new THREE.Vector3();
  const planeNormal = new THREE.Vector3();
  const planeRayCast = new THREE.Plane();
  const raycaster = new THREE.Raycaster();

  const mouseHandler = (e: MouseEvent) => {
    mouse.x = (e.clientX / canvas.width) * 2 - 1;
    mouse.y = -(e.clientY / canvas.height) * 2 + 1;
    planeNormal.copy(camera.position).normalize();
    planeRayCast.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(planeRayCast, intersectionPoint);
  };

  window.addEventListener("mousemove", mouseHandler);

  //Sphere
  const sphereGeo = new THREE.SphereGeometry(3, 32, 32);
  const sphereMat = new THREE.MeshStandardMaterial({
    color: "#0e695e",
    roughness: 0.2,
  });
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  sphere.castShadow = true;

  //Sphere body
  const spherePhyMat = new CANNON.Material();
  const sphereBody = new CANNON.Body({
    shape: new CANNON.Sphere(3),
    mass: 1,
    type: CANNON.Body.DYNAMIC,
    material: spherePhyMat,
  });
  sphereBody.linearDamping = 0.31;
  sphereBody.position.set(0, 20, 0);
  world.addBody(sphereBody);

  //Box
  const boxGeo = new THREE.BoxGeometry(2, 2, 2);
  const boxMat = new THREE.MeshStandardMaterial({
    color: "#f4ced8",
    roughness: 0.1,
  });
  const box = new THREE.Mesh(boxGeo, boxMat);
  box.castShadow = true;
  box.receiveShadow = true;
  scene.add(box);

  //box body
  const boxPhysMat = new CANNON.Material();
  const boxBody = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
    mass: 2,
    type: CANNON.Body.DYNAMIC,
    position: new CANNON.Vec3(1, 15, 0),
    material: boxPhysMat,
  });
  // boxBody.position.set(0, 15, 0);
  boxBody.angularVelocity.set(1, 5, 1);
  boxBody.angularDamping = 0.3;
  world.addBody(boxBody);

  //Plane
  const planeGeo = new THREE.PlaneGeometry(24, 24, 3, 3);
  const planeMat = new THREE.MeshStandardMaterial({
    color: 0xb55042,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(planeGeo, planeMat);
  plane.receiveShadow = true;
  scene.add(sphere, plane);
  // plane.rotation.x = -0.5 * Math.PI;

  //Ground body
  const groundPhysMat = new CANNON.Material();
  const groundBody = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(12, 12, 0.1)),
    material: groundPhysMat,
    type: CANNON.Body.STATIC,
  });
  groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  world.addBody(groundBody);

  // Make interaction, slippery
  const groundBodyContactMat = new CANNON.ContactMaterial(
    groundPhysMat,
    boxPhysMat,
    { friction: 0.001 },
  );
  const groundSphereContactMat = new CANNON.ContactMaterial(
    groundPhysMat,
    spherePhyMat,
    { restitution: 0.95, contactEquationStiffness: 1000 },
  );
  world.addContactMaterial(groundBodyContactMat);
  world.addContactMaterial(groundSphereContactMat);

  const physicsObjects: PhysicsMesh[] = [];

  const clickHandler = () => {
    //Sphere mesh
    const sphereGeo = new THREE.SphereGeometry(0.5, 30, 30);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: Math.random() * 0xffffff,
      roughness: 0.2,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.castShadow = true;
    scene.add(sphere);

    if (intersectionPoint.y < 0) intersectionPoint.y = 5;
    sphere.position.copy(intersectionPoint);

    //Sphere body
    const spherePhyMat = new CANNON.Material();
    const sphereBody = new CANNON.Body({
      shape: new CANNON.Sphere(0.5),
      mass: 1,
      type: CANNON.Body.DYNAMIC,
      material: spherePhyMat,
    });
    sphereBody.linearDamping = 0.31;
    sphereBody.position.copy(
      new CANNON.Vec3(
        intersectionPoint.x,
        intersectionPoint.y,
        intersectionPoint.z,
      ),
    );
    world.addBody(sphereBody);

    // Contact material
    const groundSphereContactMat = new CANNON.ContactMaterial(
      groundPhysMat,
      spherePhyMat,
      { restitution: 0.99, contactEquationStiffness: 1000 },
    );

    world.addContactMaterial(groundSphereContactMat);

    // spheres.push(sphere);
    // bodies.push(sphereBody);
    physicsObjects.push({ mesh: sphere, body: sphereBody });
  };
  window.addEventListener("click", clickHandler);

  //FOG
  scene.fog = new THREE.FogExp2(0x0f1f21, 0.01);

  //LIGHTS
  const spotlight = new THREE.SpotLight(0xfffffff, 10000);
  spotlight.angle = 0.2;
  spotlight.penumbra = 1;
  spotlight.position.set(-50, 50, 0);
  spotlight.castShadow = true;
  scene.add(spotlight);

  const backlight = new THREE.PointLight(0xf55742, 1, 100);
  backlight.position.set(-10, -10, -10);
  backlight.intensity = 100;
  scene.add(backlight);

  //Gui

  var obj = {
    reset: function () {
      sphereBody.position.set(0, 5, 0);
      sphereBody.velocity.set(0, 0, 0);
      boxBody.position.set(0.5, 15, 0);
      boxBody.velocity.set(0.0, 0.0, 0.0);
    },
  };

  gui.add(obj, "reset");

  // Post Processing

  const resizeObserver = new ResizeObserver(() => {
    const width = canvas.parentElement!.clientWidth;
    const height = canvas.parentElement!.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    composer.setSize(width, height);
  });

  resizeObserver.observe(canvas.parentElement!);

  const loop = () => {
    world.step(timeStep);
    //Fuse mesh with physics body
    plane.position.copy(groundBody.position);
    plane.quaternion.copy(groundBody.quaternion);

    sphere.position.copy(sphereBody.position);
    sphere.quaternion.copy(sphereBody.quaternion);

    box.position.copy(boxBody.position);
    box.quaternion.copy(boxBody.quaternion);

    // Add clicked balls
    physicsObjects.forEach((object) => {
      object.mesh.position.copy(object.body.position);
      object.mesh.quaternion.copy(object.body.quaternion);
    });

    //   renderer.render(scene, camera);
    composer.render(); // Render through effect composer
    window.requestAnimationFrame(loop);
  };

  loop();

  return () => {
    window.removeEventListener("mousemove", mouseHandler);
    window.removeEventListener("click", clickHandler);
    guiContainer!.removeChild(gui.domElement);
    gui.destroy();
    renderer.dispose();
    composer.dispose();
  };
}
