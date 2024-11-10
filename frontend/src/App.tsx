import React, {useState, useEffect} from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import { useControls } from 'leva'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'

export default function App() {
  // Set up controls using leva
  const { rotationX, rotationY, rotationZ } = useControls({
    rotationX: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    rotationY: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    rotationZ: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 }
  })

  const [objects, setObjects] = useState([]);

   // Function to add a new box to the scene
  const addObject = () => {
  // Add a new box with a random position and a unique id
    setObjects([
      ...objects,
    {
      id: Date.now(), // Unique ID
      position: [Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5],
      color: new THREE.Color(Math.random(), Math.random(), Math.random()).getHex() // Random color
    }
    ])
  }

  useEffect(() => {
    const interval = setInterval(addObject, 2000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, [objects]);

  return (
    <>
      <Canvas style={{ width: '100vw', height: '100vh' }}camera={{ position: [0, 0, 5], fov: 60 }}>
      {/* 3D scene */}
        {/* Set up Lighting*/}
        <Lighting/>
        {/* Render dynamically added objects*/}
        {objects.map((obj) => (
          <mesh key={obj.id} position={obj.position} rotation={[rotationX, rotationY, rotationZ]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={obj.color} />
          </mesh>
        ))} 

        {/* Camera controls */}
        <OrbitControls />
      </Canvas>
    </>
  )
}

// Lighting setup inside Canvas component
function Lighting() {
  const { scene } = useThree()

  useEffect(() => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    ambientLight.castShadow = true
    const spotlight = new THREE.SpotLight(0xffffff, 1.0)
    spotlight.castShadow = true
    spotlight.position.set(0, 64, 32)
    scene.add(ambientLight)
    scene.add(spotlight)

    // Cleanup function to remove lights when component unmounts
    return () => {
      scene.remove(ambientLight)
      scene.remove(spotlight)
    }
  }, [scene]) // Runs when scene is available

  return null
}
