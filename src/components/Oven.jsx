"use client";
import React from "react";

export default function Oven({ onClick, ...props }) {
  return (
    <group onClick={onClick} {...props}>
      {/* Oven Body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.5, 1, 1]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      {/* Oven Door */}
      <mesh position={[0, 0.5, 0.51]}>
        <planeGeometry args={[1.1, 0.6]} />
        <meshStandardMaterial color="#ccc" />
      </mesh>
      {/* Oven Door Handle */}
      <mesh position={[0.45, 0.5, 0.55]}>
        <boxGeometry args={[0.1, 0.3, 0.05]} />
        <meshStandardMaterial color="#888" />
      </mesh>
    </group>
  );
}
