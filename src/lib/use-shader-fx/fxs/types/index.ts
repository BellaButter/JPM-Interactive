import * as THREE from "three";
import { RootState } from "@react-three/fiber";

export type Size = { width: number; height: number };

export type Dpr =
  | number
  | {
      shader?: false | number;
      fbo?: false | number;
    };

export type OnBeforeInitParameters = {
  uniforms: { [uniform: string]: THREE.IUniform };
  fragmentShader: string;
  vertexShader: string;
};

export type MaterialProps = {
  onBeforeInit?: (parameters: OnBeforeInitParameters) => void;
};

export interface HooksProps extends MaterialProps {
  size: Size;
  dpr: Dpr;
  isSizeUpdate?: boolean;
  renderTargetOptions?: THREE.RenderTargetOptions;
}

export type HooksReturn<T, O, C> = [
  (rootState: RootState, newParams?: T, customParams?: C) => THREE.Texture,
  (newParams?: T, customParams?: C) => void,
  O
];
