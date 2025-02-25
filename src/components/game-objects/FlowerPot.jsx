"use client";
import React from "react";

export default function Flowerpot({ onClick, ...props }) {
  return (
    <group onClick={onClick} {...props}>
      {/* Flowerpot: a brown cylinder */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.3, 0.2, 0.5, 32]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Plant: a green cone with increased height segments for a smoother top */}
      <mesh position={[0, 0.8, 0]}>
        <coneGeometry args={[0.2, 0.6, 32, 8]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </group>
  );
}
