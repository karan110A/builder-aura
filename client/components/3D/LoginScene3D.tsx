import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Html } from "@react-three/drei";
import LoginParticles from "./LoginParticles";
import MorphingShapes from "./MorphingShapes";
import FloatingGradCap from "./FloatingGradCap";
import FloatingBooks from "./FloatingBooks";

interface LoginScene3DProps {
  className?: string;
  interactive?: boolean;
}

function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      {/* Environment and lighting */}
      <Environment preset="night" />
      <fog attach="fog" args={["#0a0a1e", 10, 50]} />
      
      {/* Interactive particle system */}
      <LoginParticles count={800} mousePosition={mousePosition} />
      
      {/* Animated geometric shapes */}
      <MorphingShapes />
      
      {/* Educational elements */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <FloatingGradCap />
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <FloatingBooks />
      </Float>
      
      {/* Additional atmospheric elements */}
      <ambientLight intensity={0.2} color="#4f46e5" />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.5}
        color="#ffffff"
        castShadow
      />
      <pointLight position={[0, 0, 10]} intensity={0.3} color="#8b5cf6" />
      <pointLight position={[-10, -10, 0]} intensity={0.2} color="#06b6d4" />
    </>
  );
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    </Html>
  );
}

export default function LoginScene3D({ className, interactive = true }: LoginScene3DProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  return (
    <div className={className}>
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 75,
          near: 0.1,
          far: 100,
        }}
        style={{
          background: "linear-gradient(135deg, #0f0c29 0%, #24243e 50%, #2d1b69 100%)",
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene mousePosition={mousePosition} />
          {interactive && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={0.5}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.5}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
