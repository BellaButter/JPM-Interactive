import * as THREE from "three";
import { useEffect, useMemo } from "react";

type Object3DConstructor<T, M extends THREE.Material> = new (
  geometry: THREE.BufferGeometry,
  material: M
) => T;

export const useAddObject = <
  T extends THREE.Object3D,
  M extends THREE.Material
>(
  scene: THREE.Scene | false,
  geometry: THREE.BufferGeometry,
  material: M,
  Proto: Object3DConstructor<T, M>
) => {
  const object3D = useMemo(() => {
    const obj = new Proto(geometry, material);
    if (scene) scene.add(obj);
    return obj;
  }, [geometry, material, Proto, scene]);

  useEffect(() => {
    return () => {
      if (scene) scene.remove(object3D);
      geometry.dispose();
      material.dispose();
    };
  }, [scene, geometry, material, object3D]);

  return object3D;
};
