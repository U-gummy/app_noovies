const API_KEY = "660b23621fced3d4e50247c34d107d94";
const BASE_URL = "https://api.themoviedb.org/3";

const trending = () =>
  fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US&page=1&region=KR`
  ).then((res) => res.json());

const upcoming = () =>
  fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
  ).then((res) => res.json());

const nowPlaying = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
  ).then((res) => res.json());

export const moviesApi = { trending, upcoming, nowPlaying };
