const { readData, writeDataUser } = require("../controller/dataBaseManager.js");
const bcrypt = require("bcrypt-nodejs");

class UserClass {
  constructor(email, firstName, lastName, password) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }

  // Guarda el usuario en la base de datos
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
      password: this.encryptPassword(this.password),
    });

    writeDataUser(existingData);

    console.log(`Guardando email ${this.email} en la base de datos.`);

    return true;
  }

  // Encripta la contraseña
  encryptPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  }

  // Valida la contraseña
  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

exports.UserClass = UserClass;
