import * as THREE from "three";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useResolution } from "./useResolution";
import { Size } from "../fxs/types";

export const FBO_DEFAULT_OPTION: THREE.RenderTargetOptions = {
  depthBuffer: false,
};

export type UseFboProps = {
  scene: THREE.Scene;
  camera: THREE.Camera;
  size: Size;
  dpr?: number | false;
  isSizeUpdate?: boolean;
  useDepthTexture?: boolean;
} & Omit<THREE.RenderTargetOptions, "depth">;

export const renderFBO = ({
  gl,
  fbo,
  scene,
  camera,
  onBeforeRender,
  onSwap,
}: {
  gl: THREE.WebGLRenderer;
  fbo: THREE.WebGLRenderTarget;
  scene: THREE.Scene;
  camera: THREE.Camera;
  onBeforeRender: () => void;
  onSwap?: () => void;
}) => {
  gl.setRenderTarget(fbo);
  onBeforeRender();
  gl.clear();
  gl.render(scene, camera);
  onSwap?.();
  gl.setRenderTarget(null);
  gl.clear();
};

type UpdateRenderTarget = (
  gl: THREE.WebGLRenderer,
  onBeforeRender?: ({ read }: { read: THREE.Texture }) => void
) => THREE.Texture;

export const useSingleFBO = (props: UseFboProps) => {
  const {
    scene,
    camera,
    size,
    dpr = false,
    isSizeUpdate = false,
    useDepthTexture = false,
    ...renderTargetOptions
  } = props;

  const renderTargetRef = useRef<THREE.WebGLRenderTarget | null>(null);
  const resolution = useResolution(size, dpr);

  const renderTarget = useMemo(() => {
    const target = new THREE.WebGLRenderTarget(resolution.x, resolution.y, {
      ...FBO_DEFAULT_OPTION,
      ...renderTargetOptions,
    });
    if (useDepthTexture) {
      target.depthTexture = new THREE.DepthTexture(
        resolution.x,
        resolution.y,
        THREE.FloatType
      );
    }
    renderTargetRef.current = target;
    return target;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isSizeUpdate) {
    renderTarget.setSize(resolution.x, resolution.y);
  }

  useEffect(() => {
    const temp = renderTargetRef.current;
    return () => {
      temp?.dispose();
    };
  }, []);

  const updateRenderTarget: UpdateRenderTarget = useCallback(
    (gl, onBeforeRender) => {
      const fbo = renderTargetRef.current!;
      renderFBO({
        gl,
        fbo,
        scene,
        camera,
        onBeforeRender: () =>
          onBeforeRender?.({ read: fbo.texture }),
      });
      return fbo.texture;
    },
    [scene, camera]
  );

  return [renderTarget, updateRenderTarget] as const;
};
