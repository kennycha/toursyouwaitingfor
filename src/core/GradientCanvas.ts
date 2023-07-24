import { CanvasTexture } from "three";

export default class GradientCanvas {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  texture: THREE.CanvasTexture;

  constructor(startColor: string, endColor: string) {
    this.canvas = document.createElement("canvas");

    const context = this.canvas.getContext("2d");
    if (!context) throw Error("Can't find context");
    this.context = context;

    this.canvas.width = 256;
    this.canvas.height = 1;

    const gradient = this.context.createLinearGradient(0, 0, 256, 0);
    gradient.addColorStop(0, startColor);
    gradient.addColorStop(1, endColor);

    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, 256, 1);

    this.texture = new CanvasTexture(this.canvas);
  }

  updateColors(startColor: string, endColor: string) {
    this.context.clearRect(0, 0, 256, 1);

    const newGradient = this.context.createLinearGradient(0, 0, 256, 0);
    newGradient.addColorStop(0, startColor);
    newGradient.addColorStop(1, endColor);

    this.context.fillStyle = newGradient;
    this.context.fillRect(0, 0, 256, 1);

    const prevTexture = this.texture;
    this.texture = new CanvasTexture(this.canvas);
    prevTexture.dispose();
  }
}
