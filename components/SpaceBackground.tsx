"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, MeshDistortMaterial, Sphere, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";


function Sun({ position, size }: any) {
  const sunRef = useRef<THREE.Group>(null);
  const sunTexture = useTexture("/images/sun_realistic.png");
  
  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <group ref={sunRef} position={position}>
      {/* 1. Core with Realistic Texture */}
      <mesh>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial 
          map={sunTexture}
          emissive="#ff3300" 
          emissiveIntensity={2}
          roughness={0.5}
        />
      </mesh>
      
      {/* 2. Intense Plasma Layer */}
      <Sphere args={[size * 1.01, 64, 64]}>
        <MeshDistortMaterial
          color="#ff8800"
          emissive="#ff4400"
          emissiveIntensity={4}
          speed={3}
          distort={0.15}
          radius={1}
          transparent
          opacity={0.5}
        />
      </Sphere>

      {/* 3. Outer Solar Glow */}
      <Sphere args={[size * 1.2, 64, 64]}>
        <MeshDistortMaterial
          color="#ffff00"
          emissive="#ffaa00"
          emissiveIntensity={1}
          speed={5}
          distort={0.3}
          radius={1}
          transparent
          opacity={0.2}
        />
      </Sphere>

      {/* 4. Soft Corona Aura */}
      <Sphere args={[size * 1.5, 32, 32]}>
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Strong Light Source */}
      <pointLight intensity={50} distance={400} color="#ffcc00" decay={1.8} />
    </group>
  );
}

function Moon({ position, size }: any) {
  const moonRef = useRef<THREE.Group>(null);
  const moonTexture = useTexture("/images/moon.png");

  useFrame(() => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={moonRef} position={position}>
        <mesh>
          <sphereGeometry args={[size, 64, 64]} />
          <meshStandardMaterial 
            map={moonTexture} 
            roughness={1}
            metalness={0.1}
          />
        </mesh>
        
        {/* Subtle glow for the moon */}
        <mesh scale={[1.02, 1.02, 1.02]}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.05}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-[#000000]">
      <Canvas 
        camera={{ position: [0, 0, 30], fov: 60 }}
        style={{ pointerEvents: 'auto', touchAction: 'none' }}
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.2} />
        
        {/* The Sun */}
        <Sun position={[-30, 15, -40]} size={12} />
        
        <Stars 
          radius={200} 
          depth={100} 
          count={15000} 
          factor={7} 
          saturation={0} 
          fade 
          speed={0.3} 
        />
        
        <Suspense fallback={null}>
          {/* Only keep the Moon */}
          <Moon position={[12, 0, 0]} size={4} />
        </Suspense>

        <OrbitControls 
          makeDefault
          enableZoom={false} 
          enablePan={false} 
          rotateSpeed={0.4}
        />
      </Canvas>
    </div>
  );
}
