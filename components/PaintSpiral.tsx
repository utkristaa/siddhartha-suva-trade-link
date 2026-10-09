"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const COLORS = ["#3E6A8A", "#C0553F", "#D9A441", "#7E9C84", "#B9A4D9"];
const ARMS = 5;
const PER_ARM = 760;

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
  const points = useRef<THREE.Points>(null);

  const { positions, colors, base, texture } = useMemo(() => {
    const total = ARMS * PER_ARM;
    const positions = new Float32Array(total * 3);
    const colors = new Float32Array(total * 3);
    const base = new Float32Array(total * 3); // t, arm, seed
    const col = new THREE.Color();
    for (let a = 0; a < ARMS; a++) {
      col.set(COLORS[a]);
      for (let i = 0; i < PER_ARM; i++) {
        const k = a * PER_ARM + i;
        base[k * 3] = i / PER_ARM;
        base[k * 3 + 1] = a;
        base[k * 3 + 2] = Math.random();
        const shade = 0.82 + Math.random() * 0.3;
        colors[k * 3] = col.r * shade;
        colors[k * 3 + 1] = col.g * shade;
        colors[k * 3 + 2] = col.b * shade;
      }
    }
    return { positions, colors, base, texture: makeDot() };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pos = points.current!.geometry.attributes.position as THREE.BufferAttribute;
    const px = state.pointer.x;
    const py = state.pointer.y;
    for (let k = 0; k < ARMS * PER_ARM; k++) {
      const u = base[k * 3];
      const arm = base[k * 3 + 1];
      const seed = base[k * 3 + 2];
      const angle = u * Math.PI * 5.2 + (arm / ARMS) * Math.PI * 2 + t * 0.35;
      const radius = 0.25 + u * 2.35 + Math.sin(t * 0.9 + u * 9 + arm) * 0.09 * u;
      const spread = (seed - 0.5) * 0.16 * (0.4 + u);
      let x = Math.cos(angle) * (radius + spread);
      let y = Math.sin(angle) * (radius + spread);
      const z = (u - 0.5) * 2.4 + Math.sin(t * 0.6 + angle) * 0.18 + spread;
      const dx = px * 2.6 - x;
      const dy = py * 2.6 - y;
      const d = Math.hypot(dx, dy);
      const pull = Math.exp(-d * 1.2) * 0.35;
      x += dx * pull;
      y += dy * pull;
      pos.setXYZ(k, x, y, z);
    }
    pos.needsUpdate = true;
    group.current!.rotation.y = THREE.MathUtils.lerp(group.current!.rotation.y, px * 0.45, 0.04);
    group.current!.rotation.x = THREE.MathUtils.lerp(group.current!.rotation.x, -py * 0.3, 0.04);
  });

  return (
    <group ref={group}>
      <points ref={points}>
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
      <Canvas camera={{ position: [0, 0, 6.2], fov: 45 }} dpr={[1, 2]}>
        <Spiral />
      </Canvas>
    </div>
  );
}
