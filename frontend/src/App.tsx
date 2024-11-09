import { useEffect } from 'react';
import * as THREE from 'three';
import './styles/App.css';


function App() {


  //TODO use the dependencies param for planet_data
  useEffect(() => {

    const scene  = new THREE.Scene(); 
    const camera = new THREE.PerspectiveCamera(
      50, 
      window.innerWidth / window.innerHeight, 
      1, 
      1000
    );
    camera.position.z = 5;

    const canvas = document.getElementById("threeJSCanvas") as HTMLCanvasElement;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,  
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const {ambientLight, spotlight} = setupLighting();
    const box = setupBox();
    scene.add(ambientLight);
    scene.add(spotlight);
    scene.add(box);
  

    const animate = () => {

      box.rotation.x += 0.01;
      box.rotation.y += 0.01;
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div>
      <canvas id="threeJSCanvas"/>
    </div>
  )
}

//Returns lighting objects
const setupLighting = () => {
   
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  ambientLight.castShadow = true;
  const spotlight = new THREE.SpotLight(0xffffff, 1.0);
  spotlight.castShadow = true;
  spotlight.position.set(0, 64, 32);

  return {ambientLight, spotlight};
};

//Create box objects
const setupBox = () => {
  
  const boxGeometry = new THREE.BoxGeometry();
  const boxMaterial = new THREE.MeshNormalMaterial();
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  return boxMesh;
};

export default App
