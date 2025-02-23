"use client";
import React from "react";

export default function Dustbin({ onClick, ...props }) {
  return (
    <group onClick={onClick} {...props}>
      {/* Dustbin body */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 1, 32]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      {/* Dustbin lid: using a half-sphere */}
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.35, 32, 16, 0, Math.PI]} />
        <meshStandardMaterial color="#aaa" />
      </mesh>
    </group>
  );
}
