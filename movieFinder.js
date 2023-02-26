key = "5337a2d15abd632c67adfc31eb638eb5";

const fetch = require('node-fetch');
const apiKey = key;
const baseUrl = 'https://api.themoviedb.org/3';
const images_url = "http://image.tmdb.org/t/p/";

const happyGenres = [
  { id: 12, name: 'Adventure' },
  { id: 35, name: 'Comedy' },
  { id: 10751, name: 'Family' },
  { id: 10402, name: 'Music' }
];
const romanticGenres = [
  { id: 10749, name: 'Romance' }
];
const sadGenres = [
  { id: 18, name: 'Drama' },
  { id: 10752, name: 'War' }
];
const relaxedGenres = [
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 10751, name: 'Family' },
  { id: 10402, name: 'Music' },
  { id: 99, name: 'Documentary' }, // questionable
  { id: 36, name: 'History' }
];
const hypeGenres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 80, name: 'Crime' },
  { id: 27, name: 'Horror' },
  { id: 9648, name: 'Mystery' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' },
  {id: 10752, name: 'War' }
];
const studiousGenre = [];
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getGenres = async () => {
  const url = `${baseUrl}/genre/movie/list?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.genres;
  } catch (error) {
    console.error(error);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const searchByKey = (list, key, value) => {
  return list.filter((item) => {
    return item[key] === value;
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const discoverMovie = async (genreObj) => {

  const queryString = new URLSearchParams({
    with_genres: String(genreObj.id),
    sort_by: "popularity.desc",
    api_key: apiKey,
  }).toString();

  const url = `${baseUrl}/discover/movie?${queryString}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.results.filter(movie => movie.popularity>=0).filter(movie=>movie.adult===false).filter(movie=>movie.original_language==="en");
  } catch (error) {
    console.error(error);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const discoverMovies = async (genreList) => {
  combinedMovies = [];
  for (let i = 0; i < genreList.length; i++) {
    // genre = genreList[i];
    // genreMovies = await discoverMovie(genre).then(result=>console.log(result));
    genreMovies = await discoverMovie(genreList[i]);
    combinedMovies = combinedMovies.concat(genreMovies)
    // genreMovies.map(a=> console.log(a))
    //genreMovies = discoverMovie(genre).then(result => combinedMovies.push(result));
  }
  // console.log(typeof(combinedMovies))
  return combinedMovies;
};

// console.log(getGenres()
// .then((genres) => {
//   console.log(genres);
// })
// .catch((error) => {
//   console.error(e  rror);
// }));

// used to map list of obj to list of ids
  //console.log(String(hypeGenres.map(obj=> (obj.id)).join()));


//console.log(discoverMovies(hypeGenres));//.then(results=> console.log(results));

// console.log(await discoverMovie( { id: 12, name: 'Adventure' }))