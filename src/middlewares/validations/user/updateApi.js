// Requiring Libraries & Database
const { body } = require("express-validator");
const db = require("../../../database/models");
const path = require("path");
const { register } = require("../../../controllers/user");

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

// Validations
const validations = [
	body("user_name")
		.notEmpty()
		.withMessage("Debes completar este campo.")
		.bail()
		.custom(async (value, { req }) => {}),
	body("password")
		.notEmpty()
		.withMessage("Debes completar este campo.")
		.bail()
		.custom(async (value, { req }) => {
			let { user_name } = req.body;

			// Finding the user to update
			let userToUpdate = await User.findOne({
				where: { user_name: user_name },
			});

			// Finding the registered User
			let registeredUser = await User.findOne({
				where: { user_name: user_name_registered },
			});

			if (userToUpdate && registeredUser) {
				let validatePassword = bcrypt.compareSync(value, userToUpdate.password);
				if (!validatePassword) {
					throw new Error("La contraseña no es correcta.");
				} else {
					return true;
				}
			} else {
				throw new Error(
					"El usuario que intentas actualizar no coincide con tu sesión actual."
				);
			}
		}),
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
];

module.exports = validations;
