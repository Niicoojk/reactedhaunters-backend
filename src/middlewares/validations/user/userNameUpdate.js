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

// Validations
const validations = [
	body("user_name")
		.custom(async (value, { req }) => {
			if (value != null || value != undefinied || value != "" || value != " ") {
				return true;
			} else {
				let userToUpdate = await User.findOne({
					where: {
						user_name: req.body.oldUserName,
					},
				});
				let alreadyExist = await User.findOne({
					where: {
						user_name: value,
					},
				});
				if (alreadyExist.user_name != userToUpdate.user_name) {
					throw new Error("Este nombre de usuario está en uso.");
				} else {
					return true;
				}
			}
		})
		.isLength({ max: 16 })
		.withMessage("El nombre de usuario debe tener menos de 16 caracteres.")
		.bail(),
];

module.exports = validations;
