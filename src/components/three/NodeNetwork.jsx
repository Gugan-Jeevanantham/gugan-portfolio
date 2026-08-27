import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 46;
const CONNECT_DIST = 2.6;

function generateNodes() {
  const nodes = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const r = 3.4 + Math.random() * 1.4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    nodes.push(
      new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta) * 1.15,
        r * Math.sin(phi) * Math.sin(theta) * 0.85,
        r * Math.cos(phi) * 0.7
      )
    );
  }
  return nodes;
}

function Network() {
  const groupRef = useRef();
  const { viewport } = useThree();

  const nodes = useMemo(() => generateNodes(), []);

  const linePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < CONNECT_DIST) {
          positions.push(nodes[i].x, nodes[i].y, nodes[i].z);
          positions.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }
    return new Float32Array(positions);
  }, [nodes]);

  const pointPositions = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3);
    nodes.forEach((n, i) => {
      arr[i * 3] = n.x;
      arr[i * 3 + 1] = n.y;
      arr[i * 3 + 2] = n.z;
    });
    return arr;
  }, [nodes]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.06;

    const nx = (state.pointer.x * viewport.width) / 40;
    const ny = (state.pointer.y * viewport.height) / 40;
    groupRef.current.rotation.x += (-ny * 0.15 - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.z += (nx * 0.08 - groupRef.current.rotation.z) * 0.04;

    const mat = groupRef.current.children[1]?.material;
    if (mat) mat.size = 0.055 + Math.sin(t * 1.4) * 0.012;
  });

  return (
    <group ref={groupRef}>
            <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#2f6fd6" transparent opacity={0.35} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pointPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#4fa3f0" size={0.06} sizeAttenuation transparent opacity={0.9} />
      </points>
    </group>
  );
}

export default function NodeNetwork() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ position: "absolute", inset: 0 }}
    >
      <Network />
    </Canvas>
  );
}