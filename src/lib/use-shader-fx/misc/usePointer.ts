import * as THREE from "three";
import { useCallback, useRef } from "react";

export type PointerValues = {
  currentPointer: THREE.Vector2;
  prevPointer: THREE.Vector2;
  diffPointer: THREE.Vector2;
  velocity: THREE.Vector2;
  isVelocityUpdate: boolean;
};

type UpdatePointer = (currentPointer: THREE.Vector2) => PointerValues;

export const usePointer = (lerp = 0): UpdatePointer => {
  const prevPointer = useRef(new THREE.Vector2(0, 0));
  const diffPointer = useRef(new THREE.Vector2(0, 0));
  const lerpPointer = useRef(new THREE.Vector2(0, 0));
  const lastUpdateTime = useRef(0);
  const velocity = useRef(new THREE.Vector2(0, 0));
  const isMoved = useRef(false);

  const updatePointer = useCallback(
    (currentPointer: THREE.Vector2) => {
      const now = performance.now();

      let current: THREE.Vector2;
      if (isMoved.current && lerp) {
        lerpPointer.current.lerp(currentPointer, 1 - lerp);
        current = lerpPointer.current.clone();
      } else {
        current = currentPointer.clone();
        lerpPointer.current.copy(current);
      }

      if (lastUpdateTime.current === 0) {
        lastUpdateTime.current = now;
        prevPointer.current.copy(current);
      }
      const deltaTime = Math.max(1, now - lastUpdateTime.current);
      lastUpdateTime.current = now;

      velocity.current
        .copy(current)
        .sub(prevPointer.current)
        .divideScalar(deltaTime);
      const isUpdate = velocity.current.length() > 0;

      const prevTemp = isMoved.current
        ? prevPointer.current.clone()
        : current;
      if (!isMoved.current && isUpdate) {
        isMoved.current = true;
      }
      prevPointer.current.copy(current);

      diffPointer.current.subVectors(current, prevTemp);

      return {
        currentPointer: current,
        prevPointer: prevTemp,
        diffPointer: diffPointer.current,
        velocity: velocity.current,
        isVelocityUpdate: isUpdate,
      };
    },
    [lerp]
  );

  return updatePointer;
};
