// components/Door.js
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Door({ onClick, ...props }) {
  const doorRef = useRef();

  useFrame(() => {
    // Optional: animate door opening or add hover effects
  });

  return (
    <group onClick={onClick} {...props}>
      {/* Door Panel */}
      <mesh ref={doorRef} position={[0, -1, 0]}>
        <boxGeometry args={[1, 2, 0.1]} />
        <meshStandardMaterial color="saddlebrown" />
      </mesh>
      {/* Door Handle */}
      <mesh position={[0.45, -1.2, 0.05]}>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
        <meshStandardMaterial color="gold" />
      </mesh>
    </group>
  );
}
