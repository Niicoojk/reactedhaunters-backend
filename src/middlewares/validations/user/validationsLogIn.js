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

const validations = [
	body("login_key")
		.notEmpty()
		.withMessage("Debes completar este campo.")
		.bail()
		.custom(async (value, { req }) => {
			let includesAt = value.includes("@");
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
			let includesAt = value.includes("@");
			if (includesAt) {
				let user = await User.findOne({ where: { email: value } });
				let validatePassword = bcrypt.compareSync(value, user.password);
				if (!validatePassword) {
					throw new Error("La contraseña no es correcta.");
				} else {
					return true;
				}
			} else if (!includesAt) {
				let user = await User.findOne({ where: { user_name: value } });
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
