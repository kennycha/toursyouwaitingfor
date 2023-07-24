import { CanvasTexture, CatmullRomCurve3, Mesh, MeshBasicMaterial, TubeGeometry, Vector3 } from "three";

const TOTAL_DOT_COUNT = 100;

export default class Curve {
  mesh: Mesh;

  constructor(start: Vector3, end: Vector3, radius: number, texture: CanvasTexture) {
    const positions: Vector3[] = [];

    for (let i = 0; i <= TOTAL_DOT_COUNT; i += 1) {
      const position = new Vector3().lerpVectors(start, end, i / TOTAL_DOT_COUNT);
      position.normalize();
      const waveFactor = Math.sin((Math.PI * i) / TOTAL_DOT_COUNT);
      position.multiplyScalar(radius + 0.05 * waveFactor);
      positions.push(position);
    }

    const path = new CatmullRomCurve3(positions);

    const geometry = new TubeGeometry(path, 20, 0.003);
    const material = new MeshBasicMaterial({ map: texture });
    const mesh = new Mesh(geometry, material);

    this.mesh = mesh;
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.remove();
  }
}
