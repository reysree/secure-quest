"use client";
import React from "react";

export default function Table({ onClick, ...props }) {
  return (
    <group onClick={onClick} {...props}>
      {/* Table Top */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[3, 0.1, 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Four Legs */}
      <mesh position={[-1.3, 0.375, -0.45]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[1.3, 0.375, -0.45]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-1.3, 0.375, 0.45]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[1.3, 0.375, 0.45]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
}
