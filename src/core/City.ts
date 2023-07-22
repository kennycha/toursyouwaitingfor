import cities from "../json/cities.json";
import { Cities } from "../types";

const cache: {
  [key: string]: {
    latitude: number;
    longitude: number;
  };
} = {};

export class City {
  name: string;
  latitude: number;
  longitude: number;

  constructor(name: Cities) {
    this.name = name;
    if (cache[name]) {
      this.latitude = cache[name].latitude;
      this.longitude = cache[name].longitude;
    } else {
      const [latitude, longitude] = cities[name];
      this.latitude = latitude;
      this.longitude = longitude;
      cache[name] = {
        latitude,
        longitude,
      };
    }
  }
}
