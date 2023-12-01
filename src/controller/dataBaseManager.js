const fs = require("fs");

const dataFilePath = "./DB";
let dataFilePathAux;

// Función para leer datos desde el archivo JSON
function readData(userOrFavorite) {
  try {
    // console.log(userOrFavorite);
    if (userOrFavorite) {
      dataFilePathAux = dataFilePath + "/users.txt";
    } else {
      dataFilePathAux = dataFilePath + "/favorite.txt";
    }
    const data = fs.readFileSync(dataFilePathAux, "utf8");
    return JSON.parse(data);
  } catch (err) {
    // console.log(err);
    return {};
  }
}

// Función para escribir datos en el archivo JSON de usuarios
function writeDataUser(data) {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(dataFilePath + "/users.txt", jsonData, "utf8");
}

// Función para escribir datos en el archivo JSON de favoritos
function writeDataFavorite(data) {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(dataFilePath + "/favorite.txt", jsonData, "utf8");
}

function writeDataToken(token) {
  let data = fs.readFileSync(dataFilePath + "/blackListToken.txt", "utf8");

  data = data || [];
  data = JSON.parse(data);
  data.push({
    token: token,
  });

  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(dataFilePath + "/blackListToken.txt", jsonData, "utf8");
}

function readDataToken() {
  try {
    dataFilePathAux = dataFilePath + "/blackListToken.txt";
    const data = fs.readFileSync(dataFilePathAux, "utf8");
    return JSON.parse(data);
  } catch (err) {
    // console.log(err);
    return {};
  }
}

module.exports = {
  readData,
  writeDataFavorite,
  writeDataUser,
  writeDataToken,
  readDataToken,
};
