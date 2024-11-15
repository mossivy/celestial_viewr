import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Fullscreen } from "@react-three/uikit";
import { Defaults } from "@react-three/uikit-apfel";

//pretty common names in THREE may need to change
import Sphere from "./components/Sphere";
import UiBar  from "./components/UiBar";
import Camera from "./components/Camera";

interface ObjectData {
  id: string;
  name: string;
  position: [number, number, number];
  color: THREE.Color| string | number;
}

export default function App() {
  const [objects, setObjects] = useState<ObjectData[]>([]);
  const [focus, setFocus] = useState<null | [number, number, number]>(null);
  const isFirstRender = useRef(true); 

  useEffect(() => {
    console.log("useEffect called");
    if (isFirstRender.current) {
      addObject("Sphere 1", [0, 0, 0]);
      addObject("Sphere 2", [5, 0, 0]);
      addObject("Sphere 3", [-5, 0, 0]);
      isFirstRender.current = false;
    }
  }, []);

  function addObject(name: string, position: [number, number, number]) {
    const newObject = {
      id: `${Date.now()}-${Math.random()}`,
      name,
      position,
      color: new THREE.Color(
        Math.random(),
        Math.random(),
        Math.random()
      ).getHex(),
    };
    setObjects((prevObjects) => [...prevObjects, newObject]);
  }

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
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} position={[0, 5, 10]} />
      <OrbitControls target={[0, 0, 0]} />
      <Camera focus={focus} />
      <Defaults>
        <Fullscreen
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          paddingTop={25}
          paddingBottom={0}
        >
           {console.log("Objects passed to UiBar:", objects)}
          <UiBar
            objects={objects}
            setFocus={(position) => setFocus(position)}
          />
        </Fullscreen>
      </Defaults>
      {objects.map((object) => (
        <Sphere
          key={object.id}
          position={object.position}
          color={object.color}
          id={object.id}
          onClick={() => setFocus(object.position)}
        />
      ))}
      <axesHelper args={[5]} />
    </Canvas>
  );
}
