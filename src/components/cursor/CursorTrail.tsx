"use client";

import { useRef, useEffect } from "react";
import { useMotion } from "@/system/motion/useMotion";

// Improved constants for ultra-smooth, fast-fading trail
const FADE_DURATION = 420; // ms - trail lifetime
const MIN_DISTANCE = 0.25; // px - balanced point density
const TENSION = 0.5; // Catmull-Rom tension for smooth curves
const MAX_POINTS = 55; // Max points before force cleanup
const SMOOTHING_PASSES = 3; // Multiple passes for extra smoothness

type TrailPoint = { x: number; y: number; time: number };

// Multi-pass smoothing with weighted averaging for ultra-smooth curves
function smoothPoints(points: TrailPoint[]): TrailPoint[] {
  const n = points.length;
  if (n < 3) return points;

  let result = [...points];

  // Multiple smoothing passes for extra smoothness
  for (let pass = 0; pass < SMOOTHING_PASSES; pass++) {
    const temp: TrailPoint[] = [{ ...result[0] }];
    for (let i = 1; i < result.length - 1; i++) {
      const prev = result[i - 1];
      const curr = result[i];
      const next = result[i + 1];
      // Gaussian-like weighted average for smooth interpolation
      temp.push({
        x: prev.x * 0.25 + curr.x * 0.5 + next.x * 0.25,
        y: prev.y * 0.25 + curr.y * 0.5 + next.y * 0.25,
        time: curr.time,
      });
    }
    temp.push({ ...result[result.length - 1] });
    result = temp;
  }

  return result;
}

// Build smooth Quadratic Bezier path for perfectly curved lines
function buildPathD(points: TrailPoint[]): string {
  const n = points.length;
  if (n < 2) return "";
  if (n === 2)
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;

  // Start path
  let d = `M ${points[0].x} ${points[0].y}`;

  // Use Quadratic Bezier curves for smooth connection between points
  if (n === 3) {
    // Simple case: single quadratic curve
    d += ` Q ${points[1].x} ${points[1].y} ${points[2].x} ${points[2].y}`;
  } else {
    // Multiple points: use averaged control points for smooth curves
    // First segment: quadratic to midpoint
    const mid1x = (points[0].x + points[1].x) / 2;
    const mid1y = (points[0].y + points[1].y) / 2;
    d += ` Q ${points[0].x} ${points[0].y} ${mid1x} ${mid1y}`;

    // Middle segments: smooth quadratic curves through midpoints
    for (let i = 1; i < n - 1; i++) {
      const midx = (points[i].x + points[i + 1].x) / 2;
      const midy = (points[i].y + points[i + 1].y) / 2;
      d += ` Q ${points[i].x} ${points[i].y} ${midx} ${midy}`;
    }

    // Last segment: quadratic to end point
    const lastPoint = points[n - 1];
    d += ` Q ${lastPoint.x} ${lastPoint.y} ${lastPoint.x} ${lastPoint.y}`;
  }

  return d;
}

// Optimized update with gradient debouncing
let lastGradUpdate = 0;
let lastTail = { x: 0, y: 0 };
let lastHead = { x: 0, y: 0 };

function updateTrail(
  points: TrailPoint[],
  glowPath: SVGPathElement | null,
  corePath: SVGPathElement | null,
  glowGrad: SVGLinearGradientElement | null,
  coreGrad: SVGLinearGradientElement | null
) {
  if (points.length < 2) {
    glowPath?.setAttribute("d", "");
    corePath?.setAttribute("d", "");
    return;
  }

  const smoothed = smoothPoints(points);
  const pathD = buildPathD(smoothed);
  const tail = smoothed[0];
  const head = smoothed[smoothed.length - 1];

  // Always update paths
  glowPath?.setAttribute("d", pathD);
  corePath?.setAttribute("d", pathD);

  // Debounce gradient updates (only if moved significantly)
  const now = performance.now();
  const tailDist = Math.hypot(tail.x - lastTail.x, tail.y - lastTail.y);
  const headDist = Math.hypot(head.x - lastHead.x, head.y - lastHead.y);

  if (now - lastGradUpdate > 16 || tailDist > 5 || headDist > 5) {
    if (glowGrad) {
      glowGrad.setAttribute("x1", String(tail.x));
      glowGrad.setAttribute("y1", String(tail.y));
      glowGrad.setAttribute("x2", String(head.x));
      glowGrad.setAttribute("y2", String(head.y));
    }
    if (coreGrad) {
      coreGrad.setAttribute("x1", String(tail.x));
      coreGrad.setAttribute("y1", String(tail.y));
      coreGrad.setAttribute("x2", String(head.x));
      coreGrad.setAttribute("y2", String(head.y));
    }
    lastGradUpdate = now;
    lastTail = { x: tail.x, y: tail.y };
    lastHead = { x: head.x, y: head.y };
  }
}

