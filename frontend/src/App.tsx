import { Canvas } from '@react-three/fiber';
import { Fullscreen } from "@react-three/uikit";
import { Defaults } from "@react-three/uikit-apfel";
import { Card } from '@react-three/uikit-apfel';
import { Container, Text } from "@react-three/uikit";
import {Suspense} from 'react';

function UiElement() {
  return (
    <Container>
      <Card borderRadius={32} padding={16}>
        <Text>Tester Text!!</Text>
      </Card>
   </Container>
  )
}

// New Sphere component
function Sphere() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="royalblue" />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas style={{ position: "absolute", inset: "0", touchAction: "none" }} gl={{ localClippingEnabled: true }}>  
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} position={[-5, 5, 10]} />
      <Sphere/>
      <Defaults>
        <Fullscreen
        overflow="scroll"
        scrollbarColor="black"
        backgroundColor="white"
        dark={{ backgroundColor: "black" }}
        flexDirection="column"
        gap={32}
        paddingX={32}
        alignItems="center"
        padding={32}>
          <UiElement/>
        </Fullscreen>
      </Defaults>
    </Canvas>
  )
}

// Lighting setup inside Canvas component
