'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function GarmentModel() {
  const groupRef = useRef<THREE.Group>(null)

  // Create detailed textures
  const fabricTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 2048
    const ctx = canvas.getContext('2d')!

    // Base color - military olive/field parka green
    ctx.fillStyle = '#3d4a2c'
    ctx.fillRect(0, 0, 2048, 2048)

    // Add fabric texture detail
    for (let i = 0; i < 50000; i++) {
      const x = Math.random() * 2048
      const y = Math.random() * 2048
      const brightness = Math.random() * 40 - 20
      ctx.fillStyle = `rgba(${brightness > 0 ? 255 : 0},${brightness > 0 ? 255 : 0},${brightness > 0 ? 255 : 0},${Math.abs(brightness) / 100})`
      ctx.fillRect(x, y, 1, 1)
    }

    // Add seam lines and stitching patterns
    ctx.strokeStyle = 'rgba(30, 35, 20, 0.6)'
    ctx.lineWidth = 2
    for (let i = 0; i < 20; i++) {
      ctx.beginPath()
      ctx.moveTo(Math.random() * 2048, 0)
      ctx.lineTo(Math.random() * 2048, 2048)
      ctx.stroke()
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(2, 2)
    return texture
  }, [])

  const normalMap = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 2048
    const ctx = canvas.getContext('2d')!

    ctx.fillStyle = '#8080ff'
    ctx.fillRect(0, 0, 2048, 2048)

    // Add normal map details for fabric bumps
    for (let i = 0; i < 10000; i++) {
      const x = Math.random() * 2048
      const y = Math.random() * 2048
      const size = Math.random() * 3 + 1
      ctx.fillStyle = `rgba(${128 + Math.random() * 40},${128 + Math.random() * 40},${200 + Math.random() * 55},0.5)`
      ctx.fillRect(x, y, size, size)
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(2, 2)
    return texture
  }, [])

  // Fashion show animation
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime()

      // Walking animation
      const walkCycle = Math.sin(time * 2) * 0.05
      groupRef.current.position.z = Math.sin(time * 0.5) * 3
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.3 + Math.PI

      // Subtle pose adjustments
      groupRef.current.position.y = Math.abs(Math.sin(time * 4)) * 0.05
    }
  })

  const garmentMaterial = new THREE.MeshStandardMaterial({
    map: fabricTexture,
    normalMap: normalMap,
    normalScale: new THREE.Vector2(0.5, 0.5),
    roughness: 0.7,
    metalness: 0.1,
    color: '#4a5a37',
  })

  const pantsMaterial = new THREE.MeshStandardMaterial({
    map: fabricTexture,
    normalMap: normalMap,
    normalScale: new THREE.Vector2(0.5, 0.5),
    roughness: 0.75,
    metalness: 0.05,
    color: '#3a4528',
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} castShadow receiveShadow>
      {/* Head/Helmet */}
      <mesh position={[0, 2.55, 0]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 2.2, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.13, 0.2, 16]} />
        <meshStandardMaterial color="#d4a574" roughness={0.8} />
      </mesh>

      {/* Hood */}
      <mesh position={[0, 2.5, -0.1]} castShadow>
        <sphereGeometry args={[0.32, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <primitive object={garmentMaterial} attach="material" />
      </mesh>

      {/* Torso - Field Parka Jacket */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.38, 1.2, 24]} />
        <primitive object={garmentMaterial} attach="material" />
      </mesh>

      {/* Jacket pockets */}
      <mesh position={[-0.25, 1.3, 0.36]} castShadow>
        <boxGeometry args={[0.18, 0.22, 0.06]} />
        <primitive object={garmentMaterial} attach="material" />
      </mesh>
      <mesh position={[0.25, 1.3, 0.36]} castShadow>
        <boxGeometry args={[0.18, 0.22, 0.06]} />
        <primitive object={garmentMaterial} attach="material" />
      </mesh>

      {/* Chest pockets */}
      <mesh position={[-0.22, 1.8, 0.36]} castShadow>
        <boxGeometry args={[0.14, 0.16, 0.05]} />
        <primitive object={garmentMaterial} attach="material" />
      </mesh>
      <mesh position={[0.22, 1.8, 0.36]} castShadow>
        <boxGeometry args={[0.14, 0.16, 0.05]} />
        <primitive object={garmentMaterial} attach="material" />
      </mesh>

      {/* Zipper */}
      <mesh position={[0, 1.5, 0.38]} castShadow>
        <boxGeometry args={[0.03, 1.0, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Left Shoulder */}
      <mesh position={[-0.45, 2.0, 0]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        <primitive object={garmentMaterial} attach="material" />
      </mesh>

      {/* Left Upper Arm */}
      <mesh position={[-0.52, 1.6, 0]} rotation={[0, 0, 0.1]} castShadow>
        <cylinderGeometry args={[0.12, 0.11, 0.5, 16]} />
        <primitive object={garmentMaterial} attach="material" />
      </mesh>

      {/* Left Elbow */}
      <mesh position={[-0.58, 1.3, 0]} castShadow>
        <sphereGeometry args={[0.13, 16, 16]} />
        <primitive object={garmentMaterial} attach="material" />
      </mesh>

      {/* Left Forearm */}
      <mesh position={[-0.65, 1.0, 0]} rotation={[0, 0, 0.15]} castShadow>
        <cylinderGeometry args={[0.10, 0.09, 0.5, 16]} />
        <primitive object={garmentMaterial} attach="material" />
      </mesh>

      {/* Left Hand */}
      <mesh position={[-0.72, 0.72, 0]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#d4a574" roughness={0.8} />
      </mesh>

      {/* Right Shoulder */}
      <mesh position={[0.45, 2.0, 0]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        <primitive object={garmentMaterial} attach="material" />
      </mesh>

      {/* Right Upper Arm */}
      <mesh position={[0.52, 1.6, 0]} rotation={[0, 0, -0.1]} castShadow>
        <cylinderGeometry args={[0.12, 0.11, 0.5, 16]} />
        <primitive object={garmentMaterial} attach="material" />
      </mesh>

      {/* Right Elbow */}
      <mesh position={[0.58, 1.3, 0]} castShadow>
        <sphereGeometry args={[0.13, 16, 16]} />
        <primitive object={garmentMaterial} attach="material" />
      </mesh>

      {/* Right Forearm */}
      <mesh position={[0.65, 1.0, 0]} rotation={[0, 0, -0.15]} castShadow>
        <cylinderGeometry args={[0.10, 0.09, 0.5, 16]} />
        <primitive object={garmentMaterial} attach="material" />
      </mesh>

      {/* Right Hand */}
      <mesh position={[0.72, 0.72, 0]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#d4a574" roughness={0.8} />
      </mesh>

      {/* Waist/Belt */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.35, 0.08, 24]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Belt buckle */}
      <mesh position={[0, 0.9, 0.38]} castShadow>
        <boxGeometry args={[0.08, 0.06, 0.02]} />
        <meshStandardMaterial color="#8a8a8a" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Left Thigh */}
      <mesh position={[-0.18, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.13, 0.65, 20]} />
        <primitive object={pantsMaterial} attach="material" />
      </mesh>

      {/* Left Knee pad */}
      <mesh position={[-0.18, 0.15, 0.14]} castShadow>
        <boxGeometry args={[0.16, 0.18, 0.04]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Left Shin */}
      <mesh position={[-0.18, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.10, 0.6, 20]} />
        <primitive object={pantsMaterial} attach="material" />
      </mesh>

      {/* Left Boot */}
      <mesh position={[-0.18, -0.58, 0.05]} castShadow>
        <boxGeometry args={[0.16, 0.16, 0.28]} />
        <meshStandardMaterial color="#1a1410" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Right Thigh */}
      <mesh position={[0.18, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.13, 0.65, 20]} />
        <primitive object={pantsMaterial} attach="material" />
      </mesh>

      {/* Right Knee pad */}
      <mesh position={[0.18, 0.15, 0.14]} castShadow>
        <boxGeometry args={[0.16, 0.18, 0.04]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Right Shin */}
      <mesh position={[0.18, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.10, 0.6, 20]} />
        <primitive object={pantsMaterial} attach="material" />
      </mesh>

      {/* Right Boot */}
      <mesh position={[0.18, -0.58, 0.05]} castShadow>
        <boxGeometry args={[0.16, 0.16, 0.28]} />
        <meshStandardMaterial color="#1a1410" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Cargo pockets on thighs */}
      <mesh position={[-0.26, 0.45, 0.05]} castShadow>
        <boxGeometry args={[0.12, 0.25, 0.08]} />
        <primitive object={pantsMaterial} attach="material" />
      </mesh>
      <mesh position={[0.26, 0.45, 0.05]} castShadow>
        <boxGeometry args={[0.12, 0.25, 0.08]} />
        <primitive object={pantsMaterial} attach="material" />
      </mesh>
    </group>
  )
}
