const axios = require("axios");
const e = require("express");

const apiUrl =
  "https://api.themoviedb.org/3/movie/11?api_key=36da3de5cacd19a82e3e8002cd47bee3";

// solicitud de peliculas a la api themoviedb
requestMovies = () => {
  axios
    .get(apiUrl)
    .then((response) => {
      const responseData = response.data;
      console.log(responseData);
      return responseData;
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error.message);
      return error;
    });
};

exports.requestMovies = requestMovies;
