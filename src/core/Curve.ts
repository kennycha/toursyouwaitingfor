import * as THREE from "three";

const TOTAL_DOT_COUNT = 100;

export default class Curve {
  mesh: THREE.Mesh;

  constructor(start: THREE.Vector3, end: THREE.Vector3, radius: number, texture: THREE.CanvasTexture) {
    const positions: THREE.Vector3[] = [];

    for (let i = 0; i <= TOTAL_DOT_COUNT; i += 1) {
      const position = new THREE.Vector3().lerpVectors(start, end, i / TOTAL_DOT_COUNT);
      position.normalize();
      const waveFactor = Math.sin((Math.PI * i) / TOTAL_DOT_COUNT);
      position.multiplyScalar(radius + 0.05 * waveFactor);
      positions.push(position);
    }

    const path = new THREE.CatmullRomCurve3(positions);

    const geometry = new THREE.TubeGeometry(path, 20, 0.003);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);

    this.mesh = mesh;
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.remove();
  }
}
