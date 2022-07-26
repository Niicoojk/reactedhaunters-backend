// Requiring Libraries
const { body } = require("express-validator");
const db = require("../../../database/models");
const bcrypt = require("bcryptjs");

// Placing abbreviations of Models
const User = db.User;

// Validations
const validations = [
  body("login_key")
    .notEmpty()
    .withMessage("Debes completar este campo.")
    .bail()
    .custom(async (value, { req }) => {
      let includesAt = req.body.login_key.includes("@");
      if (includesAt) {
        let user = await User.findOne({ where: { email: value } });
        if (!user) {
          throw new Error("No se encontró al usuario.");
        } else if (user.deleted === true) {
          throw new Error("El usuario fue eliminado.");
        } else {
          return true;
        }
      } else if (!includesAt) {
        let user = await User.findOne({ where: { user_name: value } });
        if (!user) {
          throw new Error("No se encontró al usuario.");
        } else if (user.deleted === true) {
          throw new Error("El usuario fue eliminado.");
        } else {
          return true;
        }
      } else {
        throw new Error("No se encontró el usuario.");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Debes completar este campo.")
    .bail()
    .custom(async (value, { req }) => {
      let { login_key } = req.body;

      if (value != undefined) {
        let includesAt = login_key.includes("@");
        if (includesAt) {
          let user = await User.findOne({ where: { email: login_key } });
          let validatePassword = bcrypt.compareSync(value, user.password);

          if (!user) {
            return true;
          }

          if (!validatePassword) {
            throw new Error("La contraseña no es correcta.");
          } else {
            return true;
          }
        } else if (!includesAt) {
          let user = await User.findOne({ where: { user_name: login_key } });

          if (!user) {
            return true;
          }

          let validatePassword = bcrypt.compareSync(value, user.password);
          if (!validatePassword) {
            throw new Error("La contraseña no es correcta.");
          } else {
            return true;
          }
        }
      } else {
        throw new Error("Debes ingresar una contraseña");
      }
    }),
];

module.exports = validations;
