import { Tour } from "./core/Tour";

const init = () => {
  const currentArtist = "postmalone";

  const tour = new Tour(currentArtist);
  const newTour = new Tour("lesserafim");
  console.log("tour: ", tour);
  console.log("newTour: ", newTour);
};

window.addEventListener("load", init);
