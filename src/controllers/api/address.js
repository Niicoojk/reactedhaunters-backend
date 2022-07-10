// Requiring Libraries
const db = require("../../database/models");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

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
const formattedDateDb = require("../../scripts/formattedDateDb");
const consoleLogError = require("../../scripts/consoleLogError");

// Defining Controller
const controller = {
	list: async (req, res) => {
		let status = res.statusCode;
		let validationResults = validationResult(req);
		try {
			let {} = req.body;
			let userAddresses = await UserAddress.findAll({
				where: {
					user_id: user.id,
				},
			});
			if (userAddresses.lenght < 1) {
				res.status(200).json({
					status: status,
					errors: "The user has not registered any address yet.",
				});
			}
			res.status(200).json({
				status: status,
				userAddresses: userAddresses,
				total: userAddresses.length,
			});
		} catch (error) {
			consoleLogError(error);
			res.status(400).json({
				status: 400,
				errors: validationResults.mapped(),
			});
		}
	},
	create: async (req, res) => {
		let status = res.statusCode;
		let validationResults = validationResult(req);
		try {
			let { country, state, city, address, floor, apartment, postal_code } =
				req.body;
			let addressRegistered = await Address.findOne({
				where: {
					country: country,
					state: state,
					city: city,
					address: address,
					floor: floor,
					apartment: apartment,
					postal_code: postal_code,
				},
			});
			if (addressRegistered) {
				let vinculatingAddress = await UserAddress.create({
					user_id: user.id,
					address_id: addressRegistered.id,
				});
				res.json({
					status: status,
					data: addressRegistered,
				});
			} else {
				let newAddress = await Address.create({
					country: country,
					state: state,
					city: city,
					address: address,
					floor: floor,
					apartment: apartment,
					postal_code: postal_code,
					created_at: formattedDateDb,
					updated_at: formattedDateDb,
				});
				let vinculatingAddress = await UserAddress.create({
					user_id: user.id,
					address_id: newAddress.id,
				});
				res.json({
					status: status,
					data: newAddress,
				});
			}
		} catch (error) {
			consoleLogError(error);
			res.status(400).json({
				status: 400,
				errors: validationResults.mapped(),
			});
		}
	},
	update: async (req, res) => {
		let status = res.statusCode;
		let validationResults = validationResult(req);
		try {
			let { country, state, city, address, floor, apartment, postal_code } =
				req.body;
			let addressRegistered = await Address.findOne({
				where: {
					country: country,
					state: state,
					city: city,
					address: address,
					floor: floor,
					apartment: apartment,
					postal_code: postal_code,
				},
			});
			if (addressRegistered) {
			} else {
				res.json({
					status: 404,
					errors: [],
				});
			}
		} catch (error) {
			consoleLogError(error);
			res.status(400).json({
				status: 400,
				errors: validationResults.mapped(),
			});
		}
	},
	delete: async (req, res) => {
		let status = res.statusCode;
		let validationResults = validationResult(req);
		try {
			let {} = req.body;
		} catch (error) {
			consoleLogError(error);
			res.status(400).json({
				status: 400,
				errors: validationResults.mapped(),
			});
		}
	},
};

module.exports = controller;
