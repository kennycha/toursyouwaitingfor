import { Mesh, MeshStandardMaterial, SphereGeometry } from "three";
import { textureLoader } from "./loaders";
import { EARTH_RADIUS } from "../constants";

export default class Earth {
  mesh: THREE.Mesh;

  constructor() {
    const geometry = new SphereGeometry(EARTH_RADIUS, 64, 64);
    const texture = textureLoader.load("earth_night_texture.jpeg");
    const material = new MeshStandardMaterial({
      map: texture,
      transparent: true,
      opacity: 0.85,
    });

    const mesh = new Mesh(geometry, material);
    mesh.rotation.y = -Math.PI / 2;

    this.mesh = mesh;
  }
}
