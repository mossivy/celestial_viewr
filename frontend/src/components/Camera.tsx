import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";

interface CustomCameraProps {
  focus: [number, number, number] | null;
}

const Camera: React.FC<CustomCameraProps> = ({ focus }) => {
  const { camera, gl } = useThree();
  const targetRef = useRef(new THREE.Vector3());

  useEffect(() => {
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      gl.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [gl, camera]);

  useFrame(() => {
    if (focus) {
      targetRef.current.copy(focus);
      camera.lookAt(targetRef.current);
    }
  });

  return null;
};

export default Camera;
