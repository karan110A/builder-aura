import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Text } from "@react-three/drei";
import * as THREE from "three";

interface BookProps {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  subject: string;
}

function Book({ position, rotation, color, subject }: BookProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && textRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      textRef.current.rotation.y += 0.005;
      textRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <group position={position}>
      <Box ref={meshRef} args={[0.8, 1.2, 0.1]} rotation={rotation}>
        <meshStandardMaterial color={color} />
      </Box>
      <Text
        ref={textRef}
        position={[0, 0, 0.06]}
        rotation={rotation}
        fontSize={0.1}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={0.6}
      >
        {subject}
      </Text>
    </group>
  );
}

export default function FloatingBooks() {
  const books = [
    {
      position: [-2, 0, 0] as [number, number, number],
      rotation: [0.1, 0.2, 0.1] as [number, number, number],
      color: "#3b82f6",
      subject: "Math",
    },
    {
      position: [0, 1, -1] as [number, number, number],
      rotation: [-0.1, -0.3, 0.2] as [number, number, number],
      color: "#ef4444",
      subject: "Physics",
    },
    {
      position: [2, -0.5, 0.5] as [number, number, number],
      rotation: [0.2, 0.1, -0.1] as [number, number, number],
      color: "#10b981",
      subject: "Chemistry",
    },
    {
      position: [-1, -1, 1] as [number, number, number],
      rotation: [-0.2, 0.4, 0.1] as [number, number, number],
      color: "#f59e0b",
      subject: "Biology",
    },
    {
      position: [1.5, 1.5, -0.5] as [number, number, number],
      rotation: [0.1, -0.2, 0.3] as [number, number, number],
      color: "#8b5cf6",
      subject: "English",
    },
  ];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      {books.map((book, index) => (
        <Book
          key={index}
          position={book.position}
          rotation={book.rotation}
          color={book.color}
          subject={book.subject}
        />
      ))}
    </>
  );
}
