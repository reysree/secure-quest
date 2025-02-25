"use client";
import React from "react";

export default function CeilingFan({ onClick, ...props }) {
  return (
    <group onClick={onClick} {...props}>
      {/* Pole to attach the fan to the ceiling */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.5, 16]} />
        <meshStandardMaterial color="#999" />
      </mesh>

      {/* Central Hub */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Four Blades */}
      {/* Right Blade */}
      <mesh position={[0.7, 0, 0]}>
        <boxGeometry args={[1.2, 0.05, 0.3]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Left Blade */}
      <mesh position={[-0.7, 0, 0]}>
        <boxGeometry args={[1.2, 0.05, 0.3]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Front Blade */}
      <mesh position={[0, 0, 0.7]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[1.2, 0.05, 0.3]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Back Blade */}
      <mesh position={[0, 0, -0.7]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[1.2, 0.05, 0.3]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
}
