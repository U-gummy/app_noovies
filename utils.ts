export const makeImagePath = (image: string, width: string = "w500") => {
  return `https://image.tmdb.org/t/p/${width}${image}`;
};
