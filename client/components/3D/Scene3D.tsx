import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';

interface Scene3DProps {
  children: React.ReactNode;
  className?: string;
  enableControls?: boolean;
  camera?: {
    position: [number, number, number];
    fov?: number;
  };
}

export default function Scene3D({ 
  children, 
  className = "w-full h-64", 
  enableControls = false,
  camera = { position: [0, 0, 5], fov: 75 }
}: Scene3DProps) {
  return (
    <div className={className}>
      <Canvas>
        <PerspectiveCamera
          makeDefault
          position={camera.position}
          fov={camera.fov || 75}
        />
        {enableControls && (
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        )}
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
