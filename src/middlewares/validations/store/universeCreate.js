// Requiring Dependencies
const { body } = require("express-validator");
const db = require("../../../database/models");

// Placing abbreviations of Models
const Universe = db.Universe;

const validations = [
  body("universe")
    .notEmpty()
    .withMessage("Este campo no puede estar vacío")
    .bail()
    .custom(async (value, { req }) => {
      let universe = await Universe.findOne({
        where: { universe: value },
      });
      if (universe) {
        throw new Error("El universo que intentas crear ya existe");
      } else {
        return true;
      }
    }),
];

module.exports = validations;
