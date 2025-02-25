"use client";
import React from "react";

export default function CoffeeMachine({ onClick, ...props }) {
  return (
    <group onClick={onClick} {...props}>
      {/* Coffee Machine Body */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[1, 1.2, 0.8]} />
        <meshStandardMaterial color="#b3b6b7" />
      </mesh>
      {/* Front Panel (Display Area) */}
      <mesh position={[0, 1.0, 0.41]}>
        <planeGeometry args={[0.8, 0.4]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      {/* Coffee Outlet Nozzle */}
      <mesh position={[0, 0.9, 0.41]}>
        <cylinderGeometry args={[0.08, 0.08, 0.1, 32]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      {/* Cup (Coffee Cup) - Positioned below the nozzle */}
      <group position={[0, 0.1, 0.5]}>
        {/* Cup Body */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.3, 32]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Cup Handle */}
        <mesh position={[0.18, 0.15, 0]}>
          <torusGeometry args={[0.05, 0.015, 16, 100]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Decorative Circle on Cup (brown) */}
        <mesh position={[0, 0.3, 0]} rotation={[Math.PI / -2, 0, 0]}>
          <circleGeometry args={[0.1, 37]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </group>
      {/* Drip Tray */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.1, 0.05, 1]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Four Legs under the Drip Tray */}
      {/* <mesh position={[-0.45, -0.2, -0.45]}>
        <boxGeometry args={[0.1, 0.3, 0.1]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[0.45, -0.2, -0.45]}>
        <boxGeometry args={[0.1, 0.2, 0.1]} />
        <meshStandardMaterial color="#222" />
      </mesh> */}
      {/* <mesh position={[-0.45, -0.2, 0.45]}>
        <boxGeometry args={[0.1, 0.2, 0.1]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[0.45, -0.2, 0.45]}>
        <boxGeometry args={[0.1, 0.2, 0.1]} />
        <meshStandardMaterial color="#222" />
      </mesh> */}
    </group>
  );
}
