import * as THREE from "three";
import { EARTH_RADIUS, POINT_COLOR } from "../constants";
import { convertCoordinateToPosition } from "../utils";

export default class Point {
  mesh: THREE.Mesh;

  constructor(latitude: number, longitude: number) {
    const { x, y, z } = convertCoordinateToPosition(latitude, longitude, EARTH_RADIUS);

    const geometry = new THREE.SphereGeometry(0.02, 20, 20);
    const material = new THREE.MeshBasicMaterial({ color: POINT_COLOR });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    this.mesh = mesh;
  }

  isEqual(another: Point) {
    return this.mesh.position.equals(another.mesh.position);
  }

  isTooClose(another: Point) {
    return this.mesh.position.distanceTo(another.mesh.position) < 0.01;
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.remove();
  }
}
