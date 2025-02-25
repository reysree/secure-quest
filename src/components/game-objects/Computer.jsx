// components/Computer.js
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Computer({ onClick, ...props }) {
  const computerRef = useRef();

  // You can add animations or interactivity if desired
  useFrame(() => {
    // Example: slight rotation on hover (if implemented)
  });

  return (
    <group onClick={onClick} {...props}>
      {/* Monitor */}
      <mesh ref={computerRef} position={[-6, 0.1, 0]}>
        <boxGeometry args={[2, 1.2, 0.1]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Monitor Stand */}
      <mesh position={[-6, -0.9, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      {/* Base */}
      <mesh position={[-6, -1.2, 0]}>
        <boxGeometry args={[1, 0.1, 0.6]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </group>
  );
}
