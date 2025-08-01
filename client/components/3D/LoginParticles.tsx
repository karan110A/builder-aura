import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface LoginParticlesProps {
  count?: number;
  mousePosition?: { x: number; y: number };
}

export default function LoginParticles({
  count = 1000,
  mousePosition,
}: LoginParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Random positions in a larger space
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      // Gradient colors from blue to purple
      const factor = Math.random();
      colors[i3] = 0.2 + factor * 0.6; // Red
      colors[i3 + 1] = 0.4 + factor * 0.4; // Green
      colors[i3 + 2] = 0.8 + factor * 0.2; // Blue

      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    return [positions, colors, velocities];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;
    const geometry = pointsRef.current.geometry;
    const positionAttribute = geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Update positions with wave motion
      positionAttribute.array[i3] += velocities[i3];
      positionAttribute.array[i3 + 1] +=
        velocities[i3 + 1] + Math.sin(time + i * 0.01) * 0.001;
      positionAttribute.array[i3 + 2] += velocities[i3 + 2];

      // Mouse interaction
      if (mousePosition) {
        const mouseX = (mousePosition.x - 0.5) * 10;
        const mouseY = -(mousePosition.y - 0.5) * 10;

        const dx = positionAttribute.array[i3] - mouseX;
        const dy = positionAttribute.array[i3 + 1] - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 3) {
          const force = (3 - distance) / 3;
          positionAttribute.array[i3] += dx * force * 0.01;
          positionAttribute.array[i3 + 1] += dy * force * 0.01;
        }
      }

      // Boundary wrapping
      if (positionAttribute.array[i3] > 10) positionAttribute.array[i3] = -10;
      if (positionAttribute.array[i3] < -10) positionAttribute.array[i3] = 10;
      if (positionAttribute.array[i3 + 1] > 10)
        positionAttribute.array[i3 + 1] = -10;
      if (positionAttribute.array[i3 + 1] < -10)
        positionAttribute.array[i3 + 1] = 10;
    }

    positionAttribute.needsUpdate = true;

    // Rotate the entire system slowly
    pointsRef.current.rotation.y += 0.001;
    pointsRef.current.rotation.x += 0.0005;
  });

  return (
    <Points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}
