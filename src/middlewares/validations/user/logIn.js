// Requiring Libraries
const { body } = require("express-validator");
const db = require("../../../database/models");
const bcrypt = require("bcryptjs");

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
				} else {
					return true;
				}
			} else if (!includesAt) {
				let user = await User.findOne({ where: { user_name: value } });
				if (!user) {
					throw new Error("No se encontró al usuario.");
				} else if (includesAt === undefined) {
					throw new Error("Introduce un usuario.")
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
			let includesAt = login_key.includes("@");
			if (includesAt) {
				let user = await User.findOne({ where: { email: login_key } });
				let validatePassword = bcrypt.compareSync(value, user.password);
				if (!validatePassword) {
					throw new Error("La contraseña no es correcta.");
				} else {
					return true;
				}
			} else if (!includesAt) {
				let user = await User.findOne({ where: { user_name: login_key } });
				let validatePassword = bcrypt.compareSync(value, user.password);
				if (!validatePassword) {
					throw new Error("La contraseña no es correcta.");
				} else {
					return true;
				}
			}
		}),
];

module.exports = validations;
