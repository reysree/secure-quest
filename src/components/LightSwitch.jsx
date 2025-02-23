"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function LightSwitch({ onClick, isOn, ...props }) {
  const switchRef = useRef();

  // Optional: add a subtle pulsing effect if the switch is on
  useFrame(() => {
    if (switchRef.current && isOn) {
      switchRef.current.scale.setScalar(1.05);
    }
  });

  return (
    <group onClick={onClick} ref={switchRef} {...props}>
      {/* Light switch body */}
      <mesh>
        <cylinderGeometry args={[0.1, 0.1, 0.3, 16]} />
        <meshStandardMaterial
          color="#555"
          emissive="#000"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Button indicator: a circle placed on the front face of the cylinder */}
      <mesh position={[0, 0, 0.16]}>
        <circleGeometry args={[0.08, 32]} />
        <meshStandardMaterial color={isOn ? "green" : "red"} />
      </mesh>
    </group>
  );
}
