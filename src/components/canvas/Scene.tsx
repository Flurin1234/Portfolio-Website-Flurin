"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Bloom, EffectComposer, Noise } from "@react-three/postprocessing";
import { MathUtils, type Mesh } from "three";

function Blob() {
  const mesh = useRef<Mesh>(null);

  useFrame(({ pointer }) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = MathUtils.lerp(mesh.current.rotation.x, pointer.y * 0.4, 0.05);
    mesh.current.rotation.y = MathUtils.lerp(mesh.current.rotation.y, pointer.x * 0.6, 0.05);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh} scale={1.4}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial color="#6d5dfc" roughness={0.15} metalness={0.6} distort={0.4} speed={2} />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 5]} intensity={2} />
      <pointLight position={[-4, -2, 2]} intensity={30} color="#ff4d8d" />
      <Blob />
      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.2} mipmapBlur />
        <Noise opacity={0.05} />
      </EffectComposer>
    </Canvas>
  );
}
