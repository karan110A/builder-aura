import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Box, Octahedron, Torus, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface ShapeProps {
  position: [number, number, number];
  scale?: number;
  color: string;
  type: "sphere" | "box" | "octahedron" | "torus";
}

function MorphingShape({ position, scale = 1, color, type }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      const time = state.clock.elapsedTime;
      
      // Gentle rotation
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.rotation.z = time * 0.1;
      
      // Pulsing scale
      const pulseFactor = 1 + Math.sin(time * 2) * 0.1;
      meshRef.current.scale.setScalar(scale * pulseFactor);
      
      // Distortion animation
      materialRef.current.distort = 0.3 + Math.sin(time) * 0.2;
      materialRef.current.speed = 2;
    }
  });

  const renderShape = () => {
    const sharedProps = {
      ref: meshRef,
      position,
    };

    const material = (
      <MeshDistortMaterial
        ref={materialRef}
        color={color}
        transparent
        opacity={0.7}
        wireframe={false}
        distort={0.3}
        speed={2}
        roughness={0.1}
        metalness={0.8}
      />
    );

    switch (type) {
      case "sphere":
        return (
          <Sphere {...sharedProps} args={[1, 32, 32]}>
            {material}
          </Sphere>
        );
      case "box":
        return (
          <Box {...sharedProps} args={[1.5, 1.5, 1.5]}>
            {material}
          </Box>
        );
      case "octahedron":
        return (
          <Octahedron {...sharedProps} args={[1.2]}>
            {material}
          </Octahedron>
        );
      case "torus":
        return (
          <Torus {...sharedProps} args={[1, 0.4, 16, 32]}>
            {material}
          </Torus>
        );
      default:
        return null;
    }
  };

  return renderShape();
}

export default function MorphingShapes() {
  const shapes: ShapeProps[] = [
    {
      position: [-4, 2, -5],
      scale: 0.8,
      color: "#3b82f6",
      type: "sphere",
    },
    {
      position: [4, -2, -3],
      scale: 0.6,
      color: "#8b5cf6",
      type: "box",
    },
    {
      position: [-3, -3, -7],
      scale: 0.7,
      color: "#06b6d4",
      type: "octahedron",
    },
    {
      position: [3, 3, -6],
      scale: 0.9,
      color: "#10b981",
      type: "torus",
    },
    {
      position: [0, -4, -8],
      scale: 0.5,
      color: "#f59e0b",
      type: "sphere",
    },
    {
      position: [-5, 0, -4],
      scale: 0.4,
      color: "#ef4444",
      type: "octahedron",
    },
  ];

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#ffffff" />
      
      {shapes.map((shape, index) => (
        <MorphingShape
          key={index}
          position={shape.position}
          scale={shape.scale}
          color={shape.color}
          type={shape.type}
        />
      ))}
    </>
  );
}