export default function CursorTrail() {
  const { reducedMotion, motionConfig, isReady } = useMotion();
  const trailRef = useRef<TrailPoint[]>([]);
  const glowPathRef = useRef<SVGPathElement>(null);
  const corePathRef = useRef<SVGPathElement>(null);
  const glowGradRef = useRef<SVGLinearGradientElement>(null);
  const coreGradRef = useRef<SVGLinearGradientElement>(null);
  const rafFadeRef = useRef<number>(0);
  const rafMoveRef = useRef<number>(0);

  const showCursor =
    isReady && !reducedMotion && motionConfig.enableCursorEffects;

  useEffect(() => {
    if (!showCursor) return;

    // Auto-fade loop: continuously remove old points
    function fadeLoop() {
      const now = performance.now();
      const arr = trailRef.current;

      // Remove expired points
      while (arr.length > 0 && now - arr[0].time > FADE_DURATION) {
        arr.shift();
      }

      // Force cleanup if too many points
      if (arr.length > MAX_POINTS) {
        arr.splice(0, arr.length - MAX_POINTS);
      }

      // Update visual if there are points
      if (arr.length > 0) {
        updateTrail(
          arr,
          glowPathRef.current,
          corePathRef.current,
          glowGradRef.current,
          coreGradRef.current
        );
        rafFadeRef.current = requestAnimationFrame(fadeLoop);
      } else {
        rafFadeRef.current = 0;
      }
    }

    // Mouse move handler
    const handleMove = (e: MouseEvent) => {
      const arr = trailRef.current;
      const last = arr[arr.length - 1];
      const now = performance.now();

      // Check distance threshold
      if (
        last &&
        Math.hypot(e.clientX - last.x, e.clientY - last.y) < MIN_DISTANCE
      )
        return;

      // Add new point with timestamp
      arr.push({ x: e.clientX, y: e.clientY, time: now });

      // Start fade loop if not running
      if (!rafFadeRef.current) {
        rafFadeRef.current = requestAnimationFrame(fadeLoop);
      }

      // Immediate update on move (debounced internally)
      if (rafMoveRef.current) cancelAnimationFrame(rafMoveRef.current);
      rafMoveRef.current = requestAnimationFrame(() => {
        updateTrail(
          arr,
          glowPathRef.current,
          corePathRef.current,
          glowGradRef.current,
          coreGradRef.current
        );
        rafMoveRef.current = 0;
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafFadeRef.current) cancelAnimationFrame(rafFadeRef.current);
      if (rafMoveRef.current) cancelAnimationFrame(rafMoveRef.current);
    };
  }, [showCursor]);

  if (!showCursor) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden
    >
      <svg
        className="absolute inset-0 w-full h-full select-none"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient
            ref={glowGradRef}
            id="cursor-trail-glow"
            x1="0"
            y1="0"
            x2="0"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#6B9FF7" stopOpacity="0" />
            <stop offset="40%" stopColor="#8B9FF8" stopOpacity="0.12" />
            <stop offset="75%" stopColor="#a78bfa" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.14" />
          </linearGradient>
          <linearGradient
            ref={coreGradRef}
            id="cursor-trail-core"
            x1="0"
            y1="0"
            x2="0"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#6B9FF7" stopOpacity="0" />
            <stop offset="35%" stopColor="#7BA9F7" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#8B9FF8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.95" />
          </linearGradient>
          <filter
            id="cursor-trail-blur"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
        </defs>
        <g>
          <path
            ref={glowPathRef}
            d=""
            fill="none"
            stroke="url(#cursor-trail-glow)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "url(#cursor-trail-blur)" }}
          />
          <path
            ref={corePathRef}
            d=""
            fill="none"
            stroke="url(#cursor-trail-core)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}
