import City from "./City";
import tours from "../json/tours.json";
import { Artists, Cities } from "../types";

interface Concert {
  order: number;
  city: City;
  date: string;
}

export default class Tour {
  artist: Artists;
  name: string;
  concerts: Concert[];

  constructor(artist: Artists) {
    this.artist = artist;
    this.name = this.getTourName(artist);
    this.concerts = this.createConcerts(artist);
  }

  private getTourName(targetArtist: Artists) {
    return tours[targetArtist].name;
  }

  private createConcerts(targetArtist: Artists) {
    const schedules = tours[targetArtist].schedules;
    const concerts: Concert[] = [];
    schedules.forEach((schedule, idx) => {
      const city = new City(schedule.city as Cities);
      concerts.push({ order: idx, city, date: schedule.date });
    });

    return concerts;
  }
}
