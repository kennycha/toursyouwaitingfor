import * as THREE from "three";
import { textureLoader } from "./loaders";

export default class Earth {
  mesh: THREE.Mesh;

  constructor(radius: number, opacity: number, isDay = true) {
    const geometry = new THREE.SphereGeometry(radius, 64, 64);
    const dayTexture = textureLoader.load("earth_day_texture.jpeg");
    const nightTexture = textureLoader.load("earth_night_texture.jpeg");
    const material = new THREE.MeshStandardMaterial({
      map: isDay ? dayTexture : nightTexture,
      transparent: true,
      opacity,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.y = -Math.PI / 2;

    this.mesh = mesh;
  }
}
