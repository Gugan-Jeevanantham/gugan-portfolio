import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Crystal() {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.2;
      ref.current.rotation.x = 0.4 + Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[2, 0]} />
      <meshBasicMaterial color="#4fa3f0" wireframe transparent opacity={0.4} />
    </mesh>
  );
}

export default function RotatingCrystal() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ position: "absolute", inset: 0 }}
    >
      <Crystal />
    </Canvas>
  );
}