"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

export default function Clock({ onClick, ...props }) {
  const hourHandRef = useRef();
  const minuteHandRef = useRef();
  const secondHandRef = useRef();

  useFrame(() => {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Calculate angles in radians (clockwise rotation, so we use negative)
    const hourAngle = (hours + minutes / 60) * ((Math.PI * 2) / 12);
    const minuteAngle = (minutes + seconds / 60) * ((Math.PI * 2) / 60);
    const secondAngle = seconds * ((Math.PI * 2) / 60);

    if (hourHandRef.current) {
      hourHandRef.current.rotation.z = -hourAngle;
    }
    if (minuteHandRef.current) {
      minuteHandRef.current.rotation.z = -minuteAngle;
    }
    if (secondHandRef.current) {
      secondHandRef.current.rotation.z = -secondAngle;
    }
  });

  return (
    <group onClick={onClick} {...props}>
      {/* Clock Face */}
      <mesh>
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Optional 12 marker */}
      <Text
        position={[0, 0.65, 0.01]}
        fontSize={0.15}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        12
      </Text>

      {/* Center pivot */}
      <mesh>
        <circleGeometry args={[0.05, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Hour Hand */}
      <group ref={hourHandRef} position={[0, 0, 0.02]}>
        {/* Shift the hand upward so its bottom aligns with the center */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.05, 0.4, 0.02]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </group>

      {/* Minute Hand */}
      <group ref={minuteHandRef} position={[0, 0, 0.03]}>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.03, 0.6, 0.02]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      </group>

      {/* Second Hand */}
      <group ref={secondHandRef} position={[0, 0, 0.04]}>
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.01, 0.7, 0.01]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </group>
    </group>
  );
}
