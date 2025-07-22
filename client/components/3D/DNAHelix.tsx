import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Cylinder } from "@react-three/drei";
import * as THREE from "three";

interface BasePairProps {
  position: [number, number, number];
  rotation: number;
  height: number;
}

function BasePair({ position, rotation, height }: BasePairProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotation + state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Left base */}
      <Sphere args={[0.08, 16, 16]} position={[-0.8, 0, 0]}>
        <meshStandardMaterial color="#e74c3c" />
      </Sphere>

      {/* Right base */}
      <Sphere args={[0.08, 16, 16]} position={[0.8, 0, 0]}>
        <meshStandardMaterial color="#3498db" />
      </Sphere>

      {/* Connecting cylinder */}
      <Cylinder args={[0.02, 0.02, 1.6]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#95a5a6" />
      </Cylinder>

      {/* Backbone spheres */}
      <Sphere args={[0.05, 12, 12]} position={[-1, 0, 0]}>
        <meshStandardMaterial color="#f39c12" />
      </Sphere>
      <Sphere args={[0.05, 12, 12]} position={[1, 0, 0]}>
        <meshStandardMaterial color="#f39c12" />
      </Sphere>
    </group>
  );
}

export default function DNAHelix() {
  const helixRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (helixRef.current) {
      helixRef.current.rotation.y += 0.005;
    }
  });

  const basePairs = [];
  const numPairs = 20;
  const spacing = 0.3;
  const helixHeight = numPairs * spacing;

  for (let i = 0; i < numPairs; i++) {
    const y = i * spacing - helixHeight / 2;
    const rotation = (i / numPairs) * Math.PI * 4; // Two full rotations

    basePairs.push(
      <BasePair
        key={i}
        position={[0, y, 0]}
        rotation={rotation}
        height={spacing}
      />,
    );
  }

  return (
    <group ref={helixRef}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} />
      {basePairs}
    </group>
  );
}
