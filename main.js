import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1,1,1);
light.castShadow = true;
scene.add(light);

light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.receiveShadow = true;
scene.add(cube);

const ground = new THREE.Mesh(
    new THREE.BoxGeometry(100,0.1,100),
    new THREE.MeshStandardMaterial({color: 0x00ff00}),
);
ground.position.y = -1;
ground.receiveShadow = true;
scene.add(ground);

camera.position.z = 5;

const helper = new THREE.CameraHelper( light.shadow.camera );
scene.add( helper );

window.addEventListener('keydown',(event) =>{
    switch(event.code){
        case 'KeyW':
            cube.position.z = cube.position.z -1;
            break;
        case 'KeyD':
            cube.position.x = cube.position.x +1;
            break;
        case 'KeyA':
            cube.position.x = cube.position.x -1;
            break;
        case 'KeyS':
            cube.position.z = cube.position.z +1;
            break;
    }
})

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate();