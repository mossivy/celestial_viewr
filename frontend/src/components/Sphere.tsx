import React from "react";
import * as THREE from "three";
import { MeshProps } from "@react-three/fiber";

interface SphereProps extends MeshProps {
  position: [number, number, number];
  color: THREE.Color | string | number;
  id: string;
  onClick: () => void; //may need to check the exact behavior of this
}

const Sphere: React.FC<SphereProps> = ({ position, color, onClick }) => (
  <mesh position={position} onClick={onClick}>
    <sphereGeometry args={[1, 32, 32]} />
    <meshStandardMaterial color={color} />
  </mesh>
);

export default Sphere;
