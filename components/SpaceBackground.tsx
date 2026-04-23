"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, MeshDistortMaterial, Sphere, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

function Planet({ position, size, wireframeColor, ringColor, rotationSpeed = 0.005 }: any) {
  const planetRef = useRef<THREE.Group>(null);
  const worldTexture = useTexture("/images/world.jpg");

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={planetRef} position={position}>
        {/* Planet Core with mandatory World Texture */}
        <mesh>
          <sphereGeometry args={[size, 64, 64]} />
          <meshStandardMaterial 
            map={worldTexture} 
            emissive={wireframeColor} 
            emissiveIntensity={0.1} 
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>

        {/* Cypher Wireframe Overlay */}
        <mesh scale={[1.01, 1.01, 1.01]}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={wireframeColor}
            wireframe
            transparent
            opacity={0.15}
            emissive={wireframeColor}
            emissiveIntensity={1}
          />
        </mesh>

        {/* Optional Cypher Ring */}
        {ringColor && (
          <mesh rotation={[Math.PI / 2.5, 0, 0]}>
            <torusGeometry args={[size * 1.8, 0.01, 16, 100]} />
            <meshStandardMaterial color={ringColor} emissive={ringColor} emissiveIntensity={2} />
          </mesh>
        )}

        {/* Atmospheric Glow */}
        <Sphere args={[size * 1.03, 32, 32]}>
          <MeshDistortMaterial
            color={wireframeColor}
            speed={1.5}
            distort={0.1}
            radius={1}
            transparent
            opacity={0.08}
          />
        </Sphere>
      </group>
    </Float>
  );
}

function Sun({ position, size }: any) {
  const sunRef = useRef<THREE.Group>(null);
  const sunTexture = useTexture("/images/sun.jpg");
  
  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={sunRef} position={position}>
      {/* 1. Hot Core with Sun Texture */}
      <mesh>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial 
          map={sunTexture}
          emissive="#ff4400" 
          emissiveIntensity={2}
        />
      </mesh>
      
      {/* 2. Boiling Plasma Surface */}
      <Sphere args={[size * 1.02, 64, 64]}>
        <MeshDistortMaterial
          color="#ff8800"
          emissive="#ffaa00"
          emissiveIntensity={2}
          speed={4}
          distort={0.2}
          radius={1}
          transparent
          opacity={0.6}
        />
      </Sphere>

      {/* 3. Outer Solar Flares / Corona */}
      <Sphere args={[size * 1.1, 64, 64]}>
        <MeshDistortMaterial
          color="#ffff00"
          emissive="#ffff00"
          emissiveIntensity={1}
          speed={6}
          distort={0.5}
          radius={1}
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* 4. Atmosphere Glow Layer */}
      <Sphere args={[size * 1.4, 32, 32]}>
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Massive Light Source to illuminate the galaxy */}
      <pointLight intensity={25} distance={200} color="#ffaa00" decay={2} />
    </group>
  );
}

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-[#010103]">
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 60 }}
        style={{ pointerEvents: 'auto', touchAction: 'none' }}
      >
        <color attach="background" args={["#010103"]} />
        <ambientLight intensity={0.5} />
        
        {/* The Sun */}
        <Sun position={[-25, 10, -30]} size={8} />
        
        <Stars 
          radius={150} 
          depth={60} 
          count={10000} 
          factor={6} 
          saturation={0} 
          fade 
          speed={0.5} 
        />
        <Suspense fallback={null}>
          {/* Main Cyber World (Earth) - Moved to the right */}
          <Planet 
            position={[10, 2, 0]} 
            size={3.2} 
            wireframeColor="#00f0ff"
            ringColor="#ff00ff"
            rotationSpeed={0.002}
          />

          {/* The Moon orbiting near the main planet - Moved accordingly */}
          <Planet 
            position={[15, 6, 2]} 
            size={0.7} 
            wireframeColor="#ffffff"
            rotationSpeed={0.015}
          />

          {/* Other Planets rearranged for better balance */}
          <Planet 
            position={[-18, -10, -10]} 
            size={1.8} 
            wireframeColor="#ff00ff"
            rotationSpeed={0.005}
          />

          <Planet 
            position={[22, -12, -25]} 
            size={4.5} 
            wireframeColor="#00ff80"
            ringColor="#00f0ff"
            rotationSpeed={0.001}
          />

          <Planet 
            position={[-25, 15, -15]} 
            size={1.5} 
            wireframeColor="#ffaa00"
            rotationSpeed={0.009}
          />
        </Suspense>


        <OrbitControls 
          makeDefault
          enableZoom={false} 
          enablePan={false} 
          rotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
}
