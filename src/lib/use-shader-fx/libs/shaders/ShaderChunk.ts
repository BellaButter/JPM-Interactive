import planeVertex from "./shaderChunk/planeVertex";

export type ShaderChunkTypes = "planeVertex";

export const ShaderChunk: { [K in ShaderChunkTypes]: string } = Object.freeze({
  planeVertex,
});
