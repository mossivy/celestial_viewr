import { useEffect, useState } from 'react'
import * as THREE from 'three'
import './styles/App.css'

function App() {

  //TODO use the dependencies param for planet_data
  useEffect(() => {
    
    const scene = new THREE.PerspectiveCamera(
      50, 
      window.innerWidth / window.innerHeight, 
      1, 
      1000
    );
    
    const canvas = document.getElementById("threeJSCanvas");
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,  
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;

    const spotlight = new THREE.SpotLight(0xffffff, 1.0);
    spotlight.castShadow = true;
    spotlight.position.set(0, 64, 32);

  });

  return (
    <div>
      <canvas id="threeJSCanvas"/>
    </div>
  )
}

export default App
