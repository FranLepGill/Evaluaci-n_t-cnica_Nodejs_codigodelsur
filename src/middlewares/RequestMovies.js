const axios = require("axios");
const e = require("express");

const apiUrl =
  "https://api.themoviedb.org/3/movie/11?api_key=36da3de5cacd19a82e3e8002cd47bee3";

RequestMovies = () => {
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

exports.RequestMovies = RequestMovies;
