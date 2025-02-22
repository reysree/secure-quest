// components/Safe.jsx
import React, { useRef } from "react";

export default function Safe({ onClick, ...props }) {
  return (
    <group onClick={onClick} {...props}>
      {/* Safe Body */}
      <mesh>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      {/* Safe Dial */}
      <mesh position={[0, -0.4, 0.8]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
}
