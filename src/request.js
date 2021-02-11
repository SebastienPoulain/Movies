export const API_KEY = "807b2624793e51d98e1894a1d6d31340";

const request = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=fr`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=fr`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28&language=fr`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35&language=fr`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27&language=fr`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749&language=fr`,
  fetchMystery: `/discover/movie?api_key=${API_KEY}&with_genres=9648&language=fr`,
  fetchSciFi: `/discover/movie?api_key=${API_KEY}&with_genres=878&language=fr`,
  fetchWestern: `/discover/movie?api_key=${API_KEY}&with_genres=37&language=fr`,
  fetchAnimation: `/discover/movie?api_key=${API_KEY}&with_genres=16&language=fr`,
  fetchTv: `/discover/movie?api_key=${API_KEY}&with_genres=10770&language=fr`,
};
export default request;
