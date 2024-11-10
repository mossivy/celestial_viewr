import { useEffect } from 'react';
import * as THREE from 'three';
import './styles/App.css';
import SceneInit from './scenes/SceneInit.ts';

function App() {

  //TODO use the dependencies param for planet_data
  useEffect(() => {
    const sceneObj = new SceneInit('threeJSCanvas', false);
    sceneObj.initialize();
    sceneObj.animate();

    const box = setupBox();
    sceneObj.scene.add(box);
  }, []);

  return (
    <div>
      <canvas id="threeJSCanvas"/>
    </div>
  )
}


//Create box objects
const setupBox = () => {
  
  const boxGeometry = new THREE.BoxGeometry();
  const boxMaterial = new THREE.MeshNormalMaterial();
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  return boxMesh;
};

export default App
