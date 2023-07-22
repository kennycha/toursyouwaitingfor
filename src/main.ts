import { Tour } from "./core/Tour";

const init = () => {
  const currentArtist = "postmalone";

  const tour = new Tour(currentArtist);
  console.log("tour: ", tour);
};

window.addEventListener("load", init);
