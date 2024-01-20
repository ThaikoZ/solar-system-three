import sunTexture from "./public/sun.jpg";
import mercuryTexture from "./public/mercury.jpg";
import venusTexture from "./public/venus.jpg";
import earthTexture from "./public/earth.jpg";
import marsTexture from "./public/mars.jpg";
import jupiterTexture from "./public/jupiter.jpg";
import saturnTexture from "./public/saturn.jpg";
import saturnRingTexture from "./public/saturn ring.png";
import uranusTexture from "./public/uranus.jpg";
import uranusRingTexture from "./public/uranus ring.png";
import neptuneTexture from "./public/neptune.jpg";
import plutoTexture from "./public/pluto.jpg";

export const planetsData = [
  {
    name: "Sun",
    size: 16,
    texture: sunTexture,
    position: 0,
    rotation: 0.01,
    turnover: 0.004,
    ring: null,
  },
  {
    name: "Mercury",
    size: 3.2,
    texture: mercuryTexture,
    position: 28,
    rotation: 0.04,
    turnover: 0.004,
    ring: null,
  },
  {
    name: "Venus",
    size: 5.8,
    texture: venusTexture,
    position: 44,
    rotation: 0.015,
    turnover: 0.002,
    ring: null,
  },
  {
    name: "Earth",
    size: 6,
    texture: earthTexture,
    position: 62,
    rotation: 0.01,
    turnover: 0.02,
    ring: null,
  },
  {
    name: "Mars",
    size: 4,
    texture: marsTexture,
    position: 78,
    rotation: 0.008,
    turnover: 0.018,
    ring: null,
  },
  {
    name: "Jupiter",
    size: 12,
    texture: jupiterTexture,
    position: 100,
    rotation: 0.002,
    turnover: 0.04,
    ring: null,
  },
  {
    name: "Saturn",
    size: 10,
    texture: saturnTexture,
    position: 138,
    rotation: 0.0009,
    turnover: 0.038,
    ring: {
      innerRadius: 10,
      outerRadius: 20,
      texture: saturnRingTexture,
    },
  },
  {
    name: "Uranus",
    size: 7,
    texture: uranusTexture,
    position: 176,
    rotation: 0.0004,
    turnover: 0.03,
    ring: {
      innerRadius: 7,
      outerRadius: 12,
      texture: uranusRingTexture,
    },
  },
  {
    name: "Neptune",
    size: 7,
    texture: neptuneTexture,
    position: 200,
    rotation: 0.0001,
    turnover: 0.032,
    ring: null,
  },
  {
    name: "Pluto",
    size: 2.8,
    texture: plutoTexture,
    position: 216,
    rotation: 0.00007,
    turnover: 0.008,
    ring: null,
  },
];
