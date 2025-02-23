// components/Cupboard.jsx
"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Cupboard({ onClick, ...props }) {
  const cupboardRef = useRef();

  // Optionally add a subtle animation
  //   useFrame(() => {
  //     if (cupboardRef.current) {
  //       cupboardRef.current.rotation.y += 0.005;
  //     }
  //   });

  return (
    <group onClick={onClick} ref={cupboardRef} {...props}>
      {/* Cupboard Body */}
      <mesh position={[6, -1.4, 18.5]}>
        <mesh>
          <boxGeometry args={[1.5, 2, 0.5]} />
          <meshStandardMaterial color="#e67e22" />
        </mesh>
        {/* Cupboard Door (simulate a door panel) */}
        <mesh position={[0, 0, 0.26]}>
          <planeGeometry args={[1.4, 1.8]} />
          <meshStandardMaterial color="#CD853F" />
        </mesh>
      </mesh>
    </group>
  );
}
