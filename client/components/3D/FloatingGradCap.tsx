import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Cylinder } from "@react-three/drei";
import * as THREE from "three";

interface GradCapProps {
  position: [number, number, number];
  scale?: number;
}

function GradCap({ position, scale = 1 }: GradCapProps) {
  const groupRef = useRef<THREE.Group>(null);
  const capRef = useRef<THREE.Mesh>(null);
  const boardRef = useRef<THREE.Mesh>(null);
  const tasselRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (
      groupRef.current &&
      capRef.current &&
      boardRef.current &&
      tasselRef.current
    ) {
      const time = state.clock.elapsedTime;

      // Main floating motion
      groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.3;
      groupRef.current.rotation.y = time * 0.2;

      // Subtle cap bobbing
      capRef.current.rotation.z = Math.sin(time * 2) * 0.05;

      // Board gentle rotation
      boardRef.current.rotation.x = Math.sin(time * 1.5) * 0.02;

      // Tassel swaying
      tasselRef.current.rotation.z = Math.sin(time * 3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Cap Base */}
      <Cylinder ref={capRef} args={[0.4, 0.5, 0.3, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.7} />
      </Cylinder>

      {/* Board */}
      <Box ref={boardRef} args={[1.2, 0.05, 1.2]} position={[0, 0.2, 0]}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.4} roughness={0.6} />
      </Box>

      {/* Button on top */}
      <Cylinder args={[0.05, 0.05, 0.02, 8]} position={[0, 0.25, 0]}>
        <meshStandardMaterial
          color="#ffd700"
          metalness={0.8}
          roughness={0.2}
          emissive="#ffaa00"
          emissiveIntensity={0.1}
        />
      </Cylinder>

      {/* Tassel */}
      <group ref={tasselRef} position={[0.6, 0.2, 0]}>
        {/* Tassel cord */}
        <Cylinder args={[0.01, 0.01, 0.3, 4]} position={[0, -0.15, 0]}>
          <meshStandardMaterial color="#ffd700" />
        </Cylinder>

        {/* Tassel end */}
        <group position={[0, -0.3, 0]}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Cylinder
              key={i}
              args={[0.005, 0.005, 0.1, 3]}
              position={[
                Math.cos((i * Math.PI * 2) / 8) * 0.03,
                -0.05,
                Math.sin((i * Math.PI * 2) / 8) * 0.03,
              ]}
            >
              <meshStandardMaterial color="#ffd700" />
            </Cylinder>
          ))}
        </group>
      </group>
    </group>
  );
}

export default function FloatingGradCap() {
  const caps = [
    { position: [-6, 1, -3] as [number, number, number], scale: 0.8 },
    { position: [6, -1, -5] as [number, number, number], scale: 0.6 },
    { position: [-3, 3, -7] as [number, number, number], scale: 0.7 },
    { position: [4, 2, -4] as [number, number, number], scale: 0.9 },
  ];

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[0, 0, 2]} intensity={0.3} color="#4f46e5" />

      {caps.map((cap, index) => (
        <GradCap key={index} position={cap.position} scale={cap.scale} />
      ))}
    </>
  );
}
