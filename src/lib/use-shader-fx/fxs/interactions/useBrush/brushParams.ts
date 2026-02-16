import * as THREE from "three";
import type { PointerValues } from "../../../misc/usePointer";

export type BrushParams = {
  texture?: THREE.Texture | false;
  map?: THREE.Texture | false;
  mapIntensity?: number;
  radius?: number;
  smudge?: number;
  dissipation?: number;
  motionBlur?: number;
  motionSample?: number;
  color?:
    | ((velocity: THREE.Vector2) => THREE.Vector3)
    | THREE.Vector3
    | THREE.Color;
  /** Brush stroke alpha (0–1), for subtle trail use ~0.2–0.4 */
  brushAlpha?: number;
  isCursor?: boolean;
  pressure?: number;
  pointerValues?: PointerValues | false;
};

export const BRUSH_PARAMS: BrushParams = Object.freeze({
  texture: false,
  map: false,
  mapIntensity: 0.1,
  radius: 0.05,
  smudge: 0.0,
  dissipation: 1.0,
  motionBlur: 0.0,
  motionSample: 5,
  color: new THREE.Vector3(1.0, 0.0, 0.0),
  brushAlpha: 1.0,
  isCursor: false,
  pressure: 1.0,
  pointerValues: false,
});
