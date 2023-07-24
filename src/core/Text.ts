import { Mesh, MeshBasicMaterial } from "three";
import { Font } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { convertCoordinateToPosition } from "../utils";
import { EARTH_RADIUS, TEXT_COLOR } from "../constants";

export default class Text {
  mesh: THREE.Mesh;

  constructor(text: string, font: Font, latitude: number, longitude: number) {
    const { x, y, z } = convertCoordinateToPosition(latitude, longitude, EARTH_RADIUS);

    const geometry = new TextGeometry(text, {
      font,
      size: 0.01,
      height: 0.005,
    });
    const material = new MeshBasicMaterial({ color: TEXT_COLOR });

    const mesh = new Mesh(geometry, material);
    // @TODO text가 sphere 위에서 원점과 수직이 되도록 position, rotation 변경해야 함
    if (x > 0) {
      mesh.rotateY((2 * Math.PI) / 3);
    } else {
      mesh.rotateY((-2 * Math.PI) / 3);
    }
    if (y > 0) {
      mesh.position.set(x, y + 0.05, z);
    } else {
      mesh.position.set(x, y - 0.05, z);
    }

    this.mesh = mesh;
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.remove();
  }
}
