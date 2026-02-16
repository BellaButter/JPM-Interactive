import * as THREE from "three";
import { useCallback, useEffect, useMemo } from "react";
import {
  FBO_DEFAULT_OPTION,
  UseFboProps,
  renderFBO,
} from "./useSingleFBO";
import { useResolution } from "./useResolution";

export type DoubleRenderTarget = {
  read: THREE.WebGLRenderTarget;
  write: THREE.WebGLRenderTarget;
};

interface WebGLDoubleRenderTarget extends DoubleRenderTarget {
  swap: () => void;
}

type FBOUpdateFunction = (
  gl: THREE.WebGLRenderer,
  onBeforeRender?: ({
    read,
    write,
  }: {
    read: THREE.Texture;
    write: THREE.Texture;
  }) => void
) => THREE.Texture;

export const useDoubleFBO = (props: UseFboProps) => {
  const {
    scene,
    camera,
    size,
    dpr = false,
    isSizeUpdate = false,
    useDepthTexture = false,
    ...renderTargetOptions
  } = props;

  const resolution = useResolution(size, dpr);

  const renderTarget = useMemo<WebGLDoubleRenderTarget>(() => {
    const read = new THREE.WebGLRenderTarget(resolution.x, resolution.y, {
      ...FBO_DEFAULT_OPTION,
      ...renderTargetOptions,
    });
    const write = new THREE.WebGLRenderTarget(resolution.x, resolution.y, {
      ...FBO_DEFAULT_OPTION,
      ...renderTargetOptions,
    });

    if (useDepthTexture) {
      read.depthTexture = new THREE.DepthTexture(
        resolution.x,
        resolution.y,
        THREE.FloatType
      );
      write.depthTexture = new THREE.DepthTexture(
        resolution.x,
        resolution.y,
        THREE.FloatType
      );
    }

    return {
      read,
      write,
      swap() {
        const temp = this.read;
        this.read = this.write;
        this.write = temp;
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isSizeUpdate) {
    renderTarget.read.setSize(resolution.x, resolution.y);
    renderTarget.write.setSize(resolution.x, resolution.y);
  }

  useEffect(() => {
    const rt = renderTarget;
    return () => {
      rt.read.dispose();
      rt.write.dispose();
    };
  }, [renderTarget]);

  const updateRenderTarget: FBOUpdateFunction = useCallback(
    (gl, onBeforeRender) => {
      renderFBO({
        gl,
        scene,
        camera,
        fbo: renderTarget.write,
        onBeforeRender: () =>
          onBeforeRender?.({
            read: renderTarget.read.texture,
            write: renderTarget.write.texture,
          }),
        onSwap: () => renderTarget.swap(),
      });
      return renderTarget.read.texture;
    },
    [scene, camera, renderTarget]
  );

  return [
    { read: renderTarget.read, write: renderTarget.write },
    updateRenderTarget,
  ] as const;
};
