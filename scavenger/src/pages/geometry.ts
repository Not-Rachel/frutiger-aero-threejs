// Vertex buffer format: XYZ RGB
//
// Cube
export const CUBE_VERTICES = new Float32Array([
    // Front face
  -1.0, -1.0, 1.0,  1,0,0,
  1.0, -1.0, 1.0,   1,0,0,
  1.0, 1.0, 1.0,    1,0,0,
  -1.0, 1.0, 1.0,   1,0,0,

  // Back face
  -1.0, -1.0, -1.0, 1,0,1,
  -1.0, 1.0, -1.0,  1,0,1,
  1.0, 1.0, -1.0,   1,0,1,
  1.0, -1.0, -1.0,  1,0,1,

  // Top face
  -1.0, 1.0, -1.0,  0,1,0,
  -1.0, 1.0, 1.0,   0,1,0,
  1.0, 1.0, 1.0,    0,1,0,
  1.0, 1.0, -1.0,   0,1,0,

  // Bottom face
  -1.0, -1.0, -1.0, 0,1,1,
  1.0, -1.0, -1.0,  0,1,1,
  1.0, -1.0, 1.0,   0,1,1,
  -1.0, -1.0, 1.0,  0,1,1,

  // Right face
  1.0, -1.0, -1.0,  0,0,1, 
  1.0, 1.0, -1.0,   0,0,1,
  1.0, 1.0, 1.0,    0,0,1,
  1.0, -1.0, 1.0,   0,0,1,

  // Left face
  -1.0, -1.0, -1.0, 1,1,0,
  -1.0, -1.0, 1.0,  1,1,0,
  -1.0, 1.0, 1.0,   1,1,0,
  -1.0, 1.0, -1.0,  1,1,0,
]);

//index buffer

export const CUBE_INDICES = new Uint16Array([
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,   // left
]);

export const TABLE_VERTICES = new Float32Array([
    -10.0, 0.0, -10.0,  0.2,0.2,0.2,
    -10.0, 0.0, 10.0,    0.2,0.2,0.2,
    10.0, 0.0, 10.0,    0.2,0.2,0.2,
    10.0, 0.0, -10.0,   0.2,0.2,0.2,
]);

export const TABLE_INDICES = new Uint16Array([
      0,  1, 2,     0,  2, 3,   // top
]);

export function create3DVao(
    gl:WebGL2RenderingContext,
    vertexBuffer: WebGLBuffer,
    indexBuffer:WebGLBuffer,
    posAttrib:number, colorAttrib:number, setErrorText:Function
){
    const vao = gl.createVertexArray();
    if (!vao) {
      setErrorText("Failed to allocate VAO");
      return null;
    }
    gl.bindVertexArray(vao);

    gl.enableVertexAttribArray(posAttrib);
    gl.enableVertexAttribArray(colorAttrib);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(posAttrib,3, gl.FLOAT, false, 6*Float32Array.BYTES_PER_ELEMENT,0 );
    gl.vertexAttribPointer(colorAttrib,3, gl.FLOAT, false, 6* Float32Array.BYTES_PER_ELEMENT, 3*Float32Array.BYTES_PER_ELEMENT);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bindVertexArray(null);// stop setting attribs

    return vao;
};