// GLSL 100 - no #version so Three.js RawShaderMaterial prefix does not break compile
export default `
precision highp float;

attribute vec3 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;
