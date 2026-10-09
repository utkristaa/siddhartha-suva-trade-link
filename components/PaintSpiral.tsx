"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const COLORS = ["#3E6A8A", "#C0553F", "#D9A441", "#7E9C84", "#B9A4D9"];
const ARMS = 5;
const PER_ARM = 520;

function makeDot() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 2, 32, 32, 30);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.55, "rgba(255,255,255,0.85)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

function Spiral() {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const visible = useRef(false);
  const { gl, invalidate } = useThree();

  const { positions, colors, texture } = useMemo(() => {
    const total = ARMS * PER_ARM;
    const positions = new Float32Array(total * 3);
    const colors = new Float32Array(total * 3);
    const col = new THREE.Color();
    for (let a = 0; a < ARMS; a++) {
      col.set(COLORS[a]);
      for (let i = 0; i < PER_ARM; i++) {
        const k = a * PER_ARM + i;
        const u = i / PER_ARM;
        const seed = Math.random();
        const angle = u * Math.PI * 5.2 + (a / ARMS) * Math.PI * 2;
        const radius = 0.25 + u * 3.9 + (seed - 0.5) * 0.85 * (0.4 + u);
        positions[k * 3] = Math.cos(angle) * radius;
        positions[k * 3 + 1] = Math.sin(angle) * radius;
        positions[k * 3 + 2] = (u - 0.5) * 3.4 + (seed - 0.5) * 1.4 + Math.sin(angle) * 0.2;
        const shade = 0.82 + Math.random() * 0.3;
        colors[k * 3] = col.r * shade;
        colors[k * 3 + 1] = col.g * shade;
        colors[k * 3 + 2] = col.b * shade;
      }
    }
    return { positions, colors, texture: makeDot() };
  }, []);

  useEffect(() => {
    const canvas = gl.domElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: number | null = null;
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      if (visible.current) invalidate();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      if (entry.isIntersecting) {
        invalidate();
        if (!reducedMotion && timer === null) timer = window.setInterval(invalidate, 1000 / 24);
      } else if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    }, { rootMargin: "80px" });

    observer.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      observer.disconnect();
      if (timer !== null) window.clearInterval(timer);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [gl, invalidate]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    group.current!.rotation.y = THREE.MathUtils.lerp(group.current!.rotation.y, pointer.current.x * 0.4 + Math.sin(t * 0.16) * 0.08, 0.08);
    group.current!.rotation.x = THREE.MathUtils.lerp(group.current!.rotation.x, -pointer.current.y * 0.28 + Math.cos(t * 0.13) * 0.04, 0.08);
    group.current!.rotation.z = Math.sin(t * 0.09) * 0.035;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
          <bufferAttribute attach="attributes-color" array={colors} count={colors.length / 3} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.2} map={texture} vertexColors transparent depthWrite={false} sizeAttenuation alphaTest={0.01} />
      </points>
    </group>
  );
}

export default function PaintSpiral() {
  return (
    <div className="h-full w-full" role="img" aria-label="Interactive spiral of flowing paint colour">
      <Canvas frameloop="demand" camera={{ position: [0, 0, 7.2], fov: 50 }} dpr={[1, 1.5]}>
        <Spiral />
      </Canvas>
    </div>
  );
}
