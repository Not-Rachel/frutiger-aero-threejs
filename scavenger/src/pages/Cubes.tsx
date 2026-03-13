import { useEffect, useRef, useState } from "react";
import FadeContent from "../components/FadeContent";
import TopNav from "../components/ScavNav";
import {
  createVertexBuffer,
  createProgram,
  createIndexBuffer,
} from "./gl-utils";
import {
  create3DVao,
  CUBE_VERTICES,
  CUBE_INDICES,
  TABLE_VERTICES,
  TABLE_INDICES,
} from "./geometry";
import { glMatrix, mat4, vec3 } from "gl-matrix";

function Cubes() {
  const errorRef = useRef(null);
  const canvasRef = useRef(null);

  // const [modelUniform, setModelLocation] = useState(null);
  // const [viewProjectionUniform, setVPLocation] = useState(null);

  // const [cubeVAO, setCubeVAO] = useState(null);

  let model = mat4.create();
  let view = mat4.create();
  let projection = mat4.create();
  let viewProjection = mat4.create();

  const [errorText, setErrorText] = useState<string | null>(null);

  const [displayRotation, setDisplayRotation] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const rotateX = useRef(0);
  const rotateY = useRef(0);
  const update = useRef(true);

  const [previousTime, setPreviousTime] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      // requestAnimationFrame(frame); //
      update.current = true;

      switch (event.key) {
        case "ArrowUp":
          rotateY.current += 5.5;
          break;
        case "ArrowDown":
          rotateY.current -= 5.5;
          break;
        case "ArrowLeft":
          rotateX.current -= 5.5;
          break;
        case "ArrowRight":
          rotateX.current += 5.5;
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const vs = `#version 300 es
    precision mediump float;
    in vec3 vertexPosition;
    in vec3 vertexColor;

    out vec3 fragmentColor;

    uniform mat4 model;
    uniform mat4 viewProjection;

    void main(){
        fragmentColor = vertexColor;
        // Matrix operations 
        gl_Position = viewProjection * model * vec4(vertexPosition,1.0);
    }`;

  const fs = `#version 300 es
    precision mediump float;
    in vec3 fragmentColor;
    out vec4 outputColor; 

    void main(){
        outputColor = vec4(fragmentColor, 1.0);
    }`;

  function render() {
    console.log("Rerender");
    if (!canvasRef.current) {
      setErrorText("Cannot get canvas reference");
      return;
    }
    const canvas = canvasRef.current as HTMLCanvasElement;
    const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
    if (!gl) {
      setErrorText("Browser does not support WebGL 2");
      return;
    }
    // Send data to GPU
    const cubeVertices = createVertexBuffer(gl, CUBE_VERTICES, setErrorText);
    const cubeIndices = createIndexBuffer(gl, CUBE_INDICES, setErrorText);
    const tableVertices = createVertexBuffer(gl, TABLE_VERTICES, setErrorText);
    const tableIndices = createIndexBuffer(gl, TABLE_INDICES, setErrorText);

    if (!cubeVertices || !cubeIndices || !tableVertices || !tableIndices) {
      setErrorText("Data Buffers not initalized");
      return null;
    }

    const cubeProgram = createProgram(gl, vs, fs, setErrorText) as WebGLProgram;

    gl.useProgram(cubeProgram);
    const vertexAttrib = gl.getAttribLocation(cubeProgram, "vertexPosition");
    const colorAttrib = gl.getAttribLocation(cubeProgram, "vertexColor");
    const modelUniform = gl.getUniformLocation(cubeProgram, "model");
    // setModelLocation(modelUniform);
    const viewProjectionUniform = gl.getUniformLocation(
      cubeProgram,
      "viewProjection"
    );
    // setVPLocation(viewProjectionUniform);

    if (
      vertexAttrib < 0 ||
      colorAttrib < 0 ||
      !modelUniform ||
      !viewProjectionUniform
    ) {
      setErrorText(
        `Could not find attribute! vertexPosition: ${!vertexAttrib}, vertexColor: ${!colorAttrib}`
      );
      return;
    }

    //VAOs
    const cubeVAO = create3DVao(
      gl,
      cubeVertices,
      cubeIndices,
      vertexAttrib,
      colorAttrib,
      setErrorText
    );

    // setCubeVAO(cubeVAO);
    const tableVAO = create3DVao(
      gl,
      tableVertices,
      tableIndices,
      vertexAttrib,
      colorAttrib,
      setErrorText
    );
    if (!cubeVAO || !tableVAO) {
      setErrorText("VAO not initalized");
      return null;
    }

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gl.clearColor(0.0, 0.0, 0.0, 0.0); // use canvas color
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    // Set up rasterizer
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(cubeProgram);

    setPreviousTime(globalThis.performance.now());
    let rotate = 0;

    const frame = function () {
      if (true) {
        update.current = false;

        // if (spin) {
        const currentTime = globalThis.performance.now();
        const dt = (currentTime - previousTime) / 1000;
        setPreviousTime(currentTime);
        // }

        const toRad = (deg: number) => deg * (Math.PI / 180);
        rotate += toRad(1);

        const radius = 5;
        const theta = rotate % (2 * Math.PI); // horizontal angle
        const phi = toRad(50); // vertical angle

        const cameraX = radius * Math.sin(phi) * Math.cos(theta);
        const cameraY = radius * Math.cos(phi);
        const cameraZ = radius * Math.sin(phi) * Math.sin(theta);

        // setDisplayRotation({ x: cameraX, y: cameraY, z: cameraZ });

        console.log(cameraX, cameraY, cameraZ, rotate);
        // console.log(rotateX.current, rotateY.current);

        mat4.lookAt(
          view,
          vec3.fromValues(cameraX, cameraY, cameraZ),
          // vec3.fromValues(rotate, 0, 0),
          vec3.fromValues(0, 0, 0),
          vec3.fromValues(0, 1, 0)
        );
        mat4.perspective(
          projection,
          glMatrix.toRadian(80),
          canvas.width / canvas.height,
          0.1,
          100.0
        );
      }

      mat4.multiply(viewProjection, projection, view);
      gl.uniformMatrix4fv(modelUniform, false, model);
      gl.uniformMatrix4fv(viewProjectionUniform, false, viewProjection);

      gl.bindVertexArray(cubeVAO);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);

      gl.drawElements(gl.TRIANGLES, CUBE_INDICES.length, gl.UNSIGNED_SHORT, 0);

      requestAnimationFrame(frame); // Show When rendering code to draw an image is finished running
    };

    // if (update.current) {
    requestAnimationFrame(frame); // Show When rendering code to draw an image is finished running
    // }
    return;
  }

  useEffect(() => {
    try {
      render();
    } catch (e) {
      setErrorText(`JS Exception: ${e}`);
    }
  }, []);

  return (
    <div className="relative w-full h-full border-1">
      {/* <TopNav></TopNav>
      <FadeContent
        blur={true}
        duration={300}
        easing="ease-out"
        initialOpacity={0}
        className="bg-black flex items-center justify-center"
      > */}
      {errorText && (
        <div
          id="error-box"
          ref={errorRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 rounded-2xl border border-white p-4 bg-black bg-opacity-20 text-center z-50"
        >
          <span className="text-red-500 text-lg font-semibold">
            {errorText}
          </span>
        </div>
      )}

      {/* <div className=" absolute border-spacing-2 border-1 left-0 top-0 border-white m-2 p-2 text-white ">
        <p>
          {displayRotation.x.toFixed(2)} , {displayRotation.y.toFixed(2)} ,{" "}
          {displayRotation.z.toFixed(2)}
        </p>
      </div> */}

      {/* <table className=" border-separate  border-spacing-2 border-1 absolute left-0 top-0 border-white m-2 text-white ">
          <tbody>
            <tr>
              <th>0.0</th>
              <th>0.0</th>
              <th>0.0</th>
            </tr>
            <tr>
              <th>0.0</th>
              <th>0.0</th>
              <th>0.0</th>
            </tr>
            <tr>
              <th>0.0</th>
              <th>0.0</th>
              <th>0.0</th>
            </tr>
          </tbody>
        </table> */}
      <canvas
        ref={canvasRef}
        id="demo-canvas"
        className="h-[100%] w-[100%] border-2 border-white"
      ></canvas>
      {/* </FadeContent> */}
    </div>
  );
}

export default Cubes;
