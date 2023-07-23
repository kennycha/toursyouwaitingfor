import * as THREE from "three";
import { Font } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { convertCoordinateToPosition } from "../utils";
import { EARTH_RADIUS } from "../constants";

export default class Text {
  mesh: THREE.Mesh;

  constructor(text: string, font: Font, latitude: number, longitude: number) {
    const { x, y, z } = convertCoordinateToPosition(latitude, longitude, EARTH_RADIUS);

    const geometry = new TextGeometry(text, {
      font,
      size: 0.02,
      height: 0.005,
    });
    const material = new THREE.MeshBasicMaterial({ color: "#FFFFFF" });

    const mesh = new THREE.Mesh(geometry, material);
    // @TODO text가 sphere 위에서 원점과 수직이 되도록 position, rotation 변경해야 함
    mesh.position.set(x, y + 0.1, z);
    this.mesh = mesh;
  }
}
