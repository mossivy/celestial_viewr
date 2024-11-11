import React, { useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { Fullscreen } from "@react-three/uikit";
import { Defaults } from "@react-three/uikit-apfel";
import { Card } from "@react-three/uikit-apfel";
import { Container, Text } from "@react-three/uikit";
import { OrbitControls } from "@react-three/drei";

function UiElement() {
  return (
    <Container>
      <Card borderRadius={32} padding={16}>
        <Text>Tester Text!!</Text>
      </Card>
    </Container>
  );
}

function Camera() {
  const { gl, camera } = useThree();

  useEffect(() => {
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      gl.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Should fix the centering issue

    return () => window.removeEventListener("resize", handleResize);
  }, [gl, camera]);

  return null;
}

export default function App() {
  const [objects, setObjects] = useState([]);

  function addObject() {
    setObjects([
      ...objects,
      {
        id: Date.now(), // Unique ID
        position: [0, 0, 0],
        color: new THREE.Color(
          Math.random(),
          Math.random(),
          Math.random()
        ).getHex(), // Random color
      },
    ]);
  }

  useEffect(() => {
    addObject();
  }, []);

  return (
    <Canvas
      camera={{ position: [0, -10, 50], fov: 32.5 }}
      style={{
        width: "100vw",
        height: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
        touchAction: "none",
      }}
      gl={{ localClippingEnabled: true }}
    >
      <Camera />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} position={[0, 5, 10]} />
      <OrbitControls target={[0, 0, 0]} />
      <Defaults>
        <Fullscreen
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          paddingTop={25}
          paddingBottom={0}
        >
          <UiElement />
        </Fullscreen>
      </Defaults>
      {objects.map((object) => (
        <mesh key={object.id} position={object.position}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={object.color} />
        </mesh>
      ))}
      <axesHelper args={[5]} />
    </Canvas>
  );
}

// Lighting setup inside Canvas component
