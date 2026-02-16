import * as THREE from "three";
import { useMesh } from "./useMesh";
import { useCamera } from "../../../utils/useCamera";
import { useCallback, useMemo, useRef } from "react";
import { RootState } from "@react-three/fiber";
import { PointerValues, usePointer } from "../../../misc/usePointer";
import {
  setCustomUniform,
  setUniform,
} from "../../../utils/setUniforms";
import { HooksProps, HooksReturn } from "../../../fxs/types";
import { useParams } from "../../../utils/useParams";
import { DoubleRenderTarget, useDoubleFBO } from "../../../utils/useDoubleFBO";
import { getDpr } from "../../../utils/getDpr";
import type { CustomParams, UniformObject } from "../../../utils/setUniforms";
import { BRUSH_PARAMS, type BrushParams } from "./brushParams";

export type { BrushParams };
export { BRUSH_PARAMS };

export type BrushObject = {
  scene: THREE.Scene;
  mesh: THREE.Mesh;
  material: THREE.Material;
  camera: THREE.Camera;
  renderTarget: DoubleRenderTarget;
  output: THREE.Texture;
};

export const useBrush = ({
  size,
  dpr,
  renderTargetOptions,
  isSizeUpdate,
  onBeforeInit,
}: HooksProps): HooksReturn<BrushParams, BrushObject, CustomParams> => {
  const _dpr = getDpr(dpr);

  const scene = useMemo(() => new THREE.Scene(), []);
  const { material, mesh } = useMesh({
    scene,
    size,
    dpr: _dpr.shader,
    onBeforeInit,
  });
  const camera = useCamera(size);
  const updatePointer = usePointer();
  const [renderTarget, updateRenderTarget] = useDoubleFBO({
    scene,
    camera,
    size,
    dpr: _dpr.fbo,
    isSizeUpdate,
    ...renderTargetOptions,
  });

  const [params, setParams] = useParams<BrushParams>(BRUSH_PARAMS);

  const pressureEnd = useRef<number | null>(null);

  const updateValue = setUniform(material as { uniforms: UniformObject });
  const updateCustomValue = setCustomUniform(material as { uniforms: UniformObject });

  const updateParams = useCallback(
    (newParams?: BrushParams, customParams?: CustomParams) => {
      setParams(newParams);
      updateCustomValue(customParams);
    },
    [setParams, updateCustomValue]
  );

  const updateFx = useCallback(
    (
      rootState: RootState,
      newParams?: BrushParams,
      customParams?: CustomParams
    ) => {
      const { gl, pointer } = rootState;

      updateParams(newParams, customParams);

      if (params.texture) {
        updateValue("uIsTexture", true);
        updateValue("uTexture", params.texture);
      } else {
        updateValue("uIsTexture", false);
      }

      if (params.map) {
        updateValue("uIsMap", true);
        updateValue("uMap", params.map);
        updateValue("uMapIntensity", params.mapIntensity ?? 0.1);
      } else {
        updateValue("uIsMap", false);
      }

      updateValue("uRadius", params.radius ?? 0.05);
      updateValue("uSmudge", params.smudge ?? 0);
      updateValue("uDissipation", params.dissipation ?? 1);
      updateValue("uMotionBlur", params.motionBlur ?? 0);
      updateValue("uMotionSample", params.motionSample ?? 5);

      const pointerValues: PointerValues =
        params.pointerValues && typeof params.pointerValues === "object"
          ? params.pointerValues
          : updatePointer(pointer);

      if (pointerValues.isVelocityUpdate) {
        updateValue("uMouse", pointerValues.currentPointer);
        updateValue("uPrevMouse", pointerValues.prevPointer);
      }
      updateValue("uVelocity", pointerValues.velocity);

      const color: THREE.Vector3 | THREE.Color =
        typeof params.color === "function"
          ? params.color(pointerValues.velocity)
          : (params.color as THREE.Vector3) ?? new THREE.Vector3(1, 0, 0);
      updateValue("uColor", color);

      updateValue("uIsCursor", params.isCursor ?? false);
      updateValue("uBrushAlpha", params.brushAlpha ?? 1);

      const pressure = params.pressure ?? 1;
      updateValue("uPressureEnd", pressure);
      if (pressureEnd.current === null) {
        pressureEnd.current = pressure;
      }
      updateValue("uPressureStart", pressureEnd.current);
      pressureEnd.current = pressure;

      return updateRenderTarget(gl, ({ read }) => {
        updateValue("uBuffer", read);
      });
    },
    [updateValue, updatePointer, updateRenderTarget, params, updateParams]
  );

  return [
    updateFx,
    updateParams,
    {
      scene,
      mesh,
      material,
      camera,
      renderTarget,
      output: renderTarget.read.texture,
    },
  ];
};
