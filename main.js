import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import starsTexture from "./public/stars.jpg";

const cameras = [];
let currentCamera;

// Initialize THREE components
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
]);

// Set up the renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0x000000));
document.body.appendChild(renderer.domElement);

const sunlight = new THREE.PointLight(0xffffcc, 8000, 10000000, 1.1); // 8000, 1000000, 1.25
sunlight.position.set(0, 0, 0);
scene.add(sunlight);

// Making setting texture easily
const setWrapping = (
  texture,
  timesToRepeatHorizontally = 4,
  timesToRepeatVertically = 2
) => {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(timesToRepeatHorizontally, timesToRepeatVertically);
};

// Create a planet geometry
const planet_geometry = (size, detail = 2) => {
  return new THREE.SphereGeometry(size);
};

// Define a function to create a planet
function createPlanet(size, position, texturePath, color = 0xffffff) {
  const geometry = planet_geometry(size);
  const texture = new THREE.TextureLoader().load(texturePath);
  setWrapping(texture, 1, 1);

  const material =
    texturePath != "sun.jpg"
      ? new THREE.MeshStandardMaterial({ color, map: texture })
      : new THREE.MeshBasicMaterial({ color: 0xffff88, map: texture });
  const planet = new THREE.Mesh(geometry, material);
  planet.position.set(...position);

  // Adding camera to cameras
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100000000
  );
  const camera_vector = new THREE.Vector3(...position);
  camera.position.set(
    camera_vector.x + 100,
    camera_vector.y + 200,
    camera_vector.z + 300
  );
  camera.lookAt(...position);
  cameras.push(camera);

  // Adding to scene
  scene.add(planet);
  scene.add(camera);

  return planet;
}

// Create planets
const planets = [
  createPlanet(100, [0, 0, 0], "sun.jpg"),
  createPlanet(10, [250, 0, 0], "mercury.jpg"),
  createPlanet(25, [400, 0, 0], "venus.jpg"),
  createPlanet(30, [550, 0, 0], "earth.jpg"),
  createPlanet(14, [800, 0, 0], "mars.jpg"),
  createPlanet(70, [1350, 0, 0], "jupiter.jpg"),
  createPlanet(60, [2700, 0, 0], "saturn.jpg"),
  createPlanet(40, [5400, 0, 0], "uran.jpg"),
  createPlanet(40, [8500, 0, 0], "neptune.jpg"),
  createPlanet(5, [10000, 0, 0], "pluto.jpg"),
];

function switchCamera(index) {
  currentCamera = cameras[index];
  currentControls.object = currentCamera;
  currentControls.target = planets[index].position;
}

// Event listeners for planet buttons
const planetButtons = [
  "sun-button",
  "mercury-button",
  "venus-button",
  "earth-button",
  "mars-button",
  "jupiter-button",
  "saturn-button",
  "uranus-button",
  "neptune-button",
  "pluto-button",
];

planetButtons.forEach((buttonId, index) => {
  const button = document.getElementById(buttonId);
  button.addEventListener("click", () => {
    switchCamera(index);
  });
});

// Function to handle window resize
function onWindowResize() {
  const aspectRatio = window.innerWidth / window.innerHeight;
  currentCamera.aspect = aspectRatio;
  currentCamera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, currentCamera);
}

// Listen for window resize events
window.addEventListener("resize", onWindowResize, false);

currentCamera = cameras[0];
const currentControls = new OrbitControls(currentCamera, renderer.domElement);

function move_planet(index, speed) {
  planets[index].position.x += speed * -1 * index * Math.sin(step);
  planets[index].position.z += speed * -1 * index * Math.cos(step);
}
function rotate_planet(index, speed) {
  planets[index].rotation.y += speed * 0.001;
  planets[index].rotation.z += speed * 0.001 * Math.sin(step);
}
let step = 0;
function loop() {
  step += 0.005;
  // planets.foreach((planet, index) => move_planet(index, 1));
  move_planet(2, 1);
  move_planet(1, 1);
  rotate_planet(3, 2, 1);
  requestAnimationFrame(loop);
  currentControls.update();
  renderer.render(scene, currentCamera);
}
loop();
