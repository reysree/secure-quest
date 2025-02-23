"use client";
import React, { useMemo } from "react";
import * as THREE from "three";

export default function Safe({ onClick, ...props }) {
  // Create the line geometry connecting the two dials horizontally
  const lineGeometry = useMemo(() => {
    const points = [
      new THREE.Vector3(-0.4, 0, 0.8), // position of first dial
      new THREE.Vector3(0.4, 0, 0.8), // position of second dial
    ];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  return (
    <group onClick={onClick} {...props}>
      {/* Safe Body */}
      <mesh>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      {/* Dial 1 */}
      <mesh position={[0, 0.3, 0.8]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Dial 2 */}
      <mesh position={[0, -0.5, 0.8]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Line connecting the two dials horizontally */}
      <line geometry={lineGeometry}>
        <lineBasicMaterial color="black" />
      </line>
    </group>
  );
}
