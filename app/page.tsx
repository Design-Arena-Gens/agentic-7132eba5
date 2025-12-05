'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const FashionShowScene = dynamic(() => import('@/components/FashionShowScene'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      color: 'white',
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif'
    }}>
      Loading 3D Fashion Show...
    </div>
  )
})

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <Suspense fallback={<div>Loading...</div>}>
        <FashionShowScene />
      </Suspense>
    </main>
  )
}
