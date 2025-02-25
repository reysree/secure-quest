function Room({ isBright }) {
  // Use the isBright state to determine room colors.
  const floorColor = isBright ? "#f4d03f" : "#444";
  const wallColor = isBright ? "#fdebd0" : "#666";
  const ceilingColor = isBright ? "#fdfefe" : "#555";

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={floorColor} />
      </mesh>
      {/* Back Wall */}
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[20, 6]} />
        <meshStandardMaterial color={wallColor} side={2} />
      </mesh>
      {/* Left Wall */}
      <mesh position={[-10, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 6]} />
        <meshStandardMaterial color={wallColor} side={2} />
      </mesh>
      {/* Right Wall */}
      <mesh position={[10, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[20, 5]} />
        <meshStandardMaterial color={wallColor} side={2} />
      </mesh>
      {/* Ceiling */}
      <mesh position={[0, 2.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={ceilingColor} />
      </mesh>
      {/* Front Wall (pushed far back) */}
      <mesh position={[0, 0, 30]} rotation={[0, 0, Math.PI]}>
        <planeGeometry args={[20, 5]} />
        <meshStandardMaterial color={wallColor} side={2} />
      </mesh>
    </group>
  );
}

export default Room;
