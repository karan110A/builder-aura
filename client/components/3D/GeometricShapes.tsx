import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Box, Octahedron, Torus } from "@react-three/drei";
import * as THREE from "three";

interface ShapeProps {
  position: [number, number, number];
  color: string;
  type: "sphere" | "box" | "octahedron" | "torus";
}

function Shape({ position, color, type }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2;
    }
  });

  const shapeComponent = () => {
    switch (type) {
      case "sphere":
        return <Sphere ref={meshRef} args={[0.5, 32, 32]} />;
      case "box":
        return <Box ref={meshRef} args={[0.8, 0.8, 0.8]} />;
      case "octahedron":
        return <Octahedron ref={meshRef} args={[0.6]} />;
      case "torus":
        return <Torus ref={meshRef} args={[0.5, 0.2, 16, 32]} />;
      default:
        return <Sphere ref={meshRef} args={[0.5, 32, 32]} />;
    }
  };

  return (
    <group position={position}>
      {shapeComponent()}
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
    </group>
  );
}

export default function GeometricShapes() {
  const shapes = [
    {
      position: [-3, 0, 0] as [number, number, number],
      color: "#3b82f6",
      type: "sphere" as const,
    },
    {
      position: [-1, 1, -2] as [number, number, number],
      color: "#ef4444",
      type: "box" as const,
    },
    {
      position: [1, -1, 1] as [number, number, number],
      color: "#10b981",
      type: "octahedron" as const,
    },
    {
      position: [3, 0.5, -1] as [number, number, number],
      color: "#f59e0b",
      type: "torus" as const,
    },
    {
      position: [0, -2, 0] as [number, number, number],
      color: "#8b5cf6",
      type: "sphere" as const,
    },
  ];

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      {shapes.map((shape, index) => (
        <Shape
          key={index}
          position={shape.position}
          color={shape.color}
          type={shape.type}
        />
      ))}
    </>
  );
}
