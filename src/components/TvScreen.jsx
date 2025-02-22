"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function TvScreen({ onClick, ...props }) {
  const tvRef = useRef();

  // Optional: add any subtle animation if desired
  useFrame(() => {
    // e.g., a slow pulsing glow effect could be added here
  });

  return (
    <group onClick={onClick} {...props}>
      {/* TV Body / Frame */}
      <mesh ref={tvRef}>
        <boxGeometry args={[1.8, 1.2, 0.13]} />
        <meshStandardMaterial color="#222" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* TV Screen */}
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[1.6, 1]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          emissive="#0055ff"
          emissiveIntensity={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </group>
  );
}
