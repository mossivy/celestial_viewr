import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module';

//Based on SuboptimalEng tutorial series
export default class SceneInit {
  constructor(canvasId, debugMode=false) {
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;
    this.fov = 45;
    this.nearPlane = 1;
    this.farPlane = 1000;
    this.canvasId = canvasId;
    this.clock = undefined;
    this.stats = undefined;
    this.controls = undefined;
    this.ambientLight = undefined;
    this.spotlight = undefined;
    this.debugMode = debugMode; 
  }

  initialize() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 5;
    const canvas = document.getElementById(this.canvasId);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.setupLighting();

    if (this.debugMode) {
      this.stats = Stats();
      document.body.appendChild(this.stats.dom);
    }
    window.addEventListener('resize', () => this.onWindowResize(), false);
  }
  
  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.controls.update();
    if (this.debugMode) {
      this.stats.update();
    }
  }

  render() {
    //clock stuff can go here
    this.renderer.render(this.scene, this.camera);
  }
  
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  } 
  //Sets up lighting objects
  setupLighting() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.ambientLight.castShadow = true;
    this.spotlight = new THREE.SpotLight(0xffffff, 1.0);
    this.spotlight.castShadow = true;
    this.spotlight.position.set(0, 64, 32);
    this.scene.add(this.ambientLight);
    this.scene.add(this.spotlight);
  }
  
}
