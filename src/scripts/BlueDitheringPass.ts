import * as THREE from "three";
import { ShaderPass } from "three/examples/jsm/Addons.js";
import bluenoise64 from "/assets/HDR_L_2.png";

export class BlueDitheringPass extends ShaderPass {
  colors: THREE.Color[];
  constructor(colors = ["#ffffff", "#ffc971", "aa00da", "#000000"]) {
    const VS = `
      varying vec2 vUv;
      void main(){
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vUv = uv;
      }
    `;

    const FS = `
      #include <common>
      
      uniform sampler2D tDiffuse;
      uniform sampler2D bluenoise;
      uniform vec2 u_resolution;
      uniform vec3 high_tint;
      uniform vec3 med_high_tint;
      uniform vec3 tint;
      uniform vec3 low_tint;
      uniform float lowThreshold;
      uniform float midThreshold;
      uniform float highThreshold;
      uniform float bluenoiseSize;

      uniform int palletSize;
      uniform vec3[32] pallet ;
      
      varying vec2 vUv;
      
      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution;
        vec4 noise = texture2D(bluenoise, st);

        vec4 diffuse = texture2D(tDiffuse, vUv);
        float luma = dot(diffuse.rgb, vec3(0.299, 0.587, 0.114)); //Convert to greyscale

        float threshold = texture2D(bluenoise, fract(gl_FragCoord.xy / bluenoiseSize)).r;

        // TODO: Make it applicable to more than 4 colors
        // vec3 result = pallet[palletSize -1];
        // float new_threshold = threshold;
        // for (int i = 0; i < 32; i++) {
        //     if (i >= palletSize) break;

        //     if (luma < new_threshold){
        //       result = pallet[i];
        //       break;
        //     }
        //     new_threshold += 0.1;
           
            
        // }
        float low  = threshold + lowThreshold;
        float high = threshold + highThreshold;
        float mid = threshold + midThreshold;

        vec3 result =
        (luma < low)  ? low_tint :
        (luma < mid) ? med_high_tint:
        (luma < high) ? tint :
                        high_tint;

        // vec3 col = diffuse.rgb;

        // float d0 = distance(col, low_tint);
        // float d1 = distance(col, med_high_tint);
        // float d2 = distance(col, tint);
        // float d3 = distance(col, high_tint);

        // // Pick closest
        // vec3 result = low_tint;
        // float minDist = d0;

        // if (d1 < minDist) { minDist = d1; result = tint; }
        // if (d2 < minDist) { minDist = d2; result = med_high_tint; }
        // if (d3 < minDist) { minDist = d3; result = high_tint; }

        gl_FragColor = vec4(result,1.0);
      }
    `;

    const tex = new THREE.TextureLoader().load(bluenoise64);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;

    const MAX_COLORS = 32;

    const pallet = colors.map((c) => new THREE.Color(c));

    while (pallet.length < MAX_COLORS) pallet.push(new THREE.Color(0, 0, 0));

    const Shader = {
      uniforms: {
        u_resolution: {
          type: "v2",
          value: new THREE.Vector2(
            window.innerWidth,
            window.innerHeight,
          ).multiplyScalar(window.devicePixelRatio),
        },
        high_tint: { value: new THREE.Color(colors[3]) },
        tint: { value: new THREE.Color(colors[2]) },
        med_high_tint: { value: new THREE.Color(colors[1]) },
        low_tint: { value: new THREE.Color(colors[0]) },
        lowThreshold: { value: 0.005 },
        midThreshold: { value: 0.03 },
        highThreshold: { value: 0.6 },
        bluenoise: { value: tex },
        bluenoiseSize: { value: 64.0 },
        tDiffuse: { value: null },
        // Color pallet in decreasing value
        pallet: {
          value: pallet,
        },
        palletSize: { value: pallet.length },
      },
      vertexShader: VS,
      fragmentShader: FS,
    };

    super(Shader);
    this.colors = pallet;
  }

  set highTint(v) {
    this.uniforms.high_tint.value.set(v);
  }
  get highTint() {
    return this.uniforms.high_tint.value;
  }
  set midHighTint(v) {
    this.uniforms.med_high_tint.value.set(v);
  }
  get midHighTint() {
    return this.uniforms.med_high_tint.value;
  }

  set midTint(v) {
    this.uniforms.tint.value.set(v);
  }
  get midTint() {
    return this.uniforms.tint.value;
  }

  set lowTint(v) {
    this.uniforms.low_tint.value.set(v);
  }
  get lowTint() {
    return this.uniforms.low_tint.value;
  }

  set colorCount(v) {
    this.uniforms.colorCount.value.set(v);
  }

  get colorCount() {
    return this.uniforms.colorCount.value;
  }
}
