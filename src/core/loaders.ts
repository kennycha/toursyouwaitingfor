import { CubeTextureLoader, TextureLoader } from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

export const textureLoader = new TextureLoader().setPath("assets/textures/");

export const cubeTextureLoader = new CubeTextureLoader().setPath("assets/textures/skybox/");

export const fontLoader = new FontLoader().setPath("assets/fonts/");
