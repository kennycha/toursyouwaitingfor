import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Tour } from "./core/Tour";
import { Earth } from "./core/Earth";

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

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, undefined, 0.7);
  directionalLight.position.set(2.65, 2.13, 1.02);
  hemisphereLight.position.set(0, 0, 1);
  scene.add(directionalLight, hemisphereLight);

  // @TODO isDay state로 변경
  const isDay = false;
  const earth = new Earth(1.3, 0.7, isDay);
  scene.add(earth.mesh);

  // @TODO state로 변경
  const currentArtist = "postmalone";
  const tour = new Tour(currentArtist);
  const newTour = new Tour("lesserafim");
  console.log("tour: ", tour);
  console.log("newTour: ", newTour);

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
