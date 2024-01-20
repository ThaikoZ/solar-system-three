import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import starsTexture from "./public/stars.jpg";
import sunTexture from "./public/sun.jpg";
import { planetsData } from "./planetsData";

let currentPlanetIndex = 0;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(100, 200, 300);

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const sunlight = new THREE.PointLight(0xffffcc, 400, 1000, 1.5);
scene.add(sunlight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
]);

const textureLoader = new THREE.TextureLoader();

function createPlanete(size, texture, position, ring) {
  // Creates a planet
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mat =
    texture !== sunTexture
      ? new THREE.MeshStandardMaterial({
          map: textureLoader.load(texture),
        })
      : new THREE.MeshBasicMaterial({ map: textureLoader.load(texture) });

  const mesh = new THREE.Mesh(geo, mat);
  const obj = new THREE.Object3D();
  obj.add(mesh);

  // Creates a ring
  if (ring) {
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );
    const ringMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    obj.add(ringMesh);
    ringMesh.position.x = position;
    ringMesh.rotation.x = -0.5 * Math.PI;
  }

  // Adding a camera
  const objCamera = camera;
  objCamera.position.x = position + 100;
  objCamera.lookAt(...[position, 0, 0]);
  obj.add(objCamera);

  scene.add(obj);
  mesh.position.x = position;

  return { mesh, obj, camera: objCamera };
}

const planets = planetsData.map((planet) =>
  createPlanete(planet.size, planet.texture, planet.position, planet.ring)
);

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

function switchCamera(index) {
  // camera.position.x = planets[index].position;
  // orbit.object = camera;
  currentPlanetIndex = index;
  const vector = new THREE.Vector3(
    planetsData[currentPlanetIndex].position,
    0,
    0
  );
  camera.lookAt(vector);
  orbit.target = vector;
  orbit.object = planets[currentPlanetIndex].camera;
  console.log(camera.position);
}

planetButtons.forEach((buttonId, index) => {
  const button = document.getElementById(buttonId);
  button.addEventListener("click", () => {
    switchCamera(index);
  });
});

const orbit = new OrbitControls(
  planets[currentPlanetIndex].camera,
  renderer.domElement
);

function animate() {
  for (let i = 0; i < planets.length; i++)
    planets[i].obj.rotateY(planetsData[i].rotation);

  for (let i = 0; i < planets.length; i++)
    planets[i].obj.rotateY(planetsData[i].rotation);

  // for (let i = 0; i < planets.length; i++) {
  //   const vector = new THREE.Vector3(
  //     planets[i].obj.position.x + 100,
  //     planets[i].obj.position.y + 200,
  //     planets[i].obj.position.z + 300
  //   );
  //   cameras[i].position.set(vector);
  //   console.log(vector);
  // }

  orbit.update();
  renderer.render(scene, planets[currentPlanetIndex].camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
