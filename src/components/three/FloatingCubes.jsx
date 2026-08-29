import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CUBE_COUNT = 10;

function Cubes() {
  const groupRef = useRef();

  const cubes = useMemo(() => {
    return Array.from({ length: CUBE_COUNT }).map(() => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4,
      ],
      speed: 0.2 + Math.random() * 0.3,
      size: 0.25 + Math.random() * 0.35,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current?.children.forEach((mesh, i) => {
      const c = cubes[i];
      mesh.rotation.x = t * c.speed;
      mesh.rotation.y = t * c.speed * 0.7;
      mesh.position.y = c.position[1] + Math.sin(t * 0.4 + c.offset) * 0.4;
    });
  });

  return (
    <group ref={groupRef}>
      {cubes.map((c, i) => (
        <mesh key={i} position={c.position}>
          <boxGeometry args={[c.size, c.size, c.size]} />
          <meshBasicMaterial color="#16a34a" wireframe transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

export default function FloatingCubes() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ position: "absolute", inset: 0 }}
    >
      <Cubes />
    </Canvas>
  );
}