import { City } from "./City";
import tours from "../json/tours.json";
import { Artists, Cities } from "../types";

interface Concert {
  order: number;
  city: City;
  date: string;
}

export class Tour {
  artist: Artists;
  concerts: Concert[];

  constructor(artist: Artists) {
    this.artist = artist;
    this.concerts = this.createConcerts(artist);
  }

  createConcerts(targetArtist: Artists) {
    const schedules = tours[targetArtist];
    const concerts: Concert[] = [];
    schedules.forEach((schedule, idx) => {
      const city = new City(schedule.city as Cities);
      concerts.push({ order: idx, city, date: schedule.date });
    });

    return concerts;
  }
}
