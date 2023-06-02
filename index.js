/** @format */

const KEY_API = "d8415807a69671ac3d5b83609cdb1ebd";
const URL_API =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODQxNTgwN2E2OTY3MWFjM2Q1YjgzNjA5Y2RiMWViZCIsInN1YiI6IjY0NzliNDFiMGUyOWEyMDEzM2MyY2MwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TDFQRvh-zpwgcC24R9zjRzSd7Gwdl9hmzqRjtrzE2Z0";

function getGenres() {
  fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=d8415807a69671ac3d5b83609cdb1ebd"
  )
    .then((response) => response.json())
    .then((data) => {
      const genres = data.genres;
      createGenreDropdown(genres);
      getMovies();
    })
    .catch((error) => {
      console.error("Error getting list of genres:", error);
    });
}

//список фильмов
function getMovies() {
  fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=d8415807a69671ac3d5b83609cdb1ebd"
  )
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results;
      window.movies = movies;
      displayMovies(movies);
    })
    .catch((error) => {
      console.error("Error getting movie list:", error);
    });
}
//-------
function filterMoviesByGenre(selectedGenre) {
  const movies = window.movies; //------
  const filteredMovies = movies.filter((movie) => {
    return movie.genre_ids.includes(selectedGenre);
  });

  displayMovies(filteredMovies);
}

function displayMovies(movies) {
  const moviesContainer = document.getElementById("my-lib-movies");
  moviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.textContent = movie.title;
    moviesContainer.appendChild(movieElement);
  });
}

function createGenreDropdown(genres) {
  const genreContainer = document.getElementById("my-lib-genre");
  const select = document.createElement("select");
  select.addEventListener("change", handleGenreDropdownChange);
  const placeholderOption = document.createElement("option");
  placeholderOption.textContent = "Genre";
  select.appendChild(placeholderOption);

  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre.id;
    option.textContent = genre.name;
    select.appendChild(option);
  });

  genreContainer.appendChild(select);
}

function handleGenreDropdownChange(event) {
  const selectedGenre = parseInt(event.target.value);
  filterMoviesByGenre(selectedGenre);
}

getGenres();
