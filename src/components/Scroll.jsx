// components/Scroll.js
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Scroll({ onClick }) {
  const scrollRef = useRef();

  // Slowly rotate the scroll for a subtle effect
  useFrame(() => {
    if (scrollRef.current) {
      scrollRef.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh
      ref={scrollRef}
      position={[0, -1, 2]} // adjust position as needed
      rotation={[0, 0, Math.PI / 2]} // rotate so it lies horizontally if desired
      onClick={onClick}
    >
      <cylinderGeometry args={[0.1, 0.1, 0.8, 32]} />
      <meshStandardMaterial color="burlywood" />
    </mesh>
  );
}
