"use client";
import React from "react";

export default function XeroxMachine({ onClick, ...props }) {
  return (
    <group onClick={onClick} {...props}>
      {/* Body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 0.8]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      {/* Paper tray */}
      <mesh position={[0, 0.1, 0.3]}>
        <boxGeometry args={[0.8, 0.2, 0.6]} />
        <meshStandardMaterial color="#777" />
      </mesh>
      {/* Control panel */}
      <mesh position={[0, 1.1, -0.2]}>
        <boxGeometry args={[0.6, 0.5, 0.05]} />
        <meshStandardMaterial color="#fdfcfb" />
      </mesh>
    </group>
  );
}
