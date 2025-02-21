// components/Board.jsx
import React from "react";
import { Text } from "@react-three/drei";

export default function Board({ onClick, ...props }) {
  return (
    <group onClick={onClick} {...props}>
      {/* Board Top (table surface) */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.6, 1, 0.2]} />
        <meshStandardMaterial color="beige" />
      </mesh>
      {/* Text on the board */}
      <Text
        position={[0, 1, 0.11]} // Slightly above the board surface
        fontSize={0.2}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        match
      </Text>
    </group>
  );
}
