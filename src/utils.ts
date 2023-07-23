export const convertCoordinateToPosition = (lat: number, lng: number, radius: number) => {
  const latitude = lat * (Math.PI / 180);
  const longitude = lng * (Math.PI / 180);

  const x = Math.cos(latitude) * Math.sin(longitude) * radius;
  const y = Math.sin(latitude) * radius;
  const z = Math.cos(latitude) * Math.cos(longitude) * radius;

  return { x, y, z };
};
