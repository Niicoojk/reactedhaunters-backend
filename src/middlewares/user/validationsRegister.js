// Requiring Libraries & Database
const { body } = require("express-validator");
const db = require("../../database/models");
const path = require("path");

// Placing abbreviations of Models
const Address = db.Address;
const Order = db.Order;
const OrderDetail = db.OrderDetail;
const Product = db.Product;
const ProductTier = db.ProductTier;
const Tier = db.Tier;
const Universe = db.Universe;
const User = db.User;
const UserAddress = db.UserAddress;

// Requiring Scripts & Declaring Variables

const validations = [
	body("first_name")
		.notEmpty()
		.withMessage("Debes completar este campo.")
		.bail()
		.isAlpha()
		.withMessage("Solo se admiten letras."),
	body("last_name")
		.notEmpty()
		.withMessage("Debes completar este campo.")
		.bail()
		.isAlpha()
		.withMessage("Solo se admiten letras."),
	body("user_name")
		.notEmpty()
		.withMessage("Debes completar este campo.")
		.bail(),
	body("email")
		.notEmpty()
		.withMessage("Debes completar este campo.")
		.bail()
		.isEmail()
		.withMessage("Debes escribir un correo válido."),
	body("password")
		.notEmpty()
		.withMessage("Debes completar este campo.")
		.bail()
		.isStrongPassword({
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 1,
		})
		.withMessage(
			"La contraseña debe contener al menos 8 caracteres, una minúscula, una mayúscula, un número y un símbolo."
		),
	body("repeatedPassword").custom((value, { req }) => {
		if (value != req.body.password) {
			throw new Error("Las contraseñas no coinciden.");
		}
		return true;
	}),
	body("image").custom((value, { req }) => {
		let image = req.file;
		if (image) {
			let acceptedExtensions = [".jpg", ".jpeg", ".png"];
			let imageExtension = path.extname(image.originalname);
			if (!acceptedExtensions.includes(imageExtension)) {
				throw new Error(
					`Solo se admiten imágenes con extensiones: ${acceptedExtensions}`
				);
			}
			return true;
		}
		return true;
	}),
	body("terms_conditions")
		.notEmpty()
		.withMessage("Debes completar este campo.")
		.bail()
		.isNumeric({ min: 1 })
		.withMessage(
			"Los términos y condiciones deben ser aceptados para poder registarse."
		),
];

module.exports = validations;
