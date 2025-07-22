import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Sphere, Text } from "@react-three/drei";
import * as THREE from "three";

function RotatingGlobe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.005;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  // Create a simple earth-like texture using gradients
  const createEarthTexture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;

    // Create a gradient for continents
    const gradient = ctx.createLinearGradient(0, 0, 512, 256);
    gradient.addColorStop(0, "#4ade80"); // Green for land
    gradient.addColorStop(0.3, "#22d3ee"); // Blue for ocean
    gradient.addColorStop(0.7, "#3b82f6"); // Deeper blue
    gradient.addColorStop(1, "#1e40af"); // Deep blue

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 256);

    // Add some continent-like shapes
    ctx.fillStyle = "#16a34a";
    ctx.beginPath();
    ctx.ellipse(128, 100, 60, 40, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(350, 150, 80, 30, 0, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
  };

  const earthTexture = createEarthTexture();

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Main Globe */}
      <Sphere ref={globeRef} args={[1.5, 64, 64]}>
        <meshStandardMaterial
          map={earthTexture}
          transparent={true}
          opacity={0.9}
        />
      </Sphere>

      {/* Atmosphere */}
      <Sphere args={[1.55, 32, 32]}>
        <meshStandardMaterial
          color="#87ceeb"
          transparent={true}
          opacity={0.1}
        />
      </Sphere>

      {/* Location markers */}
      <Sphere args={[0.05, 16, 16]} position={[0.8, 0.5, 1.2]}>
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={0.3}
        />
      </Sphere>

      <Text
        position={[1.2, 0.8, 1.5]}
        fontSize={0.15}
        color="#ef4444"
        anchorX="center"
        anchorY="middle"
      >
        PadhaiHub
      </Text>
    </group>
  );
}

export default function Globe() {
  return <RotatingGlobe />;
}
