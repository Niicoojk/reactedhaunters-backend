// Requiring Libraries & Database
const { body } = require("express-validator");
const db = require("../../../database/models");
const path = require("path");

// Placing abbreviations of Models
const Address = db.Address;
const Order = db.Order;
const OrderDetail = db.OrderDetail;
const Product = db.Product;
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
		.bail()
		.isLength({ max: 16 })
		.withMessage("El nombre de usuario debe tener menos de 16 caracteres.")
		.bail()
		.custom(async (value, { req }) => {
			let alreadyExist = await User.findOne({
				where: {
					user_name: value,
				},
			});
			if (alreadyExist) {
				throw new Error("Este nombre de usuario está en uso.");
			} else {
				return true;
			}
		}),
	body("email")
		.notEmpty()
		.withMessage("Debes completar este campo.")
		.bail()
		.isEmail()
		.withMessage("Debes escribir un correo válido.")
		.bail()
		.custom(async (value, { req }) => {
			let alreadyExist = await User.findOne({
				where: {
					email: value,
				},
			});
			if (alreadyExist) {
				throw new Error("Este email ya está asociado a un usuario.");
			} else {
				return true;
			}
		}),
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
		if (value !== req.body.password) {
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
	body("terms_conditions").custom((value, { req }) => {
		if (value != "on") {
			throw new Error("Debes aceptar los términos y condiciones.");
		}
		return true;
	}),
];

module.exports = validations;
