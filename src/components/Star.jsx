"use client";
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Star({ onClick }) {
  const starRef = useRef();

  // Create a star shape with 5 points using Three.Shape
  const starShape = useMemo(() => {
    const shape = new THREE.Shape();
    const outerRadius = 0.3;
    const innerRadius = 0.1;
    const numPoints = 5;

    for (let i = 0; i < numPoints * 2; i++) {
      const angle = (i * Math.PI) / numPoints;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    shape.closePath();
    return shape;
  }, []);

  // Extrude settings to give the star some thickness
  const extrudeSettings = useMemo(
    () => ({
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 1,
    }),
    []
  );

  // Slowly rotate the star for a subtle effect
  useFrame(() => {
    if (starRef.current) {
      starRef.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh
      ref={starRef}
      position={[5.5, -1.5, 5.9]} // adjust position as needed
      rotation={[0, 0, Math.PI / 2]} // adjust rotation if desired
      onClick={onClick}
    >
      <extrudeGeometry args={[starShape, extrudeSettings]} />
      <meshStandardMaterial color="#82e0aa" />
    </mesh>
  );
}
