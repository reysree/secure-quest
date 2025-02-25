"use client";
import React from "react";

export default function Carpet({ onClick, ...props }) {
  return (
    <mesh onClick={onClick} {...props}>
      <planeGeometry args={[3, 2]} />
      <meshStandardMaterial color="#f5f5f5" /> {/* White/cream color */}
    </mesh>
  );
}
