import * as THREE from "three";
import { EARTH_RADIUS } from "../constants";
import { convertCoordinateToPosition } from "../utils";

export default class Point {
  mesh: THREE.Mesh;

  constructor(latitude: number, longitude: number, color: string) {
    const { x, y, z } = convertCoordinateToPosition(latitude, longitude, EARTH_RADIUS);

    const geometry = new THREE.SphereGeometry(0.02, 20, 20);
    // @TODO Point 색 변경(Tour마다 혹은 day, night에 따라)
    const material = new THREE.MeshBasicMaterial({ color });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    this.mesh = mesh;
  }
}
