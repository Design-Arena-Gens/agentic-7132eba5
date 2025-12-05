'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'
import GarmentModel from './GarmentModel'
import StudioLighting from './StudioLighting'
import RunwayStage from './RunwayStage'

export default function FashionShowScene() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a0a' }}>
      <Canvas shadows gl={{ antialias: true, alpha: false }}>
        <PerspectiveCamera makeDefault position={[0, 1.6, 8]} fov={50} />
        <OrbitControls
          target={[0, 1.2, 0]}
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />

        <Suspense fallback={null}>
          <StudioLighting />
          <RunwayStage />
          <GarmentModel />
          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.5}
            scale={10}
            blur={2}
            far={4}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>

      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        fontSize: '32px',
        fontWeight: 'bold',
        textAlign: 'center',
        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
        pointerEvents: 'none'
      }}>
        FIELD PARKA COLLECTION
        <div style={{ fontSize: '14px', fontWeight: 'normal', marginTop: '5px' }}>
          Premium Tactical Fashion
        </div>
      </div>
    </div>
  )
}
