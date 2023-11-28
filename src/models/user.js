const { readData, writeDataUser } = require("../controller/BDManager.js");

class userClass {
  constructor(email, firstName, lastName, password) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }

  saveUser() {
    const existingData = readData(true);

    let aux = existingData.user.find((user) => user.email == this.email);
    if (aux) {
      console.log("Email ya registrado");
      return false;
    }

    existingData.user = existingData.user || [];

    existingData.user.push({
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
    });

    writeDataUser(existingData);

    console.log(`Guardando email ${this.email} en la base de datos.`);

    return true;
  }

  findById() {
    const existingData = readData(true);
    let aux = existingData.user.find((user) => user.email == this.email);
    if (aux) {
      return aux;
    }
    return false;
  }
}

exports.userClass = userClass;
