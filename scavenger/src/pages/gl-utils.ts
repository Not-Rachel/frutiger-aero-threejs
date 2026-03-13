export function createVertexBuffer(gl: WebGL2RenderingContext, data: ArrayBuffer, setErrorText: Function) {
    const buffer = gl.createBuffer();
    if (!buffer) {
      setErrorText("Failed to allocate vertex buffer");
      return null;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW); // gpu buffer now contains vertex data
    gl.bindBuffer(gl.ARRAY_BUFFER, null); //Unbind
    return buffer;
  }
export function createIndexBuffer(gl: WebGL2RenderingContext, data: ArrayBuffer, setErrorText: Function) {
    const buffer = gl.createBuffer();
    if (!buffer) {
      setErrorText("Failed to allocate index buffer");
      return null;
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW); // gpu buffer now contains vertex data
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null); //Unbind
    return buffer;
  }

export function createProgram (gl:WebGL2RenderingContext, vsSource:string, fsSource:string, setErrorText:Function){
    const vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
    gl.shaderSource(vertexShader, vsSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      const compileError = gl.getShaderInfoLog(vertexShader);
      setErrorText(`Failed to compile vertex shader - ${compileError}`);
      return;
    }

    const fragShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
    gl.shaderSource(fragShader, fsSource);
    gl.compileShader(fragShader);
    if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
      const compileError = gl.getShaderInfoLog(fragShader);
      setErrorText(`Failed to compile fragment shader - ${compileError}`);
      return;
    }
     // Draw the triangle
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const linkError = gl.getProgramInfoLog(program);
      setErrorText(`Failed to link shaders - ${linkError}`);
      return;
    }
    return program;
    };

    