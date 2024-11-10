import React, { useState, useEffect} from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Fullscreen } from "@react-three/uikit";
import { Defaults } from "@react-three/uikit-apfel";
import { Card } from '@react-three/uikit-apfel';
import { Container, Text } from "@react-three/uikit";
import { OrbitControls } from '@react-three/drei';

function UiElement() {
  return (
    <Container>
      <Card borderRadius={32} padding={16}>
        <Text>Tester Text!!</Text>
      </Card>
   </Container>
  )
}

export default function App() {

  const [objects, setObjects] = useState([]);

// Function to add a new box to the scene
  function addObject() {
  // Add a new box with a random position and a unique id
    setObjects([
      ...objects,
    {
      id: Date.now(), // Unique ID
      position: [Math.random() * 100 - 5, Math.random() * 100 - 5, Math.random() * 100 - 5],
      color: new THREE.Color(Math.random(), Math.random(), Math.random()).getHex() // Random color
    }
  ])
}

 

  return (
    <Canvas 
      camera={{ position: [0, -10, 20], fov: 32.5 }}
      style={{width: '100vw', height: '100vw', position: 'absolute', top: 0, left: 0, touchAction: "none" }} 
      gl={{ localClippingEnabled: true }}>  

      <OrbitControls target={[0, 0, 0]}/>
              <Defaults>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={1} position={[0, 5, 10]} />
        <Fullscreen
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          paddingTop={25}
          paddingBottom={0}>
          
          <UiElement/>

        </Fullscreen>
          <mesh position={[0,0,0]} >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial/>
          </mesh>
        <axesHelper args={[5]} />
    </Defaults>
  </Canvas>
  )
}

// Lighting setup inside Canvas component
