import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Tour } from "./core/Tour";
import { Earth } from "./core/Earth";
import { CURVE_COLORS, EARTH_RADIUS, LIGHT_COLORS, POINT_COLORS } from "./constants";
import Point from "./core/Point";
import Curve from "./core/Curve";
import GradientCanvas from "./core/GradientCanvas";

const init = () => {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const app = document.querySelector("#app");
  if (!app) return;
  app.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // @TODO scene에 skybox 적용

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 3);
  scene.add(camera);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableZoom = true;
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  // @TODO dolly distance 설정 값 조정
  controls.minDistance = 2;
  controls.maxDistance = 10;
  // @TODO pointer down일 때 autoRotate 멈추기
  controls.autoRotate = true;
  controls.autoRotateSpeed = Math.PI / 3;

  const directionalLight = new THREE.DirectionalLight(LIGHT_COLORS.directional, 0.7);
  const hemisphereLight = new THREE.HemisphereLight(LIGHT_COLORS.hemisphere, undefined, 0.7);
  directionalLight.position.set(2.65, 2.13, 1.02);
  hemisphereLight.position.set(0, 0, 1);
  scene.add(directionalLight, hemisphereLight);

  // @TODO isDay state로 변경
  const isDay = false;
  const earth = new Earth(EARTH_RADIUS, 0.95, isDay);
  scene.add(earth.mesh);

  // @TODO state로 변경
  const currentArtist = "postmalone";

  const tour = new Tour(currentArtist);
  const points: Point[] = [];
  const curves: Curve[] = [];

  tour.concerts.forEach((concert) => {
    const point = new Point(
      concert.city.latitude,
      concert.city.longitude,
      isDay ? POINT_COLORS.day : POINT_COLORS.night
    );
    points.push(point);
    scene.add(point.mesh);
  });

  const gradientCanvas = new GradientCanvas("#DDDDDD", isDay ? CURVE_COLORS.day : CURVE_COLORS.night);

  for (let i = 0; i < points.length - 1; i += 1) {
    const start = points[i];
    const end = points[i + 1];

    if (start.isEqual(end) || start.isTooClose(end)) {
      continue;
    }

    const curve = new Curve(start.mesh.position, end.mesh.position, EARTH_RADIUS, gradientCanvas.texture);
    curves.push(curve);
    scene.add(curve.mesh);
  }

  const draw = () => {
    controls.update();
    renderer.render(scene, camera);

    requestAnimationFrame(draw);
  };

  draw();

  const handleResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };

  window.addEventListener("resize", handleResize);
};

window.addEventListener("load", init);
