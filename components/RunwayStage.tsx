'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function RunwayStage() {
  const runwayRef = useRef<THREE.Mesh>(null)
  const lightsRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    if (lightsRef.current) {
      lightsRef.current.children.forEach((light, i) => {
        const offset = i * 0.5
        light.visible = Math.sin(time * 2 + offset) > 0
      })
    }
  })

  return (
    <group>
      {/* Main runway floor */}
      <mesh
        ref={runwayRef}
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 30]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Glossy center stripe */}
      <mesh
        position={[0, 0.01, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[2, 30]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0.9}
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Runway edge lights */}
      <group ref={lightsRef}>
        {Array.from({ length: 12 }).map((_, i) => {
          const z = -10 + i * 2
          return (
            <group key={i}>
              <mesh position={[-1.2, 0.05, z]}>
                <cylinderGeometry args={[0.05, 0.05, 0.1, 16]} />
                <meshStandardMaterial
                  color="#00ffff"
                  emissive="#00ffff"
                  emissiveIntensity={2}
                />
              </mesh>
              <pointLight
                position={[-1.2, 0.1, z]}
                intensity={5}
                distance={2}
                color="#00ffff"
              />

              <mesh position={[1.2, 0.05, z]}>
                <cylinderGeometry args={[0.05, 0.05, 0.1, 16]} />
                <meshStandardMaterial
                  color="#00ffff"
                  emissive="#00ffff"
                  emissiveIntensity={2}
                />
              </mesh>
              <pointLight
                position={[1.2, 0.1, z]}
                intensity={5}
                distance={2}
                color="#00ffff"
              />
            </group>
          )
        })}
      </group>

      {/* Backdrop */}
      <mesh position={[0, 3, -8]} receiveShadow>
        <planeGeometry args={[20, 8]} />
        <meshStandardMaterial
          color="#0f0f0f"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Side walls for depth */}
      <mesh position={[-10, 3, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[30, 8]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      <mesh position={[10, 3, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[30, 8]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
    </group>
  )
}
