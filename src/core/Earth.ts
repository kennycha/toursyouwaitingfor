import * as THREE from "three";
import { textureLoader } from "./loaders";

export default class Earth {
  mesh: THREE.Mesh;

  constructor(radius: number, opacity: number) {
    const geometry = new THREE.SphereGeometry(radius, 64, 64);
    const texture = textureLoader.load("earth_night_texture.jpeg");
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      opacity,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.y = -Math.PI / 2;

    this.mesh = mesh;
  }
}
