const axios = require("axios");
const e = require("express");
const fs = require("fs");
const { readData } = require("./dataBaseManager");

const apiAllMoviesUrl =
  "https://api.themoviedb.org/3/search/movie?api_key=36da3de5cacd19a82e3e8002cd47bee3";
const apiUrl =
  "https://api.themoviedb.org/3/movie/popular?api_key=36da3de5cacd19a82e3e8002cd47bee3&language=en-US&page=1";

// Get all movies from the API
const getAllMovies = async (filter) => {
  let url;
  console.log(filter);
  if (filter == undefined) {
    url = apiUrl;
  } else {
    url = apiAllMoviesUrl + "&query=" + filter.replace(/ /g, "+");
  }
  const responseAux = await get(url);
  let response = responseAux.data;

  let i = 0;
  let aleatoryNum;
  let arrayAN = [];
  response.results.forEach((obj) => {
    aleatoryNum = Math.floor(Math.random() * 100);
    while (arrayAN.includes(aleatoryNum)) {
      aleatoryNum = Math.floor(Math.random() * 100);
    }
    arrayAN.push(aleatoryNum);
    obj.suggestionScore = aleatoryNum;
    i++;
  });

  response.results = response.results.sort(
    (a, b) => b.suggestionScore - a.suggestionScore
  );

  return response.results;
};

// Add a movie to the user's favorites
const setFavorite = (dataMovie, email) => {
  let data = readData(false);

  data = data || {};
  data.users = data.users || [];

  let aux = data.users.find((users) => users.email == email);

  while (!aux) {
    let dataAux = { email: email, favorite: [] };
    data.users.push(dataAux);
    fs.writeFileSync("./DB/favorite.txt", JSON.stringify(data, null, 2));
    aux = data.users.find((users) => users.email == email);
  }

  data.users.forEach((user) => {
    if (user.email === email) {
      // Check if the movie is already a favorite
      const existingMovie = user.favorite.find(
        (movie) => movie.id === dataMovie.id
      );
      if (!existingMovie) {
        const time = new Date().getTime();
        const dataTime = new Date(time);
        // Add the movie to the user's favorites
        dataMovie.addedAt = dataTime;
        user.favorite.push(dataMovie);

        // Update the data file
        fs.writeFileSync("./DB/favorite.txt", JSON.stringify(data, null, 2));
        return true;
      }
    }
  });

  // Return false if the movie is already a favorite or the user is not found
  return false;
};

// Get all favorite movies from a user
const getAllFavoriteMovies = async (email) => {
  let data = readData(false);

  data = data || {};
  data.users = data.users || [];

  let aux = data.users.find((users) => users.email == email);

  if (!aux) {
    return [];
  }

  let i = 0;
  let aleatoryNum;
  let arrayAN = [];
  aux.favorite.forEach((obj) => {
    aleatoryNum = Math.floor(Math.random() * 100);
    while (arrayAN.includes(aleatoryNum)) {
      aleatoryNum = Math.floor(Math.random() * 100);
    }
    arrayAN.push(aleatoryNum);
    obj.suggestionForTodayScore = aleatoryNum;
    i++;
  });

  aux.favorite = aux.favorite.sort(
    (a, b) => b.suggestionForTodayScore - a.suggestionForTodayScore
  );

  return aux.favorite;
};

// Get data from an API
const get = async (url) => {
  return await axios.get(url);
};

module.exports = { getAllMovies, setFavorite, getAllFavoriteMovies };
