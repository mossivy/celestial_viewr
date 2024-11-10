import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module';

const Scene = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const statsRef = useRef<any>(null); // For storing stats instance

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 5;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Lighting setup function
    const setupLighting = () => {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      ambientLight.castShadow = true;
      const spotlight = new THREE.SpotLight(0xffffff, 1.0);
      spotlight.castShadow = true;
      spotlight.position.set(0, 64, 32);
      scene.add(ambientLight);
      scene.add(spotlight);
    };

    // Call the lighting setup function
    setupLighting();


    //Create box objects
    const setupBox = () => {
      
      const boxGeometry = new THREE.BoxGeometry();
      const boxMaterial = new THREE.MeshNormalMaterial();
      const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
      return boxMesh;
    };

    scene.add(setupBox());

    // Optionally enable stats for debugging
    if (process.env.NODE_ENV === 'development') {
      const stats = Stats();
      document.body.appendChild(stats.dom);
      statsRef.current = stats; // Store stats ref
    }

    // Resize event
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      if (statsRef.current) statsRef.current.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (statsRef.current) document.body.removeChild(statsRef.current.dom);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Scene;

