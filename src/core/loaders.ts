import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

export const textureLoader = new THREE.TextureLoader().setPath("assets/textures/");

export const cubeTextureLoader = new THREE.CubeTextureLoader().setPath("assets/textures/skybox/");

export const fontLoader = new FontLoader().setPath("assets/fonts/");
