const fs = require("fs");

const usersFilePath = "./DB/users.txt";
const favoriteFilePath = "./DB/favorite.txt";

CreatDB = () => {
  if (!fs.existsSync(usersFilePath)) {
    let existingUserData = { user: [] };
    let jsonData = JSON.stringify(existingUserData, null, 2);
    fs.writeFileSync(usersFilePath, jsonData, "utf8");
  }
  if (!fs.existsSync(favoriteFilePath)) {
    let existingUserData = { favorite: [] };
    let jsonData = JSON.stringify(existingUserData, null, 2);
    fs.writeFileSync(favoriteFilePath, jsonData, "utf8");
  }
};

exports.CreatDB = CreatDB;
