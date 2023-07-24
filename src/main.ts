import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Tour from "./core/Tour";
import Earth from "./core/Earth";
import Point from "./core/Point";
import Curve from "./core/Curve";
import Text from "./core/Text";
import GradientCanvas from "./core/GradientCanvas";
import { cubeTextureLoader, fontLoader } from "./core/loaders";
import { CURVE_COLORS, EARTH_RADIUS, LIGHT_COLORS, POINT_COLORS } from "./constants";
import { observable, observe } from "./state/observer";

interface AppState {
  isRotating: boolean;
}

const init = async () => {
  const appState = observable<AppState>({ isRotating: true });

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
  // @TODO 이미지 위에 색 필터 입히는 툴
  const backgroundMap = cubeTextureLoader.load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);
  backgroundMap.colorSpace = THREE.SRGBColorSpace;
  scene.background = backgroundMap;
  scene.environment = backgroundMap;

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 3);
  scene.add(camera);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableZoom = true;
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.minDistance = 1.75;
  controls.maxDistance = 4;
  controls.autoRotateSpeed = Math.PI / 6;
  observe(() => {
    controls.autoRotate = appState.isRotating;
  });

  const directionalLight = new THREE.DirectionalLight(LIGHT_COLORS.directional, 0.7);
  const hemisphereLight = new THREE.HemisphereLight(LIGHT_COLORS.hemisphere, undefined, 0.7);
  directionalLight.position.set(2.65, 2.13, 1.02);
  hemisphereLight.position.set(0, 0, 1);
  scene.add(directionalLight, hemisphereLight);

  const earth = new Earth(EARTH_RADIUS, 0.95);
  scene.add(earth.mesh);

  // @TODO state로 변경
  const currentArtist = "postmalone";

  const tour = new Tour(currentArtist);
  const texts: Text[] = [];
  const points: Point[] = [];
  const curves: Curve[] = [];

  // @TODO load 시 progress 표시 처리
  // const loadingManager = new THREE.LoadingManager()
  // loadingManager.onProgress = (_, loaded, total) => {};
  // loadingManager.onLoad = () => {};
  const font = await fontLoader.loadAsync("The Jamsil 3 Regular_Regular.json");

  tour.concerts.forEach((concert) => {
    const point = new Point(concert.city.latitude, concert.city.longitude, POINT_COLORS.night);
    const text = new Text(`${concert.city.name}\n${concert.date}`, font, concert.city.latitude, concert.city.longitude);
    points.push(point);
    texts.push(text);
    scene.add(point.mesh, text.mesh);
  });

  const gradientCanvas = new GradientCanvas("#DDDDDD", CURVE_COLORS.night);

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
