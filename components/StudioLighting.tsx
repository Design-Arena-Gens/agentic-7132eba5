'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function StudioLighting() {
  const keyLightRef = useRef<THREE.SpotLight>(null)
  const fillLightRef = useRef<THREE.SpotLight>(null)

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    if (keyLightRef.current) {
      keyLightRef.current.intensity = 150 + Math.sin(time * 0.5) * 20
    }
  })

  return (
    <>
      {/* Key Light - Main spotlight from front-right */}
      <spotLight
        ref={keyLightRef}
        position={[5, 6, 5]}
        angle={0.4}
        penumbra={0.5}
        intensity={150}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
        color="#ffffff"
      />

      {/* Fill Light - Softer light from front-left */}
      <spotLight
        ref={fillLightRef}
        position={[-5, 5, 4]}
        angle={0.5}
        penumbra={0.7}
        intensity={80}
        castShadow
        color="#b8d4ff"
      />

      {/* Back Light - Rim lighting */}
      <spotLight
        position={[0, 5, -5]}
        angle={0.3}
        penumbra={0.5}
        intensity={100}
        color="#ffd4a3"
      />

      {/* Side accent lights */}
      <pointLight position={[-3, 2, 2]} intensity={30} color="#ff9966" />
      <pointLight position={[3, 2, 2]} intensity={30} color="#6699ff" />

      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.3} />

      {/* Hemisphere light for natural color grading */}
      <hemisphereLight
        color="#ffffff"
        groundColor="#444444"
        intensity={0.5}
        position={[0, 10, 0]}
      />
    </>
  )
}
