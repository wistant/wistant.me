"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Text, Billboard } from "@react-three/drei";
import * as THREE from "three";

const SKILL_COLORS = [
  "#3178c6", // TypeScript blue
  "#000000", // Next.js black
  "#e0234e", // NestJS red
  "#61dafb", // React cyan
  "#646cff", // Vite purple
  "#336791", // PostgreSQL blue
  "#003545", // MariaDB teal
  "#2D3350", // Prisma dark
  "#dc382d", // Redis red
];

type SkillBallProps = {
  name: string;
  position: [number, number, number];
  color: string;
  index: number;
};

function SkillBall({ name, position, color, index }: SkillBallProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const velocityRef = useRef(new THREE.Vector3());

  const baseScale = 0.9 + (name.length % 3) * 0.12;

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime + index * 1.3;
    const targetScale = hovered ? baseScale * 1.25 : clicked ? baseScale * 0.85 : baseScale;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );

    // Gentle auto-rotation
    meshRef.current.rotation.y = time * 0.2;
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;

    // Apply velocity impulse on click
    if (clicked) {
      velocityRef.current.y += 0.02;
      meshRef.current.position.y += velocityRef.current.y;
      velocityRef.current.multiplyScalar(0.9);
      if (Math.abs(velocityRef.current.y) < 0.001) {
        setClicked(false);
        velocityRef.current.set(0, 0, 0);
      }
    }
  });

  return (
    <Float
      speed={1.5 + (index % 3) * 0.5}
      rotationIntensity={0.2}
      floatIntensity={0.6}
      floatingRange={[-0.15, 0.15]}
    >
      <group position={position}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => {
            setClicked(true);
            velocityRef.current.set(0, 0.15, 0);
          }}
        >
          <icosahedronGeometry args={[0.72, 1]} />
          <meshPhongMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.4 : 0.15}
            shininess={80}
            transparent
            opacity={hovered ? 1 : 0.92}
          />
        </mesh>

        {/* Label always faces camera */}
        <Billboard>
          <Text
            fontSize={0.18}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter-Bold.woff"
            maxWidth={1.4}
            textAlign="center"
          >
            {name}
          </Text>
        </Billboard>
      </group>
    </Float>
  );
}

function MouseRepel() {
  const { camera } = useThree();
  useFrame(({ pointer }) => {
    const cam = camera as THREE.PerspectiveCamera;
    cam.position.set(
      cam.position.x + (pointer.x * 0.5 - cam.position.x) * 0.04,
      cam.position.y + (pointer.y * 0.3 - cam.position.y) * 0.04,
      cam.position.z
    );
    cam.lookAt(0, 0, 0);
  });
  return null;
}

type SkillsCanvasProps = {
  skills: string[];
};

function SkillsScene({ skills }: SkillsCanvasProps) {
  const positions = useMemo<[number, number, number][]>(() => {
    return skills.map((_, i) => {
      const angle = (i / skills.length) * Math.PI * 2;
      const radius = 2.2 + (i % 3) * 0.5;
      const y = ((i % 3) - 1) * 1.2;
      return [Math.cos(angle) * radius, y, Math.sin(angle) * radius * 0.4];
    });
  }, [skills]);

  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#8888ff" />
      <MouseRepel />
      {skills.map((skill, i) => (
        <SkillBall
          key={skill}
          name={skill}
          position={positions[i]}
          color={SKILL_COLORS[i % SKILL_COLORS.length]}
          index={i}
        />
      ))}
    </>
  );
}

export default function Skills3D({ skills }: SkillsCanvasProps) {
  return (
    <div className="w-full h-[420px] md:h-[480px] rounded-2xl overflow-hidden cursor-pointer">
      <Canvas
        frameloop="always"
        camera={{ position: [0, 0, 9], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <SkillsScene skills={skills} />
      </Canvas>
    </div>
  );
}
