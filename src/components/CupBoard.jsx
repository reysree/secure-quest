"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Cupboard({ onClick, ...props }) {
  const cupboardRef = useRef();

  // No animation is applied, the object remains static.
  return (
    <group onClick={onClick} ref={cupboardRef} {...props}>
      {/* Cupboard Body */}
      <mesh position={[6, -1.4, 18.5]}>
        <boxGeometry args={[2, 4, 0.5]} />
        <meshStandardMaterial color="#e67e22" />
      </mesh>

      {/* Cupboard Door (simulate a door panel, slightly offset in z) */}
      <mesh position={[6, -1.4, 18.76]}>
        <planeGeometry args={[1.4, 1.8]} />
        <meshStandardMaterial color="#CD853F" />
      </mesh>

      {/* Shelves inside the cupboard */}
      {/* Lower Shelf */}
      <mesh position={[6, -2.0, 18.4]}>
        <boxGeometry args={[1.8, 0.1, 0.45]} />
        <meshStandardMaterial color="#d35400" />
      </mesh>
      {/* Upper Shelf */}
      <mesh position={[6, -1.0, 18.4]}>
        <boxGeometry args={[1.8, 0.1, 0.45]} />
        <meshStandardMaterial color="#d35400" />
      </mesh>
      <mesh position={[6, 0, 18.4]}>
        <boxGeometry args={[1.8, 0.1, 0.45]} />
        <meshStandardMaterial color="#d35400" />
      </mesh>

      {/* Books on the upper shelf */}
      {/* Left Book */}
      <mesh position={[5.4, -0.7, 18.2]}>
        <boxGeometry args={[0.3, 0.5, 0.1]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>
      {/* Middle Book */}
      <mesh position={[6, -0.7, 18.2]}>
        <boxGeometry args={[0.3, 0.5, 0.1]} />
        <meshStandardMaterial color="#9b59b6" />
      </mesh>
      {/* Right Book */}
      <mesh position={[6.6, -0.7, 18.2]}>
        <boxGeometry args={[0.3, 0.5, 0.1]} />
        <meshStandardMaterial color="#e74c3c" />
      </mesh>
    </group>
  );
}
