import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import { useControls } from 'leva'
import { OrbitControls } from '@react-three/drei'

export default function App() {
  // Set up controls using leva
  const { rotationX, rotationY, rotationZ } = useControls({
    rotationX: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    rotationY: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    rotationZ: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 }
  })

  return (
    <>
      <header style={{ position: 'absolute', top: 0, left: 0, padding: '10px', zIndex: 1 }}>
        <h1>Interactive Box with Rotation</h1>
      </header>

      {/* 3D scene */}
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        
        {/* Box with rotation from leva */}
        <mesh rotation={[rotationX, rotationY, rotationZ]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>

        {/* Camera controls */}
        <OrbitControls />
      </Canvas>
    </>
  )
}

